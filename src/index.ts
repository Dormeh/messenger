import Router from 'core/Router/Router'

import './asserts/css/main.css';

import {regAll} from './asserts/utils/registrAllComponents'

regAll();

const router = Router.instance();

router
    .addRoute(/^$/, 'nav')
    .addRoute(/^auth$/, 'auth')
    .addRoute(/^registration$/, 'registration')
    .addRoute(/^chat$/, 'chat')
    .addRoute(/^profile$/, 'profile')
    .addRoute(/^404\/?$/, '404')
    .addRoute(/^500\/?$/, '500')
    .setNotFoundPagePath('404')
    .listen();
