import { createBrowserRouter, Navigate} from "react-router";
import {authRoutes} from "./authRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },

    ...authRoutes,
]);