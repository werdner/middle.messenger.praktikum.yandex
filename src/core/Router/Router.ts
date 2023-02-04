export type Route = {
    path: string
    page: object & {
        render: () => void
    }
};

export class Router {
    private routes;
    public name

    constructor(name: string, routes: Route[]) {
        this.routes = routes;
        this.name = name
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
