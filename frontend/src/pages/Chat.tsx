import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import DarkModeSwitch from "../components/DarkModeSwitch";

export default function Chat() {
    const WS_URL = "ws://localhost:8080/api/chat";
    
    const [ messages, setMessages] = useState<string[]>([])
    const [ message, setMessage ] = useState<string>("");
    const { sendMessage, readyState, lastJsonMessage } = useWebSocket(WS_URL);

    useEffect(() => {
        if (lastJsonMessage)
            setMessages((prevMessages => [
                ...prevMessages,
                JSON.stringify(lastJsonMessage)
            ]));
    }, [lastJsonMessage]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if (readyState === ReadyState.OPEN) {
            sendMessage(message);
            setMessage('');
        } else {
            console.warn("WebSocket is not open.");
        }
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiating',
    };

    // TEST message sending
    useEffect(() => {
        const message = { type: "greet", payload: "Hello WebSocket!" };
        sendMessage(JSON.stringify(message));
    }, []);

    return (
        <div className="h-screen dark:bg-gray-800">
            <header className="bg-violet-500 text-white fixed top-0 w-full h-20 flex justify-between">
                <h1 className="ml-5 text-4xl font-bold flex items-center">Example channel name</h1>
                <DarkModeSwitch />
            </header>

            <div className="w-full h-full fixed top-20 px-5 overflow-y-auto">
                {messages.map((m) => (
                    <Message user="Michal" content={m}/>
                ))}
                <div className="h-64"></div>
            </div>

            <footer className="w-full fixed bottom-0">
                <p className="dark:text-white ml-5">Websocket status: {connectionStatus[readyState]}</p>
                <form 
                    className="block w-full flex flex-col md:flex-row"
                    onSubmit={handleSubmit}>
                    <input
                        className="input basis-3/4 bg-gray-100 dark:bg-slate-600 shadow-lg"
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