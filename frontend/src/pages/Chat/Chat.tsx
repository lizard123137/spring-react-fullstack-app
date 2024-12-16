import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect, useState } from "react";
import Message from "./Message";

export default function Chat() {
    const WS_URL = "ws://localhost:8080/api/chat";
    
    const [ messages, setMessages] = useState<string[]>([])
    const [ message, setMessage ] = useState<string>("");
    const { sendMessage, readyState, lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        queryParams: { }
    });

    useEffect(() => {
        if (lastJsonMessage)
            setMessages((prevMessages => [...prevMessages, lastJsonMessage.toString()]));
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

    return (
        <div className="h-screen bg-gray-800">
            <header className="bg-violet-500 fixed top-0 w-full h-20">
                <h1 className="text-4xl text-white">Example channel name</h1>
            </header>

            <div className="fixed top-20 overflow-y-auto">
                <Message content="test message"/>
                {messages.map((m) => (
                    <Message content={m}/>
                ))}
                <div className="h-32"></div>
            </div>

            <footer className="w-full fixed bottom-0">
                <p className="text-white">Websocket status: {connectionStatus[readyState]}</p>
                <form 
                    className="block w-full flex flex-row"
                    onSubmit={handleSubmit}>
                    <input
                        className="input basis-3/4"
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