import {Templator} from '../../../utils/Templator'
import {template} from './profilePage.tmpl'
import {router} from "../../../utils/Router";

export class ProfilePage {
    #profileTemplator
    #context

    constructor(context) {
        this.#profileTemplator = new Templator(template())
        this.#context = context
    }

    #openChatsPage() {
        router.start('/chats')
    }

    render() {
        return this.#profileTemplator.compile(this.#context, {
            openChatsPage: this.#openChatsPage
        })
    }
}