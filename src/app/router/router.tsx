import { createBrowserRouter, Navigate } from "react-router-dom";

import { ROUTES } from "@/shared/config/routes";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { MainLayout } from "@/app/layouts/MainLayout";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { ProductsPage } from "@/pages/ProductsPage/ProductsPage";
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
                element: <MainLayout />,
                children: [{ path: ROUTES.PRODUCTS, element: <ProductsPage /> }],
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to={ROUTES.PRODUCTS} replace />,
    },
]);
