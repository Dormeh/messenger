import {tokenGet} from './chats'
import {Store} from "../core";
const interval = 50000

const store = Store.instance()
export const socketInit = async (userId: string, chatId: string) => {
    const {token} = await tokenGet(chatId);

    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    socket.addEventListener('open', () => {
        console.log('Соединение установлено');

        socket.send(JSON.stringify({
            content: 'Моё первое сообщение миру!',
            type: 'message',

        }));

        setInterval(() => socket.send(JSON.stringify({
            type: 'ping',

        })), interval)
    });

    socket.addEventListener('close', event => {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения');
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', event => {
        console.log('Получены данные', event.data);
    });

    socket.addEventListener('error', event => {
        console.log('Ошибка', event.message);
    });
    await store.dispatch({socket: socket})

    return socket;
}

