import {Templator} from '../../../utils/Templator'
import {template} from './signUpPage.tmpl'
import {router} from "../../../utils/Router";

export class SignUpPage {
    #signUpTemplator
    #context

    constructor(context) {
        this.#signUpTemplator = new Templator(template())
        this.#context = context
    }

    #openSignInPage() {
        router.start('/sign-in')
    }

    render() {
        return this.#signUpTemplator.compile(this.#context, {
            openSignInPage: this.#openSignInPage
        })
    }
}