import { forwardRef, type InputHTMLAttributes } from "react";
import cn from "classnames";
import { CheckIcon } from "@phosphor-icons/react";

import styles from "./Checkbox.module.css";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    variant?: "default" | "table";
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, variant = "default", className, ...rest }, ref) => {
        return (
            <label className={cn(styles.wrapper, styles[variant], className)}>
                <input ref={ref} type="checkbox" className={styles.input} {...rest} />
                <span className={styles.checkmark}>
                    <CheckIcon size={14} className={styles.checkIcon} />
                </span>
                {label && <span className={styles.label}>{label}</span>}
            </label>
        );
    },
);

Checkbox.displayName = "Checkbox";
