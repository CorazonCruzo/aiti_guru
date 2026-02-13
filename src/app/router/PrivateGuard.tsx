import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/features/auth/model/authStore";
import { ROUTES } from "@/shared/config/routes";

export const PrivateGuard = () => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <Outlet />;
};
