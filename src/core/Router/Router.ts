import { render } from '../vdom/render';
import { mount } from '../vdom/mount';

export type Route = {
    path: string
    page: object & {
        render: () => void
    }
};

export class Router {
    private name;
    private render;
    private routes;
    private mount;

    constructor(name: string, routes: Route[]) {
        this.name = name;
        this.render = render;
        this.routes = routes;
        this.mount = mount;
    }

    getPageByPath(path: string) {
        const page = this.routes.filter((page) => page.path === path)[0];

        return page ? page : this.routes.find((page) => page.path === '/404');
    }

    start(path: string) {
        const route = this.getPageByPath(path);

        if (route) {
            route.page.render();
        }
    }
}
