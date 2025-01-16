import { Link, Outlet, useNavigate } from "react-router";
import DarkModeSwitch from "../components/DarkModeSwitch";
import { useAuth } from "../hooks/useAuth";
import { useRef, useState } from "react";
import Modal from "../components/Modal";

const Layout = () => {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [visible, setVisible] = useState(false);
    const [chatPath, setChatPath] = useState("");

    return (
        <>
            <Modal visible={visible}>
                <form onSubmit={() => {
                    setVisible(false);
                    navigate(`/chat/${chatPath}`);
                }}>
                    <input
                        className="input mb-4"
                        placeholder="Chat name"
                        onChange={(e) => setChatPath(e.target.value)}
                        required
                    />
                    <button className="btn-primary" type="submit">Join</button>
                </form>
            </Modal>
            <nav className="fixed h-screen w-96 bg-gray-200 dark:bg-gray-900 dark:text-white">
                <ul className="p-2">
                    <Link to={{pathname: `/users/${user?.id}`}}>
                        <li className="p-5 rounded-3xl ring-2 ring-green-400 my-2 text-center">My Profile</li>
                    </Link>
                    <li onClick={() => setVisible(!visible)} className="p-5 rounded-3xl ring-2 ring-green-400 my-2 text-center cursor-pointer">Join channel</li>
                    <li onClick={logout} className="p-5 rounded-3xl ring-2 ring-green-400 my-2 text-center cursor-pointer">Logout</li>
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