import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import {JSX} from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
    requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
