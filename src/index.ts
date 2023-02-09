import {Store} from 'core'

import './asserts/css/main.css';

import {regAll} from './asserts/utils/registrAllComponents'

import {initApp} from './services/initApp'
import {initRouter} from "./core/Router/initRouter";

regAll();

(async function appStart() {

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

    initRouter()


})()



