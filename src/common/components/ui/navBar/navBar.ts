import { Templator } from '../../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../../core/Router';
import {Block} from "../../../../core/Block";

export class NavBar extends Block {

    constructor(context?: object) {
        const events = {
            open500ErrorPage() {
                router.go('/500');
            },
            open404ErrorPage() {
                router.go('/404');
            },
            openProfilePage() {
                router.go('/profile');
            },
            openChatsPage() {
                router.go('/messenger');
            },
            openSignUpPage() {
                router.go('/sign-up');
            },
            openSignInPage() {
                router.go('/sign-in');
            },
        }

        const vApp = new Templator(template).compile(context, events);

        super(vApp);
    }
}
