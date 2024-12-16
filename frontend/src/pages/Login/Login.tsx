export default function Login() {
    return (
        <div className="h-screen bg-gray-800 text-white flex items-center justify-center">
            <div className="w-1/2 p-10 bg-slate-900 rounded-lg shadow-full">
                <form action="#" className="flex flex-col gap-3">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="input"
                        required/>
                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        required/>
                    <input className="btn-primary" type="submit" value="Sign-in"/>
                </form>
                <a href="#" className="btn-secondary mt-3">Register</a>
            </div>
        </div>
    )
}