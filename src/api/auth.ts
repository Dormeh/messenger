import request from 'core/HTTPTransport';

export type APIError = {
    reason: string;
};

type LoginRequestData = {
    login: string;
    password: string;
};
export type RegRequestData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};


export const authAPI = {
    registration: (data: RegRequestData) =>
        request.post(`${process.env.API_ENDPOINT}/auth/signup`, {data, headers: { 'Content-Type': 'application/json' }}),

    login: (data: LoginRequestData) =>
        request.post(`${process.env.API_ENDPOINT}/auth/signin`, {data, headers: { 'Content-Type': 'application/json' }}),

    me: () => request.get(`${process.env.API_ENDPOINT}/auth/user`),

    logout: () => request.post(`${process.env.API_ENDPOINT}/auth/logout`),
};
