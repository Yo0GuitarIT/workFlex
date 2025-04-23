import { JSX } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hook/useAuth.ts";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>載入中...</div>;

    return user ? (
        children
    ) : (
        <Navigate to="/" replace state={{ from: location }} />
    );
};

export default ProtectedRoute;
