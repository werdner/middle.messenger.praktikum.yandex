import {Templator} from '../../../utils/Templator'
import {template} from './signInPage.tmpl'
import {router} from "../../../utils/Router/index";

export class SignInPage {
    #signInTemplator
    #context

    constructor(context) {
        this.#signInTemplator = new Templator(template())
        this.#context = context
    }

    #openSignUpPage() {
        router.start('/sign-up')
    }

    render() {
        return this.#signInTemplator.compile(this.#context, {
            openSignUpPage: this.#openSignUpPage
        })
    }
}
