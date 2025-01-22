import { useEffect, useState } from "react";
import Message from "../components/Message";
import { useParams } from "react-router";
import { ChatModel } from "../models/ChatModel";
import { chatAPI } from "../services/ChatService";
import { toast } from "react-toastify";
import WebSocketService from "../services/WebSocketService";
import { ChatMessage } from "../models/ChatMessageModel";
import { handleError } from "../helpers/ErrorHandler";
import { useAuth } from "../hooks/useAuth";

export default function Chat() {
    const { id } = useParams()

    const { token } = useAuth()
    const [ chat, setChat ] = useState<ChatModel | null>(null)
    const [ messages, setMessages ] = useState<ChatMessage[]>([])
    const [ message, setMessage ] = useState<string>("");

    useEffect(() => {
        const fetchChat = async () => {
            const response = await chatAPI(id!);
            if(response?.data)
                setChat(response.data);
        };

        fetchChat().catch((e) => handleError(e));

        const handleConnect = () => {
            if (chat) {
                WebSocketService.subscribe(chat.id, (message: ChatMessage) => {
                    setMessages((prevMessages) => [...prevMessages, message]);
                })
            } else {
                toast.warning("Failed to connect to chat");
            }
        }

        if (token) {
            WebSocketService.connect(token, handleConnect, handleError);
        } else {
            toast.warning("Missing JWT");
        }

        return () => {
            WebSocketService.disconnect();
        }

    }, [chat]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        WebSocketService.sendMessage({
            chatId: id!,
            sender: "caps",
            content: message,
        });
        console.warn("Send message");
    }

    return (
        <div className="h-screen dark:bg-gray-800">
            <div className="p-8 flex flex-col items-center">
                <h1 className="text-4xl font-bold">{ id }</h1>
                <span>Owner: { chat?.admin.username ?? "Error" }</span>
            </div>

            <div className="h-full fixed top-20 px-5 overflow-y-auto">
                <Message message={{sender: "Caps", content: "Hello", chatId: id!}}/>
                {messages.map((m) => (
                    <Message message={m}/>
                ))}
                <div className="h-64"></div>
            </div>

            <footer className="fixed bottom-0">
                <form 
                    className="block w-full flex flex-col md:flex-row"
                    onSubmit={handleSubmit}>
                    <input
                        className="input basis-3/4 bg-gray-100 dark:bg-slate-600 dark:text-white shadow-lg"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."/>
                    <input
                        className="btn-primary basis-1/4"
                        type="submit"
                        value="Send message"/>
                </form>
            </footer>
        </div>
    );
}