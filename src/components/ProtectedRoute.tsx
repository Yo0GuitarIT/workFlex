import { JSX } from "react";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>載入中...</div>;

    return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
