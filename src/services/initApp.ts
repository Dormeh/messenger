import {authAPI} from '../api/auth'
import type {Dispatch} from 'core/Store';


export async function initApp(dispatch: Dispatch<AppState>) {

    try {
        let response = (await authAPI.me()).responseJSON();
        if (response && response.reason) {
            console.log(response.reason)
            return;
        } else console.log(response)

        dispatch({user: response});
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({appIsInited: true});
    }
}
