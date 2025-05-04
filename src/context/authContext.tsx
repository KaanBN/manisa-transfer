import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    userId: string;
    username: string;
    fullName: string;
    exp: number;
    [key: string]: any;
};

type AuthUser = {
    userId: string;
    username: string;
    fullName: string;
    token: string;
    role: string;
};

type AuthContextType = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

let logoutFn = () => {};

export const setLogoutFunction = (fn: () => void) => {
    logoutFn = fn;
};

export const getLogoutFunction = () => logoutFn;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                setUser({
                    userId: decoded.userId,
                    username: decoded.username,
                    fullName: decoded.fullName,
                    token,
                    role: decoded.role,
                });
            } catch {
                setUser(null);
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setLogoutFunction(logout);
    }, []);

    const login = (token: string) => {
        localStorage.setItem("accessToken", token);
        const decoded = jwtDecode<JwtPayload>(token);
        setUser({
            userId: decoded.userId,
            username: decoded.username,
            fullName: decoded.fullName,
            token,
            role: decoded.role,
        });
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};