export default function Login() {
    return (
        <div className="h-screen bg-gray-800 text-white flex items-center justify-center">
            <div className="w-1/4">
                <form action="#" className="flex flex-col gap-3">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="rounded-md text-black"
                        required/>
                    <input
                        type="password"
                        placeholder="Password"
                        className="rounded-md text-black"
                        required/>
                    <input type="submit" value="Sign-in"/>
                </form>
                <a href="#" className="block w-full p-5 text-center">Register</a>
            </div>
        </div>
    )
}