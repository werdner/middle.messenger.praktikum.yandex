import { Router } from './Router';
import { SignInPage } from '../../common/pages/signInPage';
import { SignUpPage } from '../../common/pages/signUpPage';
import { ChatPage } from '../../common/pages/chatPage';
import { Error500Page } from '../../common/pages/500';
import { Error404Page } from '../../common/pages/404';
import { ProfilePage } from '../../common/pages/profilePage';

const router = new Router('.app');

router
    .use('/', new SignInPage())
    .use('/sign-up', new SignUpPage())
    .use('/messenger', new ChatPage())
    .use('/settings', new ProfilePage())
    .use('/500', new Error500Page())
    .use('/404', new Error404Page());


// @ts-ignore
window.router = router;

export { router };
