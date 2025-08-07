import { type UserPublicDto } from "@/service";
import { getUserOptions } from "@/service/@tanstack/react-query.gen";
import { client } from "@/service/client.gen";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: UserPublicDto | null;
    token: string | null;
    login: (token: string, user: UserPublicDto) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserPublicDto | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    // Inicializar o token do localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            }
        }
    }, []);

    // Configurar o interceptor quando o token mudar
    useEffect(() => {
        if (token) {
            client.interceptors.request.use((request) => {
                if (!request.url.includes('/auth')) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
                return request;
            });
        }
    }, [token]);

    const currentUser = useQuery({
        ...getUserOptions(),
        retry: false,
        enabled: !!token
    })

    useEffect(() => {
        if (currentUser.isLoading) return;

        if (currentUser.isSuccess && currentUser.data) {
            setUser(currentUser.data);
            setIsAuthenticated(true);
        } else if (currentUser.isError) {
            logout();
        }
    }, [currentUser.status]);

    const login = (newToken: string, userData: UserPublicDto) => {
        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        // Remove o interceptor definindo um novo que não faz nada
        client.interceptors.request.use((request) => request);
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");        
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
} 