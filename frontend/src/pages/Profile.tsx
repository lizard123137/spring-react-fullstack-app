import { useParams } from "react-router";
import DarkModeSwitch from "../components/DarkModeSwitch";
import { userAPI } from "../services/UserService";
import { useEffect } from "react";


const Profile = () => {
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const user = userAPI(id);
            console.log(user);
        }
    }, []);

    const userProfile = {
        username: "Caps",
        description: "Hello world my name is caps and i use react",
        channels: ["test", "admins", "hackers"],
    }

    return (
        <div className="min-h-screen dark:bg-gray-800 dark:text-white">
            <div className="w-full flex flex-col items-center">
                <div className="w-40 h-40 mt-10 bg-green-400 rounded-full"></div>
                <h2 className="text-center text-6xl">{ userProfile.username }</h2>
                <p>{ userProfile.description }</p>

                <div className="w-1/2">
                    <h3 className="text-3xl">User chats:</h3>
                    <ul>
                        { userProfile.channels.map((channel) => {
                            return (
                                <li className="flex justify-between ring-2 ring-green-400 p-5 rounded-3xl my-3">
                                    <span>{ channel }</span>
                                    <button className="mr-4">Join</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
} 

export default Profile;