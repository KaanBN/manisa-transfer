import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {TwoFaState} from "@/types/twoFaStateType.ts";

type JwtPayload = {
    userId: string;
    username: string;
    fullName: string;
    exp: number;
    is2FaStarted: boolean;
    is2FaVerified: boolean;
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
    twoFaState: TwoFaState;
    isTwoFaDialogOpen: boolean;
    setIsTwoFaDialogOpen: (twoFaDialogOpen: boolean) => void;
    login: (token: string) => void;
    logout: () => void;
    checkTwoFaDialog: () => void;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

let logoutFn = () => {
};
export const setLogoutFunction = (fn: () => void) => {
    logoutFn = fn;
};
export const getLogoutFunction = () => logoutFn;

let checkTwoFaDialogFn = () => {
};
export const setCheckTwoFaDialogFunction = (fn: () => void) => {
    checkTwoFaDialogFn = fn;
};
export const getCheckTwoFaDialogFunction = () => checkTwoFaDialogFn;

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [twoFaState, setTwoFaState] = useState<TwoFaState>({
        isStarted: false,
        isVerified: false,
    })
    const [isTwoFaDialogOpen, setIsTwoFaDialogOpen] = useState(false);
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
                    role: decoded.role
                });
                setTwoFaState({
                    isStarted: String(decoded.is2FaStarted).toLowerCase() === 'true',
                    isVerified: String(decoded.is2FaVerified).toLowerCase() === 'true'
                });
            } catch {
                setUser(null);
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setLogoutFunction(logout);
        setCheckTwoFaDialogFunction(checkTwoFaDialog);
    }, []);

    const login = (token: string) => {
        localStorage.setItem("accessToken", token);
        const decoded = jwtDecode<JwtPayload>(token);
        setUser({
            userId: decoded.userId,
            username: decoded.username,
            fullName: decoded.fullName,
            token,
            role: decoded.role
        });

        setTwoFaState({
            isStarted: String(decoded.is2FaStarted).toLowerCase() === 'true',
            isVerified: String(decoded.is2FaVerified).toLowerCase() === 'true'
        });
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
    };

    const checkTwoFaDialog = () => {
        if (!!user && (!twoFaState.isStarted || !twoFaState.isVerified))
        {
            setIsTwoFaDialogOpen(true);
        }
        else
        {
            setIsTwoFaDialogOpen(false);
        }
    };

    useEffect(() => {
        checkTwoFaDialog();
    }, [user, twoFaState.isStarted, twoFaState.isVerified]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user && twoFaState.isVerified,
                isLoading,
                twoFaState,
                login,
                logout,
                isTwoFaDialogOpen,
                setIsTwoFaDialogOpen,
                checkTwoFaDialog
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