import { authAPI } from '../api/auth';
// import { UserDTO } from 'api/types';
// import type { Dispatch } from 'core';
// import { transformUser, apiHasError } from 'utils';

type LoginPayload = {
    login: string;
    password: string;
};

export const auth = async (
    action:{
        login: string,
        password: string
    }
) => {
    // dispatch({ isLoading: true });
    console.log(action)

    const response = await authAPI.login(action);
    console.log(response)

    const sleep = (ms: number = 300) => new Promise((res) => setTimeout(res, ms));
    await sleep()



    // if (apiHasError(response)) {
    //     dispatch({ isLoading: false, loginFormError: response.reason });
    //     return;
    // }

    const responseUser = await authAPI.me();
    console.log(responseUser)

    // dispatch({ isLoading: false, loginFormError: null });
    //
    // if (apiHasError(response)) {
    //     dispatch(logout);
    //     return;
    // }
    //
    // dispatch({ user: transformUser(responseUser as UserDTO) });
    //
    // window.router.go('#profile');
};

// export const logout = async (dispatch: Dispatch<AppState>) => {
//     dispatch({ isLoading: true });
//
//     await authAPI.logout();
//
//     dispatch({ isLoading: false, user: null });
//
//     window.router.go('#onboarding');
// };
