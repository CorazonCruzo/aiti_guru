import type { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline";
    shape?: "rect" | "oval" | "circle";
    size?: "s" | "m" | "l";
    iconOnly?: boolean;
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: ReactNode;
}

const sizeClass = { s: "sizeS", m: "sizeM", l: "sizeL" } as const;

export const Button = ({
    variant = "primary",
    shape = "rect",
    size = "l",
    iconOnly = false,
    fullWidth = false,
    loading = false,
    type = "button",
    leftIcon,
    children,
    className,
    disabled,
    ...rest
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={cn(
                styles.button,
                styles[variant],
                styles[shape],
                styles[sizeClass[size]],
                {
                    [styles.iconOnly]: iconOnly,
                    [styles.fullWidth]: fullWidth,
                },
                className,
            )}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? (
                <span className={styles.spinner} />
            ) : (
                <>
                    {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
                    {children && <span className={styles.text}>{children}</span>}
                </>
            )}
        </button>
    );
};
