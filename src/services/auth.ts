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
    const router = Router.instance();

    dispatch({isLoading: true});
    console.log(action)

    const response = (await authAPI.login(action)).responseJSON();
    console.log('loginresponse', response)

    const sleep = (ms: number = 300) => new Promise((res) => setTimeout(res, ms));
    await sleep()


    if (hasError(response)) {
        console.log(2222)
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }

    const responseUser = (await authAPI.me()).responseJSON();

    dispatch({ isLoading: false, loginFormError: null });

    if (hasError(response)) {
        console.log(111)
        dispatch(logout);
        return;
    }
    console.log('responseUser', responseUser)
    dispatch({ user: responseUser});

    router.navigate('/chat');
};

export const registration = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: RegRequestData,
) => {
    const router = Router.instance();

    dispatch({isLoading: true});
    console.log(action)

    const response = (await authAPI.registration(action)).responseJSON();;
    console.log(response)

    const sleep = (ms: number = 300) => new Promise((res) => setTimeout(res, ms));
    await sleep()


    if (hasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }

    const responseUser = (await authAPI.me()).responseJSON();;
    console.log(responseUser)

    dispatch({ isLoading: false, loginFormError: null });

    if (hasError(response)) {
        dispatch(logout);
        return;
    }

    dispatch({ user: responseUser});

    router.navigate('/chat');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
    const router = Router.instance();

    dispatch({ isLoading: true });

    await authAPI.logout();

    dispatch({ isLoading: false, user: null });

    router.navigate('/auth');
};



