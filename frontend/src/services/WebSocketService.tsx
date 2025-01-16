import { Client, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ChatMessage } from "../models/ChatMessageModel";

const SOCKET_URL = "http://localhost:8080/ws";

export class WebSocketService {
    client: Client | null = null;
    subscriptions: { [key: string]: StompSubscription } = {};

    connect(jwtToken: string, onConnect: () => void, onError: (error: any) => void) {
        this.client = new Client({
            webSocketFactory: () => new SockJS(SOCKET_URL),
            connectHeaders: { Authorization: `Bearer ${jwtToken}`},
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: onConnect,
            onStompError: onError,
        });
        this.client.activate();
    }

    subscribe(chatId: string, callback: (message: ChatMessage) => void) {
        const path = `/topic/chat/${chatId}`;
        if (this.client && this.client.connected) {
            this.subscriptions[chatId] = this.client.subscribe(path, (message) => {
                const body = JSON.parse(message.body);
                callback(body);
            })
        }
    }

    sendMessage(chatId: string, message: ChatMessage) {
        const path = `/app/chat/${chatId}`
        if (this.client && this.client.connected) {
            this.client.publish({
                destination: path,
                body: JSON.stringify(message),
            })
        }
    }

    disconnect() {
        if (this.client) {
            Object.values(this.subscriptions).forEach((sub) => {
                if (sub) sub.unsubscribe();
            })
            this.client.deactivate();
        }
    }
}

export default new WebSocketService();