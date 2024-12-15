import useWebSocket from "react-use-websocket";
import Message from "./Message";

export default function Chat() {
    const WS_URL = "ws://localhost:8080/api/chat";
    
    const {sendJsonMessage} = useWebSocket(WS_URL, {
        share: true,
        queryParams: { }
    });


    let messages = [];
    for (let i = 0; i < 50; i++) {
        messages.push(<Message content="Message" />);
    }

    return (
        <div className="h-screen">
            <header className="bg-blue-300 fixed top-0 w-full">
                Group name
            </header>
            <h1>Hello world</h1>

            <div className="overflow-y-auto">
                {messages}
                <div className="h-32"></div>
            </div>

            <footer className="fixed bottom-0 w-full">
                <form>
                    <textarea className="resize-none" placeholder="Type your message here..."></textarea>
                    <input type="submit" value="send"/>
                </form>
            </footer>
        </div>
    );
}