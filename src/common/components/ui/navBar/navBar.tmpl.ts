import styles from './styles.module.css';
import { Templator } from '../../../../core/Templator/Templator';

export function template() {
    const LinksList = [
        {
            title: '404',
            method: 'open404ErrorPage',
        },
        {
            title: '500',
            method: 'open500ErrorPage',
        },
        {
            title: 'sing-in',
            method: 'openSignInPage',
        },
        {
            title: 'sign-up',
            method: 'openSignUpPage',
        },
        {
            title: 'chats',
            method: 'openChatsPage',
        },
        {
            title: 'profile',
            method: 'openProfilePage',
        },
    ];

    const navBartTemplate =  new Templator(() => `
        <nav className="${styles['navbar__container']}">
            <h1 className="${styles['navbar__title']}">NavBar</h1>
            <hr />
            <ul className="${styles['navbar__list']}">
                {{ LinksList }}
            </ul>
        </nav>
    `);

    const getLinks = () => {
        return LinksList.map((link) => {
            return `
                <li className="${styles['navbar__item']}">
                    <button
                        className="${styles['navbar__button']}"
                        onClick="${link.method}"
                    >
                        ${link.title}
                    </button>
                </li>
            `;
        });
    };

    return navBartTemplate.prepareToCompile({
        LinksList: getLinks(),
    });
}
