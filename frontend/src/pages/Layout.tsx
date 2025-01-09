import { Outlet } from "react-router";
import DarkModeSwitch from "../components/DarkModeSwitch";

const Layout = () => {
    return (
        <>
            <nav className="fixed h-screen w-96 bg-gray-200 dark:bg-gray-900 dark:text-white">
                <ul className="p-2">
                    <li className="p-5 rounded-3xl ring-2 ring-green-400 my-2">My Profile</li>
                    <li className="p-5 rounded-3xl ring-2 ring-green-400 my-2">Hello</li>
                    <li className="p-5 rounded-3xl ring-2 ring-green-400 my-2">Logout</li>
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