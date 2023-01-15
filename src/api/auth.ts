// import { APIError, UserDTO } from './types';
import request from '../core/HTTPTransport';


const result = request.get
type LoginRequestData = {
    login: string;
    password: string;
};

// type LoginResponseData = {} | APIError;

export const authAPI = {
    login: (data: LoginRequestData) =>
        request.post(`${process.env.API_ENDPOINT}/auth/signin`, {data, headers: { 'Content-Type': 'application/json' }}),

    me: () => request.get(`${process.env.API_ENDPOINT}/auth/user`),

    logout: () => request.post('auth/logout'),
};
