import { Templator } from '../../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../../core/Router';
import {Block} from "../../../../core/Block";

export class NavBar extends Block {

    constructor(context?: object) {
        const events = {
            open500ErrorPage() {
                router.start('/500');
            },
            open404ErrorPage() {
                router.start('/404');
            },
            openProfilePage() {
                router.start('/profile');
            },
            openChatsPage() {
                router.start('/chats');
            },
            openSignUpPage() {
                router.start('/sign-up');
            },
            openSignInPage() {
                router.start('/sign-in');
            },
        }

        const vApp = new Templator(template()).compile(context, events);

        super(vApp);
    }
}
