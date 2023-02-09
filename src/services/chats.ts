import { chatAPI } from '../api/chat';
import type { Dispatch } from 'core/Store';
import { unknownError } from '../api/constant';
import { hasError } from '../asserts/utils/apiHasError';

type ChatPayload = {
    title: string;
};
type ChatDelPayload = {
    chatId: number;
};

type UserDelPayload = {
    chatId: number;
    users: number[];
};

let response: Record<string, string> | string;

const chatsLoadInterval = 15000;

export const chatsCreate = async (dispatch: Dispatch<AppState>, state: AppState, action: ChatPayload) => {
    try {
        response = (await chatAPI.createChat(action)).responseJSON();
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        dispatch({ FormError: response.reason });
        return;
    }

    await chatsGet(dispatch, state);
};

export const chatsGet = async (dispatch: Dispatch<AppState>, state: AppState) => {
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

export const chatsDelete = async (dispatch: Dispatch<AppState>, state: AppState, action: ChatDelPayload) => {
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

    await chatsGet(dispatch, state);
};
export const userAdd = async (dispatch: Dispatch<AppState>, state: AppState, action: ChatPayload) => {
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

export const userDel = async (dispatch: Dispatch<AppState>, state: AppState, action: UserDelPayload) => {
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

    await chatsGet(dispatch, state);
};

export const chatsLoadService = async (dispatch: Dispatch<AppState>, state: AppState) => {
    const chatsLoader = setInterval(() => chatsGet(dispatch, state), chatsLoadInterval);
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
