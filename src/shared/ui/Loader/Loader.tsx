import { CircleNotchIcon } from "@phosphor-icons/react";

import styles from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <CircleNotchIcon size={40} className={styles.spinner} />
        </div>
    );
};
