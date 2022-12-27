import {renderDOM} from './core';
import LoginPage from './pages/login';
import RegPage from './pages/registrashion';
import Chat_page from './pages/chat'
import ProfilePage from  "./pages/profile-page"
import ServicePage from  "./pages/service-page"
import Block from 'core/Block';


import './asserts/css/main.css';

import {regAll} from './asserts/utils/registrAllComponents'

regAll();

const routes: Record<string | number, Block> = {
    auth: new LoginPage,
    registration: new RegPage,
    chat: new Chat_page,
    profile: new ProfilePage,
    404: new ServicePage({status:404, message: 'кажется вы не туда попали', linkName:'назад к чатам'}),
    500: new ServicePage({status:500, message: 'ой ... похоже вы что-то сломали', linkName:'назад к чатам'}),
}


document.addEventListener("click", (event):void => {
    const link = event.target.closest('a') as HTMLElement;
    if (!link) return;

    const href = link.getAttribute('href');

    if (href && routes[href]) {
        event.preventDefault();
        renderDOM(routes[href]);

    }
})

