import {authAPI} from '../api/auth'
import type {Dispatch} from 'core/Store';


export async function initApp(dispatch: Dispatch<AppState>) {

    try {
        let response = (await authAPI.me()).responseJSON();
        if (response && response.reason) {
            return;
        } else if (process.env.DEBUG) console.log(response);

        dispatch({user: response});
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({appIsInited: true});
    }
}
