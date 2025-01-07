import axios from "../api/axios";
import { createContext, useEffect, useState } from "react";

// TODO move user interface to separate file
interface User {
    id: number;
    username: string;
    email: string;
}

interface ProviderProps {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email:string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<ProviderProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('/auth/login', { username, password });
            console.log(response.data);
        } catch (error) {
            console.error('Login failed: ', error);
            throw new Error('Invalid username or password');
        }
    }

    const register = async (username: string, email: string, password: string) => {
        try {
            const response = await axios.post('/auth/register', { username, email, password });
            console.log(response);
        } catch (error) {
            console.error('Registration failed: ', error);
            throw new Error('Registration failed. Please try again...');
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;