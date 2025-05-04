import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { JSX } from "react";
import { Loader2 } from "lucide-react"; // Import a loading spinner

interface ProtectedRouteProps {
    children: JSX.Element;
    requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth();

    // Show loading indicator while authentication state is being restored
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;