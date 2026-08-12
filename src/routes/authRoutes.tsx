import type {RouteObject} from "react-router";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";

export const authRoutes: RouteObject[] = [
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    }
];