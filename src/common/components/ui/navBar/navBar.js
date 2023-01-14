import {Templator} from '../../../../utils/Templator'
import {template} from './navBar.tmpl'
import {router} from '../../../../utils/Router';

export class NavBar {
    #navBarTemplator
    #context

    constructor(context) {
        this.#navBarTemplator = new Templator(template())
        this.#context = context
    }

    #open500ErrorPage() {
        router.start('/500')
    }

    #open404ErrorPage() {
        router.start('/404')
    }

    #openProfilePage() {
        router.start('/profile')
    }

    #openChatsPage() {
        router.start('/chats')
    }

    #openSignUpPage() {
        router.start('/sign-up')
    }

    #openSignInPage() {
        router.start('/sign-in')
    }

    render() {
        return this.#navBarTemplator.compile(this.#context, {
            open404ErrorPage: this.#open404ErrorPage,
            open500ErrorPage: this.#open500ErrorPage,
            openProfilePage: this.#openProfilePage,
            openChatsPage: this.#openChatsPage,
            openSignUpPage: this.#openSignUpPage,
            openSignInPage: this.#openSignInPage
        })
    }
}
