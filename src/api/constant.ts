export const unknownError = 'ошибка передачи данных'

export type MessageT = {
    content?: string;
    type: 'message' | 'get old' | 'ping' | 'pong';
    time?: string;
    user_id?: number;
    id?: number;
};

export type RequestT = {
    Login: {
        login: string;
        password: string;
    };
    Register: {
        login: string;
        password: string;
        email: string;
        phone: string;
        first_name: string;
        second_name: string;
    };
    ChangePassword: {
        oldPassword: string;
        newPassword: string;
    };
    ChangeAvatar: {
        avatar: Blob;
    };
    AddChat: {
        title: string;
    };
    DeleteChat: {
        chatId: number;
    };
    SearchUser: {
        login: string;
    };
    AddUser: {
        users: Array<number>;
        chatId: number;
    };
    DeleteUser: RequestT['AddUser'];
    SendMessage: {
        message: string;
        type?: string;
    };
    SocketInit: {
        userId: number;
        chatId: number;
        token: string;
    };
};

export type UserT = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};
