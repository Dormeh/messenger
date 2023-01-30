import Router from 'core/Router/Router'
import {Store} from 'core'

import './asserts/css/main.css';

import {regAll} from './asserts/utils/registrAllComponents'

import {initApp} from './services/initApp'

regAll();

(async function appStart() {

    const router = Router.instance();
    const store = Store.instance();

    await store.dispatch(initApp);

    store.on('changed', (prevState, nextState) => {
        if (process.env.DEBUG) {
            console.log(
                '%cstore updated',
                'background: #222; color: #bada55',
                nextState,
            );
        }
    });

    router
        .addRoute(/^$/, 'nav', false)
        .addRoute(/^auth$/, 'auth', false)
        .addRoute(/^registration$/, 'registration', false)
        .addRoute(/^chat$/, 'chat', true)
        .addRoute(/^profile$/, 'profile', true)
        .addRoute(/^profile\/(password)$/, 'profile')
        .addRoute(/^profile\/(edit)$/, 'profile')
        .addRoute(/^404\/?$/, '404', false)
        .addRoute(/^500\/?$/, '500', false)
        .setNotFoundPagePath('404')
        .setAuthPagePath('auth')
        .listen();

})()



