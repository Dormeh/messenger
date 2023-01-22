import {authAPI} from '../api/auth';
// import { UserDTO } from 'api/types';
import type {Dispatch} from 'core/Store';
import Router from "../core/Router/Router";
import {RegRequestData} from '../api/auth'
import {hasError} from '../asserts/utils/apiHasError';

type LoginPayload = {
    login: string;
    password: string;
};

export const login = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: LoginPayload,
) => {

    const response = (await authAPI.login(action)).responseJSON();


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
    const response = (await authAPI.registration(action)).responseJSON();


    if (hasError(response)) {
        dispatch({FormError: response.reason});
        return;
    }

    await authUserGet(dispatch, state);

};

export const logout = async (dispatch: Dispatch<AppState>) => {
    const router = Router.instance();

    await authAPI.logout();

    dispatch({isLoading: false, user: null});

    router.navigate('/auth');
};

const authUserGet = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
) => {
    const router = Router.instance();

    const response = (await authAPI.me()).responseJSON();

    if (hasError(response)) {
        console.log('Ошбка получения авторизации')
        dispatch(logout);
        return;
    }

    dispatch({user: response, FormError: null});

    router.navigate('/chat');
}



