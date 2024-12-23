import { createContext, useContext, useState } from "react";

type LoginType = {
    email: string;
    password: string;
    remember_me?: boolean | undefined;
}

type RegisterType = {
    email: string;
    password: string;
}

interface ProviderProps {
    user: string | null,
    token: string,
    login(data: LoginType): void,
    register(data: RegisterType): void,
    logout(): void,
}

const AuthContext = createContext<ProviderProps>({
    user: null,
    token: "",
    login: () => {},
    register: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>("");
    const [token, setToken] = useState<string>("");

    const login = (data: LoginType) => {
        console.log(data);
    }

    const register = (data: RegisterType) => {
        console.log(data);
    }

    const logout = () => {
        setUser("");
        setToken("");
    }

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}