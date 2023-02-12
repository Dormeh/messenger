import { authAPI } from '../api/auth';
import {DispatchStateHandler} from './constants'
import Router from '../core/Router/Router';
import { RegRequestData } from '../api/auth';
import { unknownError } from '../api/constant';
import { hasError } from '../asserts/utils/apiHasError';
import { Dispatch } from '../core';

type LoginPayload = {
    login: string;
    password: string;
};
let response: Record<string, string> | string;

export const login: DispatchStateHandler<LoginPayload> = async (dispatch, state, action) => {
    try {
        const xhr = (await authAPI.login(action));
        if (process.env.NODE_ENV === 'test') {
            response = xhr.response;
            dispatch({ test: response });
        } else response = xhr.responseJSON();
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        dispatch({ FormError: response.reason });
        return;
    }

    await authUserGet(dispatch, state);
};

export const registration: DispatchStateHandler<RegRequestData> = async (dispatch, state, action) => {
    try {
        response = (await authAPI.registration(action)).responseJSON();
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        dispatch({ FormError: response.reason });
        return;
    }

    await authUserGet(dispatch, state);
};

export const logout = async (dispatch: Dispatch<AppState>) => {
    const router = Router.instance();
    try {
        await authAPI.logout();
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    dispatch({ isLoading: false, user: null });

    await router.navigate('/auth');
};

const authUserGet = async (dispatch: Dispatch<AppState>) => {
    const router = Router.instance();
    try {
        const xhr = (await authAPI.me());
        response = process.env.NODE_ENV !== 'test' ? xhr.responseJSON() : xhr.response;
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        console.log('Ошбка получения авторизации');
        dispatch(logout);
        return;
    }

    dispatch({ user: response, FormError: null });

    await router.navigate('/chat');
};
