import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import cn from "classnames";
import { XIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: ReactNode;
    error?: string;
    onClear?: () => void;
    showPasswordToggle?: boolean;
    variant?: "default" | "compact";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        { leftIcon, error, onClear, showPasswordToggle, variant = "default", className, type, value, ...rest },
        ref,
    ) => {
        const [passwordVisible, setPasswordVisible] = useState(false);

        const inputType = showPasswordToggle ? (passwordVisible ? "text" : "password") : type;
        const hasValue = value !== undefined && value !== "";

        return (
            <div className={cn(styles.wrapper, styles[variant], className)}>
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
                            <XIcon size={20} />
                        </button>
                    )}

                    {showPasswordToggle && (
                        <button
                            type="button"
                            className={styles.action}
                            onClick={() => setPasswordVisible((v) => !v)}
                            tabIndex={-1}
                        >
                            {passwordVisible ? <EyeSlashIcon size={22} /> : <EyeIcon size={22} />}
                        </button>
                    )}
                </div>

                {error && <span className={styles.errorText}>{error}</span>}
            </div>
        );
    },
);

Input.displayName = "Input";
