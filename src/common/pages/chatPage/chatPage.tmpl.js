import * as styles from './styles.module.css'
import {Templator} from '../../../utils/Templator';
import {template as userAvatar} from '../../components/pofileAvatar/profileAvatar.tmpl';

export function template() {
    const chatList = [
        {
            title: 'Ivan',
            lastMessage: 'message'
        },
        {
            title: 'Ivan',
            lastMessage: 'message'
        }
    ]

    const pageTemplate =  `
        <div className="${styles['chat__container']}">
            <article className="${styles['chat__column-left']}">
                <header className="${styles['column-left__header']} header">
                    <a className="${styles['header__profile__link']}" href="{{ PathName }}">Профиль</a>
                    <input href="#" className="${styles['header__profile__search']}" type="text" placeholder="Поиск" />
                </header>
                <ul className="${styles['chat__list']} list">
                    {{ ChatList }}
                </ul>
            </article>
            <article className="${styles['chat__column-right']} window">
                <header className="${styles['window__header']}">
                
                </header>
                <div className="${styles['window__main']}">
                
                </div>
                <footer className="${styles['window__footer']} send__message__field">
                    <button className="${styles['send__message__settings']}" type="button"></button>
                    <input
                        className="${styles['send__message__field']}"
                        type="text" placeholder="Сообщение"
                        name="message"
                    />
                    <button className="${styles['send__message__button']}" type="button"></button>
                </footer>
            </article>
        </div>
    `

    return new Templator(pageTemplate).prepareToCompile({
        PathName: '/profile',
        ChatList: chatList.map((chat) => ( `
            <li
                className="${styles['chat__list__item']} contact"
            >
                ${userAvatar('l')}
                <div className="${styles['contact__data']}">
                    <span className="${styles['data__title']}">${chat.title}</span>
                    <p className="${styles['data__message']}">${chat.lastMessage}</p>
                </div>
            </li>
        `))
    })
}