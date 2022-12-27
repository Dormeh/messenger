import {renderDOM} from './core';
import LoginPage from './pages/login';
import RegPage from './pages/registrashion';
import Chat_page from './pages/chat'
import ProfilePage from  "./pages/profile-page"

import './asserts/css/main.css';

import {regAll} from './asserts/utils/registrAllComponents'

regAll();
const Chat = new Chat_page();
const Login = new LoginPage();
const Reg = new RegPage();
const Profile = new ProfilePage();

const routes = {
    auth: Login,
    registration: Reg,
    chat: Chat,
    profile: Profile
}

document.addEventListener("click", (event) => {
    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');

    if (href && routes[href]) {
        event.preventDefault();
        renderDOM(routes[href]);

    }
})

// document.addEventListener("DOMContentLoaded", () => {
//     renderDOM(Login);
// });

