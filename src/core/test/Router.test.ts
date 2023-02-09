import { initRouter } from '../Router/initRouter';
import ServicePage from 'pages/service-page';
import LoginPage from 'pages/login';

describe('core/Router', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const router = initRouter();
    it('should register routes', () => {
        router.addRoute(/^test$/, 'test', false);
        const testRoute = router.routes.find((route) => route.path === 'test');
        expect(testRoute.pattern).toEqual(/^test$/);
    });
    it('should navigate to static routes and redirect 404 if not found route', async () => {
        await router.navigate('test');

        expect(location.pathname).toBe('/test');
        expect(router.page).toBeInstanceOf(ServicePage);
    });

    it('should pushState in history', async () => {
        const historyLength = history.length;
        await router.navigate('test');
        expect(history.length).toStrictEqual(historyLength + 1);
    });
    it('should return Page if it is in routes', async () => {
        await router.navigate('auth');
        expect(router.page).toBeInstanceOf(LoginPage);
    });
});
