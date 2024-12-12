import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

export default function Chat() {
    const WS_URL = "ws://drogon_backend:8080/api/chat";
    
    const {sendJsonMessage} = useWebSocket(WS_URL, {
        share: true,
        queryParams: { }
    });

    useEffect(() => {
        fetch("http://drogon_backend:8080/test")
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <h1>Hello world</h1>
    );
}