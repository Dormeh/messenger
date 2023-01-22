import {authAPI} from '../api/auth';
// import { UserDTO } from 'api/types';
import type {Dispatch} from 'core/Store';
import Router from "../core/Router/Router";
import {RegRequestData} from '../api/auth'
import {unknownError} from '../api/constant'
import {hasError} from '../asserts/utils/apiHasError';

type LoginPayload = {
    login: string;
    password: string;
};
let response: Record<string, string> | string;

export const login = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: LoginPayload,
) => {
    try {
        response = (await authAPI.login(action)).responseJSON();

    } catch (e) {
        console.log(unknownError)
        dispatch({FormError: unknownError})
    }


    if (hasError(response)) {
        dispatch({FormError: response.reason})
        return;
    }

    await authUserGet(dispatch, state);
};

export const registration = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: RegRequestData,
) => {
    try {
        response = (await authAPI.registration(action)).responseJSON();

    } catch (e) {
        console.log(unknownError)
        dispatch({FormError: unknownError})
    }


    if (hasError(response)) {
        dispatch({FormError: response.reason});
        return;
    }

    await authUserGet(dispatch, state);

};

export const logout = async (dispatch: Dispatch<AppState>) => {
    const router = Router.instance();
    try {
        await authAPI.logout();

    } catch (e) {
        console.log(unknownError)
        dispatch({FormError: unknownError})
    }

    dispatch({isLoading: false, user: null});

    router.navigate('/auth');
};

const authUserGet = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
) => {
    const router = Router.instance();
    try {
        response = (await authAPI.me()).responseJSON();

    } catch (e) {
        console.log(unknownError)
        dispatch({FormError: unknownError})
    }

    if (hasError(response)) {
        console.log('Ошбка получения авторизации')
        dispatch(logout);
        return;
    }

    dispatch({user: response, FormError: null});

    router.navigate('/chat');
}



