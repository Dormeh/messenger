import Router from '../core/Router/Router';
import { AvatarData, searchUser, PasswordData, UserData, userAPI } from '../api/user';
import { hasError } from '../asserts/utils/apiHasError';
import { unknownError } from '../api/constant';
import {DispatchStateHandler} from './constants'
let response: Record<string, string> | string;

export const userChg: DispatchStateHandler<UserData> = async (dispatch, state, action) => {
    const router = Router.instance();
    try {
        response = (await userAPI.profileChg(action)).responseJSON();
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        dispatch({ FormError: response.reason });
        return;
    }

    dispatch({ user: response, FormError: null });

    await router.navigate('/profile');
};

export const passwordChg: DispatchStateHandler<PasswordData> = async (dispatch, state, action) => {
    const router = Router.instance();
    try {
        response = (await userAPI.passwordChg(action)).responseJSON();
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        dispatch({ FormError: response.reason });
        return;
    }
    dispatch({ isLoading: false, FormError: null });

    await router.navigate('/profile');
};

export const avatarChg: DispatchStateHandler<AvatarData> = async (dispatch, state, action) => {
    const router = Router.instance();

    dispatch({ isLoading: true });
    try {
        response = (await userAPI.avatarChg(action)).responseJSON();
    } catch (e) {
        console.log(unknownError);
        dispatch({ FormError: unknownError });
    }

    if (hasError(response)) {
        dispatch({ FormError: response.reason });
        return;
    }

    dispatch({ user: response, FormError: null });

    router.navigate('/profile');
};

export const userSearch = async (action: searchUser) => {
    try {
        response = (await userAPI.userSearch(action)).responseJSON();
    } catch (e) {
        console.log(unknownError);
        return;
    }

    return response;
};
