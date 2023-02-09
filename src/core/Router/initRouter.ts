import Router from './Router';

export const initRouter = () => {
    const router = Router.instance();
    router
        .addRoute(/^$/, 'nav', false)
        .addRoute(/^auth$/, 'auth', false)
        .addRoute(/^registration$/, 'registration', false)
        .addRoute(/^chat$/, 'chat', true)
        .addRoute(/^profile$/, 'profile', true)
        .addRoute(/^profile\/(password)$/, 'profile')
        .addRoute(/^profile\/(edit)$/, 'profile')
        .addRoute(/^404\/?$/, '404', false)
        .addRoute(/^500\/?$/, '500', false)
        .setNotFoundPagePath('404')
        .setAuthPagePath('auth')
        .listen();

    return router;
};
