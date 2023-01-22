import {Dispatch} from "../core";
import Router from "../core/Router/Router";
import {AvatarData, searchUser, PasswordData, UserData, userAPI} from "../api/user";
import {hasError} from "../asserts/utils/apiHasError";
import {unknownError} from "../api/constant";

let response: Record<string, string> | string;

export const userChg = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: UserData,
) => {
    const router = Router.instance();
    try {
        response = (await userAPI.profileChg(action)).responseJSON();

    } catch (e) {
        console.log(unknownError)
        dispatch({FormError: unknownError})
    }

    if (hasError(response)) {
        dispatch({FormError: response.reason})
        return;
    }

    dispatch({user: response, FormError: null});

    router.navigate('/profile');
};

export const passwordChg = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: PasswordData,
) => {
    const router = Router.instance();
    try {
        response = (await userAPI.passwordChg(action)).responseJSON();

    } catch (e) {
        console.log(unknownError)
        dispatch({FormError: unknownError})
    }

    if (hasError(response)) {
        dispatch({FormError: response.reason})
        return;
    }
    dispatch({isLoading: false, FormError: null});


    router.navigate('/profile');
};

export const avatarChg = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: AvatarData,
) => {
    const router = Router.instance();

    dispatch({isLoading: true});
    try {
        response = (await userAPI.avatarChg(action)).responseJSON();

    } catch (e) {
        console.log(unknownError)
        dispatch({FormError: unknownError})
    }

    if (hasError(response)) {
        dispatch({FormError: response.reason})
        return;
    }

    dispatch({user: response, FormError: null});

    router.navigate('/profile');
};

export const userSearch = async (
    action: searchUser,
) => {
    try {
        response = (await userAPI.userSearch(action)).responseJSON();

    } catch (e) {
        console.log(unknownError)
        return ;
    }

    return response;

};
