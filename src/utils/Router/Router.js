export class Router {
    #name
    #routes

    constructor(name, routes) {
        this.#name = name
        this.#routes = routes
    }

    #getPageByPath() {
        const currentPath = window.location.pathname
        const page = this.#routes.filter((page) => page.path === currentPath)[0]

        return page ? page : this.#routes.find((page) => page.path === '/404')
    }

    start() {
        const root = document.querySelector('#root')
        const {page} = this.#getPageByPath()

        root.append(page.render())
    }
}