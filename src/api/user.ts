import request from '../core/HTTPTransport';

export type UserData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export type searchUser = {
    login: string;
};

export type PasswordData = {
    oldPassword: string;
    newPassword: string;
};

export type AvatarData = FormData;

export const userAPI = {
    profileChg: (data: UserData) =>
        request.put(`${process.env.API_ENDPOINT}/user/profile`, {
            data,
            headers: { 'Content-Type': 'application/json' },
        }),

    passwordChg: (data: PasswordData) =>
        request.put(`${process.env.API_ENDPOINT}/user/password`, {
            data,
            headers: { 'Content-Type': 'application/json' },
        }),

    avatarChg: (data: AvatarData) =>
        request.put(`${process.env.API_ENDPOINT}/user/profile/avatar`, {
            data,
        }),

    userSearch: (data: searchUser) =>
        request.post(`${process.env.API_ENDPOINT}/user/search`, {
            data,
            headers: { 'Content-Type': 'application/json' },
        }),
};
