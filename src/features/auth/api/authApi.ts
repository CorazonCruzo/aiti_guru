import { apiClient } from "@/shared/api/axiosInstance";

import type { AuthResponse, LoginParams } from "@/features/auth/model/types";

const TOKEN_EXPIRES_MIN = 60;

export const loginRequest = async (data: LoginParams): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", {
        ...data,
        expiresInMins: data.expiresInMins ?? TOKEN_EXPIRES_MIN,
    });
    return response.data;
};

export const refreshTokenRequest = async (token: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/refresh", {
        refreshToken: token,
        expiresInMins: TOKEN_EXPIRES_MIN,
    });
    return response.data;
};

export const getMeRequest = async (): Promise<AuthResponse> => {
    const response = await apiClient.get<AuthResponse>("/auth/me");
    return response.data;
};
