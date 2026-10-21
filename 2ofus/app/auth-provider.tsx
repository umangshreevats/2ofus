"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type AuthContextType = {
    user: any;
    userData: any;
    coupleData: any;
};

type AuthContextValue = AuthContextType & {
    setAuth: React.Dispatch<React.SetStateAction<AuthContextType>>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
    children,
    initialAuth,
}: {
    children: ReactNode;
    initialAuth: AuthContextType;
}) {
    const [auth, setAuth] = useState(initialAuth);

    // Synchronize whenever fresh server data arrives.
    useEffect(() => {
        setAuth(initialAuth);
    }, [initialAuth]);

    return (
        <AuthContext.Provider value={{ ...auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}