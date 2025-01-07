import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setUsername("");
        setPwd("");
    
        login(username, pwd)
    };

    return (
        <div className="h-screen dark:bg-gray-800 dark:text-white flex items-center justify-center">
            <div className="w-full md:w-1/2 p-12 dark:bg-slate-900 bg-gray-200 rounded-lg shadow-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="username"
                        placeholder="Username"
                        className="input"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required/>
                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required/>
                    <input className="btn-primary" type="submit" value="Sign-in"/>
                </form>
                <Link
                    to={{
                        pathname: "/register"
                    }}
                    className="btn-secondary mt-3"
                    >Register</Link>
            </div>
        </div>
    )
}