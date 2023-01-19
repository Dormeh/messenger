import request from "../core/HTTPTransport";

export type UserData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export type ChatData = {
    title: string;
}

export const chatAPI = {
    getChats: () => request.get(`${process.env.API_ENDPOINT}/chats` ),

    createChat: (data: ChatData) =>
        request.post(`${process.env.API_ENDPOINT}/chats`, {data, headers: { 'Content-Type': 'application/json' }}),

    deleteChat: (data: ChatData) =>
        request.delete(`${process.env.API_ENDPOINT}/chats`, {data, headers: { 'Content-Type': 'application/json' }}),

    // profileChg: (data: UserData) => request.put(`${process.env.API_ENDPOINT}/user/profile`, {
    //     data,
    //     headers: {'Content-Type': 'application/json'}
    // }),
    //
    // passwordChg: (data: PasswordData) => request.put(`${process.env.API_ENDPOINT}/user/password`, {
    //     data,
    //     headers: {'Content-Type': 'application/json'}
    // }),
    //
    // avatarChg: (data: AvatarData) => request.put(`${process.env.API_ENDPOINT}/user/profile/avatar`, {
    //     data,
    // }),

};