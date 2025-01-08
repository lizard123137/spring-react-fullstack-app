import { useAuth } from "../hooks/useAuth"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginRequest } from "../models/requests/LoginRequest";
import * as Yup from "yup"

const validation = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const Login = () => {
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({ resolver: yupResolver(validation)})

    const handleLogin = (form: LoginRequest) => {
        login({
            username: form.username,
            password: form.password,
        });
    }

    return (
        <div className="h-screen dark:bg-gray-800 dark:text-white flex items-center justify-center">
            <div className="w-full md:w-1/2 p-12 dark:bg-slate-900 bg-gray-200 rounded-lg shadow-full">
                <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-3 text-black">
                    <input
                        type="username"
                        placeholder="Username"
                        className="input"
                        {...register("username")}    
                    />
                    { errors.username ? <p>{ errors.username.message }</p> : "" }

                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        {...register("password")}    
                    />
                    { errors.password ? <p>{ errors.password.message }</p> : "" }

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
};

export default Login;