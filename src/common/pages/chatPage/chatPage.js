import {Templator} from '../../../utils/Templator'
import {template} from './chatPage.tmpl'

export class ChatPage {
    #chatTemplator
    #context

    constructor(context) {
        this.#chatTemplator = new Templator(template())
        this.#context = context
    }

    #openProfilePage() {
        window.history.pushState({}, '', './profile')
        window.history.go()
    }

    render() {
        return this.#chatTemplator.compile(this.#context, {
            openProfilePage: this.#openProfilePage
        })
    }
}