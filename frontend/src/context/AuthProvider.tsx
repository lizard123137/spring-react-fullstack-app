import { createContext, useContext, useState } from "react";

type LoginType = {
    email: string;
    password: string;
    remember_me?: boolean | undefined;
}

interface ProviderProps {
    user: string | null,
    token: string,
    login(data: LoginType): void,
    logout(): void,
}

const AuthContext = createContext<ProviderProps>({
    user: null,
    token: "",
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>("");
    const [token, setToken] = useState<string>("");

    const login = (data: LoginType) => {
        console.log(data);
    }

    const logout = () => {
        setUser("");
        setToken("");
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}