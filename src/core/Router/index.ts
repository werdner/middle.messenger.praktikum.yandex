import { Router } from './Router';
import { SignInPage } from '../../common/pages/signInPage/index';
import { SignUpPage } from '../../common/pages/signUpPage/index';
import { ChatPage } from '../../common/pages/chatPage/index';
import { Error500Page } from '../../common/pages/500/index';
import { Error404Page } from '../../common/pages/404/index';
import {ProfilePage} from "../../common/pages/profilePage/index";

export const router = new Router('app', [
    {
        page: new SignInPage(),
        path: '/',
    },
    {
        page: new SignInPage(),
        path: '/sign-in',
    },
    {
        page: new SignUpPage(),
        path: '/sign-up',
    },
    {
        page: new ChatPage(),
        path: '/chats',
    },
    {
        page: new ProfilePage(),
        path: '/profile'
    },
    {
        page: new Error500Page(),
        path: '/500',
    },
    {
        page: new Error404Page(),
        path: '/404',
    },
]);
