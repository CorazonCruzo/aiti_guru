import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserIcon, LockSimpleIcon } from "@phosphor-icons/react";

import { useAuthStore } from "@/features/auth/model/authStore";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { showToast } from "@/shared/lib/showToast";

import styles from "./LoginForm.module.css";

const loginSchema = z.object({
    username: z.string().min(1, "Введите имя пользователя"),
    password: z.string().min(1, "Введите пароль"),
    rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const login = useAuthStore((s) => s.login);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
            rememberMe: false,
        },
    });

    const usernameValue = watch("username");
    const passwordValue = watch("password");

    const onSubmit = async (data: LoginFormValues) => {
        setIsSubmitting(true);
        try {
            await login(data.username, data.password, data.rememberMe);
        } catch {
            showToast("error", "Неверный логин или пароль");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
                <label className={styles.label}>Логин</label>
                <Input
                    {...register("username")}
                    leftIcon={<UserIcon size={20} />}
                    value={usernameValue}
                    onClear={() => setValue("username", "")}
                    error={errors.username?.message}
                    autoComplete="username"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Пароль</label>
                <Input
                    {...register("password")}
                    leftIcon={<LockSimpleIcon size={20} />}
                    value={passwordValue}
                    showPasswordToggle
                    error={errors.password?.message}
                    autoComplete="current-password"
                />
            </div>

            <div className={styles.options}>
                <Checkbox {...register("rememberMe")} label="Запомнить данные" />
            </div>

            <Button variant="primary" fullWidth type="submit" loading={isSubmitting}>
                Войти
            </Button>
        </form>
    );
};
