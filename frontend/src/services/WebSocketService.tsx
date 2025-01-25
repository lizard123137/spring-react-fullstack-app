import { Client, messageCallbackType, StompSubscription } from "@stomp/stompjs";
import { ChatMessage } from "../models/ChatMessageModel";

export class WebSocketService {
    client: Client;
    subscription: StompSubscription | null = null;

    constructor() {
        this.client = new Client({
            brokerURL: "ws://localhost:8080/ws",
            debug: (s) => console.log(s),
            reconnectDelay: 2000,
            heartbeatIncoming: 200,
            heartbeatOutgoing: 200,
        });
    }

    connect(jwtToken: string, onConnect: () => void) {
        this.client.connectHeaders = { Authorization: `Bearer ${jwtToken}`};
        this.client.onConnect = onConnect;
        
        this.client.onWebSocketClose = (e) => {
            console.warn("Websocket closed: ", e);
        }

        this.client.onDisconnect = () => {
            console.warn("Disconnected from WebSocket server");
        }

        this.client.onWebSocketError = (e) => {
            console.error("Websocket error: " + e.body);
        }

        this.client.onStompError = (frame) => {
            console.error("Broker reported error: " + frame.headers["message"]);
            console.error("Additional details: " + frame.body)
        }

        this.client.activate();
    }

    subscribe(chatId: string, callback: messageCallbackType) {
        if (this.subscription) {
            console.warn("Already subscribed to topic.");
            this.subscription.unsubscribe();
        }
        this.subscription = this.client.subscribe(`/topic/${chatId}`, callback);
    }

    sendMessage(message: ChatMessage) {
        if (!this.client) {
            console.error("Websocket client doesn't exist!");
            return;
        }

        if (!message.chatId) {
            console.error("Message is missing a chat ID!");
            return;
        }

        this.client.publish({
            destination: `/topic/${message.chatId}`,
            body: JSON.stringify(message),
        });
    }

    disconnect() {
        this.subscription?.unsubscribe();
        this.client.deactivate();
    }
}

export default new WebSocketService();