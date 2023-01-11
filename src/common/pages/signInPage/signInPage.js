import {Templator} from '../../../utils/Templator'
import {template} from './signInPage.tmpl'

export class SignInPage {
    #signInTemplator
    #context

    constructor(context) {
        this.#signInTemplator = new Templator(template())
        this.#context = context
    }

    render() {
        return this.#signInTemplator.compile(this.#context)
    }
}