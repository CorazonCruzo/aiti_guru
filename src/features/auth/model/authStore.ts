import { create } from "zustand";

import { loginRequest, refreshTokenRequest } from "@/features/auth/api/authApi";
import type { User } from "@/features/auth/model/types";
import {
    setAccessToken,
    setRefreshToken,
    getRefreshToken,
    clearTokens,
    setRememberMe,
    getRememberMe,
} from "@/shared/lib/tokenStorage";
import { ROUTES } from "@/shared/config/routes";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    rememberMe: boolean;
    login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
    logout: () => void;
    refreshSession: () => Promise<void>;
    setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    rememberMe: getRememberMe(),

    login: async (username, password, rememberMe) => {
        clearTokens();
        setRememberMe(rememberMe);
        set({ rememberMe });

        const data = await loginRequest({ username, password });

        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        set({
            user: {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                image: data.image,
            },
            isAuthenticated: true,
        });
    },

    logout: () => {
        clearTokens();
        set({ user: null, isAuthenticated: false, rememberMe: false });
        window.location.href = ROUTES.LOGIN;
    },

    refreshSession: async () => {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            set({ isLoading: false });
            return;
        }

        try {
            const data = await refreshTokenRequest(refreshToken);

            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);

            set({
                user: {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    image: data.image,
                },
                isAuthenticated: true,
                isLoading: false,
            });
        } catch {
            clearTokens();
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },

    setUser: (user) => {
        set({ user, isAuthenticated: true });
    },
}));
