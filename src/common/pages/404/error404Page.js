import {Templator} from '../../../utils/Templator'
import {template} from './error404Page.tmpl'
import {router} from "../../../utils/Router";

export class Error404Page {
    #error404Templator
    #context

    constructor(context) {
        this.#error404Templator = new Templator(template())
        this.#context = context
    }

    #openChatsPage() {
        router.start('/chats')
    }

    render() {
        return this.#error404Templator.compile(this.#context, {
            openChatsPage: this.#openChatsPage
        })
    }
}