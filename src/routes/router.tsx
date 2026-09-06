import { createBrowserRouter, Navigate} from "react-router";
import {authRoutes} from "./authRoutes";
import FeedPage from "../pages/feed";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },

    ...authRoutes,
    {
        path: '/main',
        element: <FeedPage />,
    },
]);
