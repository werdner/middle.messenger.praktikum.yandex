export class Router {
    #name
    #routes

    constructor(name, routes) {
        this.#name = name
        this.#routes = routes
    }

    #getPageByPath(path) {
        const page = this.#routes.filter((page) => page.path === path)[0]

        return page ? page : this.#routes.find((page) => page.path === '/404')
    }

    start(path) {
        debugger
        const root = document.querySelector('#root')
        const {page} = this.#getPageByPath(path)

        root.replaceChildren(page.render())
    }
}