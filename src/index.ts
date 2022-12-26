import {renderDOM, registerComponent} from './core';
import renderPage from './core/render-page';
import LoginPage from './pages/login';
import RegPage from './pages/registrashion';
import Chat_page from './pages/chat'
import ProfilePage from  "./pages/profile-page"

import './asserts/css/main.css';

import {Button} from './components/button';
import {ButtonSVG} from './components/button';
import Input from './components/input';
import Layout from './components/layout';
import Form from './components/form';
import ErrorComponent from './components/error';
import {Card} from "./components/card/card";
import {Avatar} from "./components/avatar/avatar";
import Chat_layout from "./components/chat-layout";
import ChatFeed from "./components/chat-feed";
import Message from "./components/message";
import MessageFeed from "./components/message-feed"

registerComponent(Button);
registerComponent(ButtonSVG);
registerComponent(Form);
registerComponent(Input);
registerComponent(Layout);
registerComponent(ErrorComponent);
registerComponent(Card);
registerComponent(Avatar);
registerComponent(Chat_layout);
registerComponent(ChatFeed);
registerComponent(Message);
registerComponent(MessageFeed);

const Chat = new Chat_page();
const Login = new LoginPage();
const Reg = new RegPage();
const Profile = new ProfilePage();



document.addEventListener("DOMContentLoaded", () => {
    renderDOM(Profile);
});

// document.addEventListener('click', (event: MouseEvent) => {
//     // @ts-ignore
//     const link = event.target.closest('a');
//     if (!link) return;
//     const href = link.getAttribute('href');
//     event.preventDefault();
//
//     if (href) {
//         let strippedPath = href
//             .replace(/^(.*?)\.html/, '$1');
//         console.log(strippedPath)
//         switch (strippedPath) {
//             case 'registrashion':
//                 renderDOM(Reg);
//                 break;
//             case 'index':
//                 renderDOM(Login);
//                 break;
//         }
//         //динамический импорт не сработал в parcel если не указан путь заранее
//         // async function foo() {
//         //     const Page = await renderPage(strippedPath);
//         //     await renderDOM(new Page);
//         // }
//         // foo().then();
//
//     }
// });

