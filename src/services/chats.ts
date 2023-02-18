import { chatAPI } from '../api/chat';
import type { Dispatch } from 'core/Store';
import { unknownError } from '../api/constant';
import { hasError } from '../asserts/utils/apiHasError';
import {DispatchStateHandler, Responce} from './constants'
import {AvatarData} from "../api/user";
import Router from "../core/Router/Router";

export type ChatData = {
    title: string;
};
export type ChatDelPayload = {
    chatId: number;
};

export type UserDelPayload = {
    chatId: number;
    users: number[];
};

let response: Responce;

const chatsLoadInterval = 15000;

export const chatsCreate: DispatchStateHandler<ChatData> = async (dispatch, state, action) => {
    try {
        response = (await chatAPI.createChat(action)); //todo сделать также во всех ответах
        if (response instanceof XMLHttpRequest) { // todo вынести в отдельную функцию
            response = response.responseJSON()
        } else throw new Error('Ошибка получения ответа при chatsCreate')
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        dispatch({ FormError: response.reason });
        return;
    }

    await chatsGet(dispatch);
};

export const chatsGet = async (dispatch: Dispatch<AppState>) => {
    try {
        response = (await chatAPI.getChats()).responseJSON();
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        dispatch({ FormError: response.reason });
        return;
    }

    dispatch({ chats: response, FormError: null }); //todo нужно внести в пользователя
};

export const chatsDelete: DispatchStateHandler<ChatDelPayload> = async (dispatch, state, action) => {
    try {
        response = (await chatAPI.deleteChat(action)).responseJSON();
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        dispatch({ FormError: response.reason });
        return;
    }

    await chatsGet(dispatch);
};
export const userAdd: DispatchStateHandler<ChatData> = async (dispatch, state, action) => {
    try {
        response = (await chatAPI.userAddToChat(action)).responseJSON();
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        dispatch({ FormError: response.reason });
        return;
    }
};

export const userDel: DispatchStateHandler<UserDelPayload> = async (dispatch, state, action) => {
    try {
        response = (await chatAPI.userDelFromChat(action)).responseJSON();
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        dispatch({ FormError: response.reason });
        return;
    }

    await chatsGet(dispatch);
};

export const chatsLoadService = async (dispatch: Dispatch<AppState>, state: AppState) => {
    const chatsLoader = setInterval(() => chatsGet(dispatch), chatsLoadInterval);
    if (state.chatsLoader) {
        clearTimeout(state.chatsLoader);
    }
    dispatch({ chatsLoader });
};

export const chatsLoadClearInterval = (dispatch: Dispatch<AppState>, state: AppState) => {
    if (state.chatsLoader) {
        clearTimeout(state.chatsLoader);
    }
    dispatch({ chatsLoader: null });
};

export const chatAvatarChg: DispatchStateHandler<AvatarData> = async (dispatch, state, action) => {

    try {
        response = (await chatAPI.chatAvatarChg(action)).responseJSON();
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        dispatch({ FormError: response.reason });
        return;
    }

    await chatsGet(dispatch);
};
