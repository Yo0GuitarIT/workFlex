import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import useAuth from "../hooks/useAuth.ts";

interface ProtectedRouteProps {
    children: ReactNode;
    requireAuth?: boolean; // true: 需要登入才能訪問, false: 已登入時重定向
}

const ProtectedRoute = ({
    children,
    requireAuth = true,
}: ProtectedRouteProps) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="p-8">載入中...</div>;

    if (requireAuth) {
        // 需要登入的路由：未登入時重定向到 Login
        return user ? (
            children
        ) : (
            <Navigate replace state={{ from: location }} to="/login" />
        );
    } else {
        // 不需要登入的路由（如 Login）：已登入時重定向到主頁面
        const from = location.state?.from?.pathname || "/";
        return user ? <Navigate replace to={from} /> : children;
    }
};

export default ProtectedRoute;
