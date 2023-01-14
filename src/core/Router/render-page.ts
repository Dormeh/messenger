import Block from "../Block";
import LoginPage from "../../pages/login";
import RegPage from "../../pages/registrashion";
import Chat_page from "../../pages/chat";
import ProfilePage from "../../pages/profile-page";
import ServicePage from "../../pages/service-page";
import {renderDOM} from '../../core';
import {NavPage} from "../../pages/testPage/testPage";

type Page = {
    page: Record<string, Block>
    arg?: Record<string, number | string>
}
interface Rotes {
    nav: Record<string, Page>
    auth: Record<string, Page>
    registration: Record<string, Page>
    chat: Record<string, Page>
    profile: Record<string, Page>
    404: Record<number, Page>
    500: Record<number, Page>
}
const routes: Rotes = {
    nav: {Page: NavPage},
    auth: {Page: LoginPage},
    registration: {Page: RegPage},
    chat:{Page: Chat_page},
    profile:{Page: ProfilePage},
    404: {
        Page: ServicePage,
        arg: {status: 404, message: 'кажется вы не туда попали', linkName: 'назад к чатам'}
    },
    500: {
        Page: ServicePage,
        arg: {status:500, message: 'ой ... похоже мы что-то сломали', linkName:'назад к чатам'}
    },
}

export default async function (path: string, match?: string[]): Promise<Block> {
    console.log('render-page')

    // const { default: Page } = await import(/* webpackChunkName: "[request]" */`../pages/${path}/index.js`);
    const page = routes[path].arg ? new routes[path].Page(routes[path].arg) :new routes[path].Page;

    renderDOM(page);

    return page;
}
