import { useEffect, type ReactNode } from "react";

import { useAuthStore } from "@/features/auth/model/authStore";
import { Loader } from "@/shared/ui/Loader/Loader";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const isLoading = useAuthStore((s) => s.isLoading);
    const refreshSession = useAuthStore((s) => s.refreshSession);

    useEffect(() => {
        refreshSession();
    }, [refreshSession]);

    if (isLoading) {
        return <Loader />;
    }

    return <>{children}</>;
};
