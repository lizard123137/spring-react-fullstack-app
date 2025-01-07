import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export default function useAuth() {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');

    return context;
}