import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import styles from "./ErrorPage.module.css";

export const ErrorPage = () => {
    const error = useRouteError();

    const message = isRouteErrorResponse(error)
        ? `${error.status}: ${error.statusText}`
        : "Произошла непредвиденная ошибка";

    const handleReload = () => {
        window.location.href = "/";
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Что-то пошло не так</h1>
            <p className={styles.message}>{message}</p>
            <button className={styles.button} onClick={handleReload}>
                На главную
            </button>
        </div>
    );
};
