import { Router } from './Router';
import { HelloPage, LoginPage, ByePage, Register } from './mockPages';

describe('Router', () => {
    const router = new Router('.test');
    router
        .use('/', new HelloPage())
        .use('/login', new LoginPage())
        .use('/bye', new ByePage());

    test('router has correct root name', () => {
        expect(router.rootQuery).toBe('.test');
    });

    test('router has correct amount of routes', () => {
        expect(router.routes?.length).toBe(3);
        router.use('/register', new Register());
        expect(router.routes?.length).toBe(4);
    });

    test('Router return correct page', () => {
        expect(router.getRoute('/') instanceof HelloPage);
        expect(router.getRoute('/login') instanceof LoginPage);
        expect(router.getRoute('/bye') instanceof ByePage);
    });

    test('Router has correct current route', () => {
        router.go('/');
        expect(router.currentRoute).toBe('/');

        router.go('/bye');
        expect(router.currentRoute).toBe('/bye');

        router.go('/login');
        expect(router.currentRoute).toBe('/login');
    });
});
