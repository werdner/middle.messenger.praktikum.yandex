import {Templator} from '../../../utils/Templator'
import {template} from './chatPage.tmpl'
import {router} from "../../../utils/Router";

export class ChatPage {
    #chatTemplator
    #context

    constructor(context) {
        this.#chatTemplator = new Templator(template())
        this.#context = context
    }

    #openProfilePage() {
        router.start('/profile')
    }

    render() {
        return this.#chatTemplator.compile(this.#context, {
            openProfilePage: this.#openProfilePage
        })
    }
}