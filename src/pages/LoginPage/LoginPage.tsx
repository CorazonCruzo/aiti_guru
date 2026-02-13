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
            <div className={styles.divider}>
                <span className={styles.dividerText}>или</span>
            </div>
            <p className={styles.signup}>
                Нет аккаунта?{" "}
                <a href="#" className={styles.signupLink}>
                    Создать
                </a>
            </p>
        </div>
    );
};
