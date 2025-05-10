import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import useAuth from "../hook/useAuth.ts";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();
    
    // 使用 useLocation 來獲取當前路由位置
    const location = useLocation();

    if (loading) return <div>載入中...</div>;

    return user ? (
        children
    ) : (
        <Navigate to="/Login" replace state={{ from: location }} />
    );
};

export default ProtectedRoute;
