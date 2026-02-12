import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

import {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
    clearTokens,
} from "@/shared/lib/tokenStorage";
import { showToast } from "@/shared/lib/showToast";
import { ROUTES } from "@/shared/config/routes";

const BASE_URL = "https://dummyjson.com";
const MAX_REFRESH_ATTEMPTS = 3;

let isRefreshing = false;
let refreshAttempts = 0;
let failedQueue: {
    resolve: (token: string | null) => void;
    reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });
    failedQueue = [];
};

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (originalRequest.url?.includes("/auth/refresh")) {
            clearTokens();
            window.location.href = ROUTES.LOGIN;
            return Promise.reject(error);
        }

        if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
            processQueue(new Error("Max refresh attempts reached"), null);
            refreshAttempts = 0;
            isRefreshing = false;
            clearTokens();
            showToast("error", "Сессия истекла. Войдите заново.");
            window.location.href = ROUTES.LOGIN;
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return apiClient(originalRequest);
            });
        }

        isRefreshing = true;
        refreshAttempts++;
        originalRequest._retry = true;

        try {
            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                throw new Error("No refresh token");
            }

            const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
                refreshToken,
                expiresInMins: 60,
            });

            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            refreshAttempts = 0;

            processQueue(null, data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return apiClient(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            clearTokens();
            showToast("error", "Сессия истекла. Войдите заново.");
            window.location.href = ROUTES.LOGIN;
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    },
);
