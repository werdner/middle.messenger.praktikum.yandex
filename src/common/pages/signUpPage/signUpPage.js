import {Templator} from '../../../utils/Templator'
import {template} from './signUpPage.tmpl'

export class SignUpPage {
    #signUpTemplator
    #context

    constructor(context) {
        this.#signUpTemplator = new Templator(template())
        this.#context = context
    }

    render() {
        return this.#signUpTemplator.compile(this.#context)
    }
}