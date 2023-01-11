import {Templator} from '../../../utils/Templator'
import {template} from './profilePage.tmpl'

export class ProfilePage {
    #profileTemplator
    #context

    constructor(context) {
        this.#profileTemplator = new Templator(template())
        this.#context = context
    }

    render() {
        return this.#profileTemplator.compile(this.#context)
    }
}