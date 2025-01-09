import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { RegisterRequest } from "../models/requests/RegisterRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"
import DarkModeSwitch from "../components/DarkModeSwitch";

const validation = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const Register = () => {
    const { register } = useAuth();
    const form = useForm<RegisterRequest>({ resolver: yupResolver(validation) });

    const handleRegister = (form: RegisterRequest) => {
        register({
            username: form.username,
            email: form.email,
            password: form.password,
        });
    }

    return (
        <div className="h-screen dark:bg-gray-800 dark:text-white flex items-center justify-center">
            <header className="fixed top-0 right-0">
                <DarkModeSwitch />
            </header>
            <div className="w-full md:w-1/2 p-12 dark:bg-slate-900 bg-gray-200 rounded-lg shadow-full">
                <form onSubmit={form.handleSubmit(handleRegister)} className="flex flex-col gap-3 text-black">
                    <input
                        type="username"
                        placeholder="Username"
                        className="input"
                        {...form.register("username")}
                    />
                    <span className="text-red-500">
                        { form.formState.errors ? <p>{ form.formState.errors.username?.message }</p> : "" }
                    </span>

                    <input
                        type="email"
                        placeholder="Email address"
                        className="input"
                        {...form.register("email")}
                    />
                    <span className="text-red-500">
                        { form.formState.errors ? <p>{ form.formState.errors.email?.message }</p> : "" }
                    </span>

                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        {...form.register("password")}
                    />
                    <span className="text-red-500">
                        { form.formState.errors ? <p>{ form.formState.errors.password?.message }</p> : "" }
                    </span>

                    <input className="btn-primary" type="submit" value="Register"/>
                </form>
            </div>
        </div>
    )
}

export default Register