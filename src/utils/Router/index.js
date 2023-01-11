import {Router} from './Router'
import {SignInPage} from '../../common/pages/signInPage/signInPage'
import {SignUpPage} from '../../common/pages/signUpPage/signUpPage'
import {ChatPage} from '../../common/pages/chatPage/chatPage';
import {ProfilePage} from '../../common/pages/profilePage/profilePage';
import {Error500Page} from '../../common/pages/500/error500Page';
import {Error404Page} from '../../common/pages/404/error404Page';

export const router = new Router('app', [
    {
        page: new SignInPage(),
        path: '/'
    },
    {
        page: new SignInPage(),
        path: '/sign-in'
    },
    {
        page: new SignUpPage(),
        path: '/sign-up'
    },
    {
        page: new ChatPage(),
        path: '/chats'
    },
    {
        page: new ProfilePage(),
        path: '/profile'
    },
    {
        page: new Error500Page(),
        path: '/500'
    },
    {
        page: new Error404Page(),
        path: '/404'
    }
])