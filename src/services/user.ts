import {Dispatch} from "../core";
import Router from "../core/Router/Router";
import {AvatarData, userAPI} from "../api/user";
import {hasError} from "../asserts/utils/apiHasError";
import {logout} from "./auth";
import {UserData} from "../api/user";
import {PasswordData} from "../api/user";

export const userChg = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: UserData,
) => {
    const router = Router.instance();

    dispatch({isLoading: true});

    const response = (await userAPI.profileChg(action)).responseJSON();

    console.log(response);

    // if (hasError(response)) {
    //     dispatch(logout);
    //     return;
    // }

    dispatch({user: response});

    router.navigate('/profile');
};

export const passwordChg = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: PasswordData,
) => {
    const router = Router.instance();

    dispatch({isLoading: true});

    const response = (await userAPI.passwordChg(action)).responseJSON();

    console.log(response);

    // if (hasError(response)) {
    //     dispatch(logout);
    //     return;
    // }

    router.navigate('/profile');
};

export const avatarChg = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: AvatarData,
) => {
    const router = Router.instance();

    dispatch({isLoading: true});

    const response = (await userAPI.avatarChg(action)).responseJSON();

    console.log(response);

    dispatch({user: response});

    router.navigate('/profile');
};

