import { Route } from './Route';
import { Block } from '../Block';

export class Router {
    static _instance: Router | null = null;
    public rootQuery: string | null = null;

    public readonly history: History | null = null;
    public routes: Route[] | null = null;
    public currentRoute: string | null = null;

    constructor(rootQuery: string) {
        if (Router._instance) {
            return Router._instance;
        }

        this.routes = [];
        this.history = window.history;
        this.rootQuery = rootQuery;

        Router._instance = this;
    }

    use(pathname: string, block: Block) {
        const route = new Route(pathname, block);

        this.routes?.push(route);

        return this;
    }

    start() {
        window.addEventListener('popstate', () => {
            this._onRoute(window.location.pathname);
            this.currentRoute = window.location.pathname;
        }, false);

        this.currentRoute = window.location.pathname;
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        let route = this.getRoute(pathname) ?? this.getRoute('/404');
        if (!route) {
            return;
        }

        this.currentRoute = pathname;
        route?.render();
    }

    go(pathname: string) {
        if (!this.history) {
            return;
        }

        this.currentRoute = pathname;
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.currentRoute = window.location.pathname;
        this.history?.back();
    }

    forward() {
        this.currentRoute = window.location.pathname;
        this.history?.forward();
    }

    getRoute(pathname: string) {
        return this.routes?.find(route => route.match(pathname));
    }
}
