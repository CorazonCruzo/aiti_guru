const REMEMBER_ME_KEY = "rememberMe";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

function getStorage(): Storage {
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === "true";
    return rememberMe ? localStorage : sessionStorage;
}

export const getRememberMe = (): boolean => {
    return localStorage.getItem(REMEMBER_ME_KEY) === "true";
};

export const setRememberMe = (value: boolean): void => {
    localStorage.setItem(REMEMBER_ME_KEY, String(value));
};

export const getAccessToken = (): string | null => {
    return getStorage().getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (token: string): void => {
    getStorage().setItem(ACCESS_TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null => {
    return getStorage().getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token: string): void => {
    getStorage().setItem(REFRESH_TOKEN_KEY, token);
};

export const clearTokens = (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(REMEMBER_ME_KEY);
};
