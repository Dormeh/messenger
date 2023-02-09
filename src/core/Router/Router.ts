import Block from 'core/Block';
import renderPage from './render-page'
import {RouterInterface} from './RouterInterface'
import {Store} from "../Store";
import {ChatSocket} from "../../api/ChatSocket";

const chatSocket = ChatSocket.instance();

export default class Router implements RouterInterface {
    private routes = [];
    private page: Block<{}> | undefined;
    private notFoundPagePath: string = '';
    private authPagePath: string = '';


    constructor() {

        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');

            if (href && href.startsWith('/')) {
                event.preventDefault();
                this.navigate(href);
            }
        });
    }

    static instance() {
        if (!this._instance) {
            this._instance = new Router();
            if (process.env.DEBUG) console.log(
                '%cновый роутер',
                'background: #222; color: #bada55',
            );
        }

        return this._instance;
    }

    async route() {

        let strippedPath = decodeURI(window.location.pathname)
            .replace(/^\/|\/$/, '');
        chatSocket.close();

        let match: string[] | undefined | null;
        const store = Store.instance();
        const auth = await store.getState() && store.getState().user;
        for (let route of this.routes) {
            match = strippedPath.match(route.pattern);

            if (match) {
                if (!route.auth || auth) {
                    this.page = await this.changePage(route.path, match);
                } else {
                    history.replaceState(null, null, this.authPagePath)
                    this.page = await this.changePage(this.authPagePath)
                }
                break;
            }
        }
        if (!match) {
            this.page = await this.changePage(this.notFoundPagePath);
        }

        document.dispatchEvent(new CustomEvent('route', {
            detail: {
                page: this.page
            }
        }));
    }

    async changePage(path: string, match?: string[]) {
        if (this.page && this.page.destroy) {
            this.page.destroy();
        }
        return await renderPage(path, match);
    }

    async navigate(path: string) {
        history.pushState(null, null, path);
        await this.route();
    }

    addRoute(pattern: RegExp, path: string, auth: boolean) {
        this.routes.push({pattern, path, auth});
        return this;
    }

    setNotFoundPagePath(path: string) {
        this.notFoundPagePath = path;
        return this;
    }

    setAuthPagePath(path: string) {
        this.authPagePath = path;
        return this;
    }

    listen() {
        if (process.env.DEBUG) console.log('listen');
        window.addEventListener('popstate', () => this.route());
        this.route();
    }
}
