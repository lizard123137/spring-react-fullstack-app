import { useState } from "react"
import useAuth from "../../hooks/useAuth";

export default function Register() {
    const { register } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setUsername("");
        setEmail("");
        setPwd("");
    
        register(username, email, pwd)
    };

    return (
        <div className="h-screen dark:bg-gray-800 dark:text-white flex items-center justify-center">
            <div className="w-full md:w-1/2 p-12 dark:bg-slate-900 bg-gray-200 rounded-lg shadow-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
                    <input
                        type="username"
                        placeholder="Username"
                        className="input"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required/>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="input"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required/>
                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required/>
                    <input className="btn-primary" type="submit" value="Register"/>
                </form>
            </div>
        </div>
    )
}