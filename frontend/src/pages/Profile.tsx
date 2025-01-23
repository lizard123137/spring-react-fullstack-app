import { Link, useParams } from "react-router";
import { userAPI } from "../services/UserService";
import { useEffect, useState } from "react";
import { UserModel } from "../models/UserModel";
import { handleError } from "../utils/ErrorHandler";


const Profile = () => {
    const { username } = useParams();
    
    const [user, setUser] = useState<UserModel | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await userAPI(username!);
            if(response?.data)
                setUser(response?.data)
        }

        if(username) {
            fetchData().catch((e) => handleError(e));
        }
    }, []);

    return (
        <div className="min-h-screen dark:bg-gray-800 dark:text-white">
            <div className="w-full flex flex-col items-center">
                <img src={user?.avatar} className="w-40 h-40 mt-10 bg-green-400 rounded-full"/>
                <h2 className="text-center text-6xl">{ user ? user.username : "Unknown" }</h2>
                <p>{ user?.description ? user.description : "No description..." }</p>

                <div className="w-1/2">
                    <h3 className="text-3xl">User chats:</h3>
                    <ul>
                        { user?.chats.map((chatId) => {
                            return (
                                <li className="flex justify-between ring-2 ring-green-400 p-5 rounded-3xl my-3">
                                    <span>{ chatId }</span>
                                    <Link 
                                        to={{pathname: `/chat/${chatId}`}}
                                        className="mr-4"
                                    >Visit</Link>
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