import styles from "./ProgressBar.module.css";

export const ProgressBar = () => {
    return (
        <div className={styles.track}>
            <div className={styles.bar} />
        </div>
    );
};
