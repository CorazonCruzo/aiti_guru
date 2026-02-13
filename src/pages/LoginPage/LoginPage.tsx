import { LoginForm } from "@/features/auth/ui/LoginForm";
import logo from "@/shared/assets/logo.png";

import styles from "./LoginPage.module.css";

export const LoginPage = () => {
    return (
        <div className={styles.card}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <h1 className={styles.title}>Добро пожаловать!</h1>
            <p className={styles.subtitle}>Пожалуйста, авторизируйтесь</p>
            <LoginForm />
        </div>
    );
};
