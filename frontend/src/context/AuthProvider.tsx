import { createContext, useEffect, useState } from "react";
import { LoginRequest } from "../models/requests/LoginRequest";
import { RegisterRequest } from "../models/requests/RegisterRequest";
import { UserModel } from "../models/UserModel"
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

type AuthContextType = {
    user: UserModel | null;
    token: string | null;
    refreshToken: string | null;

    register: (request: RegisterRequest) => void;
    login: (request: LoginRequest) => void;
    logout: () => void;

    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({children} : Props) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserModel | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        if(user && token && refreshToken) {
            setUser(JSON.parse(user));
            setToken(token);
            setRefreshToken(refreshToken);

            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }

        setIsReady(true);
    }, []);

    const register = async (request: RegisterRequest) => {
        await registerAPI(request).then((response) => {
            console.log(response?.data);

            toast.success("Register success!");
            navigate("/login");
        }).catch((e) => toast.warning("Server error occurred!"));
    }

    const login = async (request: LoginRequest) => {
        await loginAPI(request).then((response) => {
            if (!response) return;            

            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            setUser(response.data.user);
            setToken(response.data.token);
            setRefreshToken(response.data.refreshToken);

            navigate(`/users/${user?.id}`);
        }).catch((e) => toast.warning("Server error occurred!"));
    }

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        setUser(null);
        setToken(null);
        setRefreshToken(null);

        navigate("/");
    }

    const isLoggedIn = () => {
        return !!user;
    }

    return (
        <AuthContext.Provider value={{ user, token, refreshToken, register, login, logout, isLoggedIn }}>
            { isReady ? children : null }
        </AuthContext.Provider>
    )
}