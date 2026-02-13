import { createBrowserRouter, Navigate } from "react-router-dom";

import { ROUTES } from "@/shared/config/routes";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { GuestGuard } from "./GuestGuard";
import { PrivateGuard } from "./PrivateGuard";

export const router = createBrowserRouter([
    {
        element: <GuestGuard />,
        children: [
            {
                element: <AuthLayout />,
                children: [{ path: ROUTES.LOGIN, element: <LoginPage /> }],
            },
        ],
    },
    {
        element: <PrivateGuard />,
        children: [
            {
                path: ROUTES.PRODUCTS,
                element: <div>Products (TODO)</div>,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to={ROUTES.PRODUCTS} replace />,
    },
]);
