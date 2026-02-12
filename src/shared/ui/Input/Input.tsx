import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import cn from "classnames";
import { X, Eye, EyeSlash } from "@phosphor-icons/react";

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: ReactNode;
    error?: string;
    onClear?: () => void;
    showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ leftIcon, error, onClear, showPasswordToggle, className, type, value, ...rest }, ref) => {
        const [passwordVisible, setPasswordVisible] = useState(false);

        const inputType = showPasswordToggle ? (passwordVisible ? "text" : "password") : type;
        const hasValue = value !== undefined && value !== "";

        return (
            <div className={cn(styles.wrapper, className)}>
                <div className={cn(styles.field, { [styles.error]: !!error })}>
                    {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

                    <input
                        ref={ref}
                        type={inputType}
                        value={value}
                        className={styles.input}
                        {...rest}
                    />

                    {onClear && hasValue && (
                        <button
                            type="button"
                            className={styles.action}
                            onClick={onClear}
                            tabIndex={-1}
                        >
                            <X size={20} weight="fill" />
                        </button>
                    )}

                    {showPasswordToggle && (
                        <button
                            type="button"
                            className={styles.action}
                            onClick={() => setPasswordVisible((v) => !v)}
                            tabIndex={-1}
                        >
                            {passwordVisible ? <EyeSlash size={22} weight="fill" /> : <Eye size={22} weight="fill" />}
                        </button>
                    )}
                </div>

                {error && <span className={styles.errorText}>{error}</span>}
            </div>
        );
    },
);

Input.displayName = "Input";
