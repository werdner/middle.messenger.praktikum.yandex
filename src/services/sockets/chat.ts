import {chat} from "../api/chat/chat";
import {auth} from "../api/auth/auth";
import {IConnectFunction, IWebSocketChat, Message} from "./types";

export class WebSocketChat implements IWebSocketChat {
    private static _instance: WebSocketChat;

    private baseUrl = 'wss://ya-praktikum.tech/ws/chats';
    private socket: WebSocket | null;
    private interval: number | null;

    constructor() {
        this.socket = null
        this.interval = null
    }

    static get instance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new this();
        return this._instance;
    }

    getMessages() {
        this.socket?.send(JSON.stringify({content: '0', type: 'get old'}));
    }

    sendMessage(message: string) {
        this.socket?.send(JSON.stringify({content: message, type: 'message'}));
    }

    async connect({chatId, messages, opened, closed, failed}: IConnectFunction) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.clearInterval();
            this.disconnect();
        }

        const data = await chat.getToken(chatId);
        const user = await auth.user();

        const WEB_socket_URL = this.baseUrl + `/${user.id}/${chatId}/${data.token}`;

        this.socket = new WebSocket(WEB_socket_URL);

        this.socket.addEventListener('message', (ev) => {
            try {
                const data = JSON.parse(ev.data);
                const message: Message[] = Array.isArray(data) ? (data as []).reverse() : data;
                messages(message);
            } catch (error) {
                messages([]);
            }
        });

        this.socket?.addEventListener('open', () => {
            opened();
        });

        this.socket?.addEventListener('close', () => {
            closed && closed();
        });

        this.socket?.addEventListener('error', () => {
            failed && failed();
        });

        return this;
    }

    clearInterval() {
        clearInterval(this.interval!);
        this.interval = null;
    }

    disconnect() {
        this.socket?.close();
        this.socket = null;
    }
}
