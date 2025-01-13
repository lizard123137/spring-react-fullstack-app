import { Link, Outlet } from "react-router";
import DarkModeSwitch from "../components/DarkModeSwitch";
import { useAuth } from "../hooks/useAuth";

const Layout = () => {
    const { user, logout } = useAuth();

    return (
        <>
            <nav className="fixed h-screen w-96 bg-gray-200 dark:bg-gray-900 dark:text-white">
                <ul className="p-2">
                    <Link to={{pathname: `/users/${user?.id}`}}>
                        <li className="p-5 rounded-3xl ring-2 ring-green-400 my-2">My Profile</li>
                    </Link>
                    <li className="p-5 rounded-3xl ring-2 ring-green-400 my-2">Hello</li>
                    <li onClick={logout} className="p-5 rounded-3xl ring-2 ring-green-400 my-2 cursor-pointer">Logout</li>
                </ul>
            </nav>
            <div className="ml-96 dark:text-white">
                <header className="fixed top-0 right-0">
                    <DarkModeSwitch />
                </header>
                <Outlet />
            </div>
        </>
    );
};

export default Layout