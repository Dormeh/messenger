import {chatAPI} from '../api/chat';
// import { UserDTO } from 'api/types';
import type {Dispatch} from 'core/Store';
import Router from "../core/Router/Router";
import {RegRequestData} from '../api/auth'
import {hasError} from '../asserts/utils/apiHasError';

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
    const router = Router.instance();

    dispatch({isLoading: true});
    console.log(action)

    const response = (await chatAPI.createChat(action)).responseJSON();
    console.log('CHATresponsePOST', response)

    const sleep = (ms: number = 300) => new Promise((res) => setTimeout(res, ms));
    await sleep()


    await chatsGet(dispatch,state);

};

export const chatsGet = async (
    dispatch: Dispatch<AppState>,
    state: AppState,) => {
    const responseChat = (await chatAPI.getChats()).responseJSON();

    console.log('CHATresponseGET', responseChat)
    dispatch( { chats: responseChat})

    return responseChat;
}

export const chatsDelete = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChatDelPayload,
) => {
    const router = Router.instance();

    dispatch({isLoading: true});
    console.log(action)

    const response = (await chatAPI.deleteChat(action)).responseJSON();
    console.log('CHATresponseDEL', response)

    const sleep = (ms: number = 300) => new Promise((res) => setTimeout(res, ms));
    await sleep()


    await chatsGet(dispatch,state);

};
export const userAdd = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChatPayload,
) => {
    const router = Router.instance();

    dispatch({isLoading: true});
    console.log(action)

    const response = (await chatAPI.userAddToChat(action)).responseJSON();
    console.log('CHATresponsePUT', response)




    await chatsGet(dispatch,state);

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
    console.log('CHATresponseDEL', response)




    await chatsGet(dispatch,state);

};
