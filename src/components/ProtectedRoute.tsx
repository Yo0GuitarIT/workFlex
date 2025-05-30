import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import useAuth from "../hooks/useAuth.ts";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();

    // 使用 useLocation 來獲取當前路由位置
    const location = useLocation();

    if (loading) return <div>載入中...</div>;

    return user ? (
        children
    ) : (
        <Navigate replace state={{ from: location }} to="/Login" />
    );
};

export default ProtectedRoute;
