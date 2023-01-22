import {chatAPI} from '../api/chat';
// import { UserDTO } from 'api/types';
import type {Dispatch} from 'core/Store';
import Router from "../core/Router/Router";
import {RegRequestData} from '../api/auth'
import {apiHasError} from '../asserts/utils';
import {hasError} from "../asserts/utils/apiHasError";

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


export const chatsCreate = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChatPayload,
) => {
    dispatch({isLoading: true});
    console.log(action)

    const response = (await chatAPI.createChat(action)).responseJSON();
    console.log('CHATresponsePOST', response)

    if (hasError(response)) {
        dispatch({ FormError: response.reason })
        return;
    }


    await chatsGet(dispatch, state);

};

export const chatsGet = async (
    dispatch: Dispatch<AppState>,
    state: AppState,) => {
    const response = (await chatAPI.getChats()).responseJSON();

    if (hasError(response)) {
        dispatch({ FormError: response.reason })
        return;
    }

    dispatch({chats: response, FormError: null }) //todo нужно внести в пользователя

}

export const chatsDelete = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChatDelPayload,
) => {

    const response = (await chatAPI.deleteChat(action)).responseJSON();

    if (hasError(response)) {
        dispatch({ FormError: response.reason })
        return;
    }

    await chatsGet(dispatch, state);

};
export const userAdd = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChatPayload,
) => {
    const router = Router.instance();

    console.log(action)

    const response = (await chatAPI.userAddToChat(action)).responseJSON();

    if (hasError(response)) {
        dispatch({ FormError: response.reason })
        return;
    }

};

export const userDel = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: UserDelPayload,
) => {
    const router = Router.instance();

    dispatch({isLoading: true});
    console.log(action)

    const response = (await chatAPI.userDelFromChat(action)).responseJSON();

    if (hasError(response)) {
        dispatch({ FormError: response.reason })
        return;
    }


    await chatsGet(dispatch, state);

};

export const tokenGet = async (
    action: string,
) => {

    return (await chatAPI.getToken(action)).responseJSON();



};

