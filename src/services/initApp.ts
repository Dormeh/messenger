import {authAPI} from '../api/auth'


export async function initApp() {

    try {
        let response =( await authAPI.me()).responseJSON();
        if (response && response.reason) {
            console.log(response.reason)
            return;
        } else console.log(response)

        // dispatch({ user: transformUser(response as UserDTO) });
    } catch (err) {
        console.error(err);
    }
    // } finally {
    //     dispatch({ appIsInited: true });
    // }
}
