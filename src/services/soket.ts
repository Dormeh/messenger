import {Store} from "../core";
import {ChatSocket} from '../api/ChatSocket'
import {chatAPI} from "../api/chat";
import {UserT, RequestT, MessageT} from "../api/constant"
const interval = 50000

const store = Store.instance()

const chatKeepAliveInterval = 30000;
const chatSelectInterval = 1000;
let chatReconnectInterval = 1000;

const getNewReconnectInterval = () => {
    chatReconnectInterval = chatReconnectInterval * 2;
    return chatReconnectInterval;
};

const chatSocket = ChatSocket.instance();

let connectTimer: ReturnType<typeof setTimeout> | null = null;

let chatKeepAlive: ReturnType<typeof setInterval> | null = null;

export const socketUnloadService = () => {
    if (connectTimer) {
        clearTimeout(connectTimer);
    }
    if (chatKeepAlive) {
        clearInterval(chatKeepAlive);
    }
};
const tokenGet = async (
    chatId: number,
) => {
    try {
        return (await chatAPI.getToken(chatId)).responseJSON();

    } catch (e) {
        return;
    }
};

export const connectToChatService = async () => {
    await chatSocket.close();
    const user: UserT | null | unknown = store.getState().user;
    if (!user || !('id' in user)) {
        await store.dispatch({chatError: 'user no ID'});
        return;
    }
    const userId = (user as UserT).id;
    const chatId = store.getState().selectedChatId as number;

    const {token} = await tokenGet(chatId);
    if (!token) {
        await store.dispatch({chatError: 'Token error'});
        return;
    }
    chatSocket.init({userId, chatId, token});
};

export const getOldMessagesService = async () => {
    chatSocket.send({content: '0', type: 'get old'});
};

store.on('webSocketInit', async () => {
    await store.dispatch({activeChatMessages: []});
});

export const sendMessageService = async (data: RequestT['SendMessage']) => {
    chatSocket.send({content: data.message, type: 'message'});
};



store.on('webSocketClose, webSocketError', async () => {
    socketUnloadService();
    connectTimer = setTimeout(() => {
        connectToChatService();
    }, getNewReconnectInterval());
});

store.on('webSocketClose', (event: CloseEvent) => {
    if (!event.wasClean) {
        console.warn('webSocketClose',
            `Code: ${event.code||''} | Reason: ${event.reason||''}`);
    }
});
store.on('webSocketError', (event: ErrorEvent) => {
    console.warn('webSocketError', event.message);
});

store.on('webSocketOpen', async () => {
    await getOldMessagesService();
    socketUnloadService();
    chatKeepAlive = setInterval(() => {
        chatSocket.send({type: 'ping'});
    }, chatKeepAliveInterval);
});

store.on('webSocketMessage', (data: string) => {
    let messages = store.getState().activeChatMessages as Array<MessageT>;
    if (typeof messages === 'object') {
        const count = messages.length;
        const parsed = JSON.parse(data);
        if (parsed instanceof Array) {
            messages.push(...parsed as Array<MessageT>);
            messages = messages.sort(msgSort);
        } else {
            if (parsed.type && parsed.type === 'message') {
                messages.push(parsed as MessageT);
            }
        }
        if (count !== messages.length) {
            store.dispatch({
                activeChatMessages: messages,
            });
        }
    }
});

function msgSort(a: MessageT, b: MessageT) {
    if (a.time && b.time) {
        const timeA = new Date(a.time).getTime();
        const timeB = new Date(b.time).getTime();
        return timeA - timeB;
    }
    return 0;
}
