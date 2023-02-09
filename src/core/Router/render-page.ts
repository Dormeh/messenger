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
    auth: boolean;
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
    nav: {
        Page: NavPage,
        auth: false,
    },
    auth: {
        Page: LoginPage,
        auth: false,
    },
    registration: {
        Page: RegPage,
        auth: false,
    },
    chat: {
        Page: Chat_page,
        auth: true,
    },
    profile: {
        Page: ProfilePage,
        auth: true,
    },
    404: {
        Page: ServicePage,
        arg: {status: 404, message: 'кажется вы не туда попали', linkName: 'назад к чатам'},
        auth: false,
    },
    500: {
        Page: ServicePage,
        arg: {status: 500, message: 'ой ... похоже мы что-то сломали', linkName: 'назад к чатам'},
        auth: false,
    },
}

export default async function (path: string, match: string[]): Promise<Block> {

    if (process.env.DEBUG) console.log('render-page');

    const subUrl = match && match[1] ? {pageType: match[1]} : {}

    if (!routes[path])  path = 404;

    const page = routes[path].arg ? new routes[path].Page(routes[path].arg) : new routes[path].Page(subUrl);

    renderDOM(page);
    document.title = `App / ${routes[path].Page.componentName}`

    return page;
}
