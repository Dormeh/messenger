import Block from 'core/Block';
import renderPage from './render-page'

import {RouterInterface} from './RouterInterface'

export default class Router implements RouterInterface{
    private routes = [];
    private page: Block<{}> | undefined;
    private notFoundPagePath: string = '';

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
        }
        return this._instance;
    }

    async route() {
        let strippedPath = decodeURI(window.location.pathname)
            .replace(/^\/|\/$/, '');
        console.log('текущий Location', strippedPath)

        let match: string[] | undefined | null;

        for (let route of this.routes) {
            match = strippedPath.match(route.pattern);

            if (match) {
                this.page = await this.changePage(route.path, match);
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
        // if (this.page && this.page.destroy) { //todo Проверить удаление обработчиков в Block
        //     this.page.destroy();
        // }

        return await renderPage(path, match);
    }

    navigate(path: string) {
        history.pushState(null, null, path);
        this.route();
    }

    addRoute(pattern: RegExp, path: string) {
        this.routes.push({pattern, path});
        return this;
    }

    setNotFoundPagePath(path: string) {
        this.notFoundPagePath = path;
        return this;
    }

    listen() {
        console.log('listen')
        window.addEventListener('popstate', () => this.route());
        this.route();
    }
}
