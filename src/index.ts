import Router from 'core/Router/Router'

import './asserts/css/main.css';

import {regAll} from './asserts/utils/registrAllComponents'

import {initApp} from './services/initApp'

regAll();

const router = Router.instance();

router
    .addRoute(/^$/, 'nav')
    .addRoute(/^auth$/, 'auth')
    .addRoute(/^registration$/, 'registration')
    .addRoute(/^chat$/, 'chat')
    .addRoute(/^profile$/, 'profile')
    // .addRoute(/^profile\/pswd-change$/, 'profile/pswd-change')//todo пока не решил делать ли отдельные роуты для изменения профиля
    // .addRoute(/^profile\/change$/, 'profile/change')
    .addRoute(/^404\/?$/, '404')
    .addRoute(/^500\/?$/, '500')
    .setNotFoundPagePath('404')
    .listen();

initApp();
