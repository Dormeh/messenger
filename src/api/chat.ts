import request from '../core/HTTPTransport';
import {ChatData, ChatDelPayload, UserDelPayload} from  '../services/chats'

export type UserData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export const chatAPI = {
    getChats: () => request.get(`${process.env.API_ENDPOINT}/chats`),

    getUsers: (chatId: string) => request.get(`${process.env.API_ENDPOINT}/chats/${chatId}/users`),

    createChat: (data: ChatData | undefined) =>
        request.post(`${process.env.API_ENDPOINT}/chats`, { data, headers: { 'Content-Type': 'application/json' } }),

    deleteChat: (data: ChatDelPayload | undefined) =>
        request.delete(`${process.env.API_ENDPOINT}/chats`, { data, headers: { 'Content-Type': 'application/json' } }),

    userAddToChat: (data: ChatData | undefined) =>
        request.put(`${process.env.API_ENDPOINT}/chats/users`, {
            data,
            headers: { 'Content-Type': 'application/json' },
        }),

    userDelFromChat: (data: UserDelPayload | undefined) =>
        request.delete(`${process.env.API_ENDPOINT}/chats/users`, {
            data,
            headers: { 'Content-Type': 'application/json' },
        }),

    getToken: (chatId: string) => request.post(`${process.env.API_ENDPOINT}/chats/token/${chatId}`),
};
