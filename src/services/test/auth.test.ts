import {Store} from 'core/Store';
import {login, logout} from '../auth'
import user from '../../data/testUser.json'

describe('services/auth', () => {

    document.body.innerHTML = '<div id="app"></div>';
    const store = Store.instance()
    it('should auth user and get user from server send data', async () => {
        const userLogin = {login: "johndoe2", password: "test"}

        await store.dispatch(login, userLogin)
        expect(JSON.parse(store.getState().test)).toEqual(userLogin)
        expect(JSON.parse(store.getState().user)).toEqual(user)
    })
    it('should logout user and store prop user should be null', async () => {
        await store.dispatch(logout)
        expect(store.getState().user).toEqual(null)
    })
})
