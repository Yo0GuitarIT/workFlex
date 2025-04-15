import { JSX } from "react";
import { Navigate } from "react-router";
import useAuth from "../hook/useAuth.ts";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>載入中...</div>;

    return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
