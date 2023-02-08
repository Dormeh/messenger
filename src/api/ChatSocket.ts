import {Store} from "core/Store";
import {MessageT, RequestT} from "./constant"
const store = Store.instance();

export class ChatSocket {
    private static __instance: ChatSocket;
    private activeSocket: WebSocket | null = null;

    static instance() {
        if (!this.__instance) {
            this.__instance = new ChatSocket();
            if (process.env.DEBUG) console.log(
                '%cновый Socket',
                'background: #222; color: #bada55',
            );
        }

        return this.__instance;
    }
    init({userId, chatId, token}: RequestT['SocketInit']) {
        this.close();
        this.activeSocket =
            new WebSocket(`${process.env.API_CHATS_WEBSOCKET_URL}/${userId}/${chatId}/${token}`);
        this.registerEvents();
    }
    close() {
        if (this.activeSocket) {
            this.activeSocket.close();
            this.activeSocket = null;
        }
    }
    registerEvents() {
        if (this.activeSocket === null) {
            return;
        }
        store.emit('webSocketInit');
        this.activeSocket.addEventListener('open', () => {
            store.emit('webSocketOpen');
        });
        this.activeSocket.addEventListener('close', (event: CloseEvent) => {
            store.emit('webSocketClose', event);
        });
        this.activeSocket.addEventListener('message', (event: MessageEvent) => {
            store.emit('webSocketMessage', event.data);
        });
        this.activeSocket.addEventListener('error', (event) => {
            store.emit('webSocketError', event);
        });
    }
    send(data: MessageT) {
        if (this.activeSocket &&
            this.activeSocket.readyState !== WebSocket.CLOSED) {
            this.activeSocket.send(JSON.stringify(data));
        }
    }
}
