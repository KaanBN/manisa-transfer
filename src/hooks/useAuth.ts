import { useSyncExternalStore, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    userId: string;
    username: string;
    fullName: string;
    exp: number;
    [key: string]: any;
};

const getSnapshot = () => localStorage.getItem("accessToken");

export const useAuth = () => {
    const token = useSyncExternalStore(
        (cb) => {
            window.addEventListener("storage", cb);
            return () => window.removeEventListener("storage", cb);
        },
        getSnapshot
    );

    const user = useMemo(() => {
        if (!token) return null;

        try {
            const decoded = jwtDecode<JwtPayload>(token);

            return {
                userId: decoded.userId,
                username: decoded.username,
                fullName: decoded.fullName,
                token,
            };
        } catch {
            return null;
        }
    }, [token]);

    return {
        isAuthenticated: !!user,
        user,
    };
};