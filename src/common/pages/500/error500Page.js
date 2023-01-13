import {Templator} from '../../../utils/Templator'
import {template} from './error500Page.tmpl'
import {router} from "../../../utils/Router";

export class Error500Page {
    #error500Templator
    #context

    constructor(context) {
        this.#error500Templator = new Templator(template())
        this.#context = context
    }

    #openChatsPage() {
        router.start('/chats')
    }

    render() {
        return this.#error500Templator.compile(this.#context, {
            openChatsPage: this.#openChatsPage
        })
    }
}
