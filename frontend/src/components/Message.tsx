import { ChatMessage } from "../models/ChatMessageModel";

export default function Message({message}: {message: ChatMessage}) {
    return (
        <div className="mt-3">
            <p className="ml-3 text-black dark:text-white">{message.sender}</p>
            <p className="bg-gray-100 dark:bg-slate-700 px-5 py-3 rounded-full dark:text-white">{message.content}</p>
        </div>
    )
}