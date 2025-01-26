import { ChatMessage } from "../models/ChatMessageModel";

export default function Message({message}: {message: ChatMessage}) {
    return (
        <div className="inline-flex flex-col mt-3">
            <p className="ml-3 text-black dark:text-white">{message.sender}</p>
            <div className="w-fit bg-gray-100 dark:bg-slate-700 px-5 py-3 rounded-full dark:text-white">{message.content}</div>
        </div>
    )
}