import styles from './styles.module.css';
import { Templator } from '../../../core/Templator/Templator';
import { template as userAvatar } from '../../templates/userAvatar/userAvatar.tmpl';

type ChatProps = Record<string, any>;

function getChatList(chatList: { title: string, lastMessage: string }[]) {
    return chatList.map((chat) => ( `
            <li
                className="${styles['chat__list__item']} contact"
            >
                ${userAvatar('l')}
                <div className="${styles['contact__data']}">
                    <span className="${styles['data__title']}">${chat.title}</span>
                    <p className="${styles['data__message']}">${chat.lastMessage}</p>
                </div>
            </li>
        `));
}

export function template(props: ChatProps) {
    const { message } = props;
    const chatList = [
        {
            title: 'Ivan',
            lastMessage: 'message',
        },
        {
            title: 'Ivan',
            lastMessage: 'message',
        },
    ];

    const pageTemplate =  `
        <div className="${styles['chat__container']}">
            <article className="${styles['chat__column-left']}">
                <header className="${styles['column-left__header']} header">
                    <button className="${styles['header__profile__button']}" onClick="{{ OnClick }}">Профиль</button>
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
                        value="${message ?? ''}"
                        onBlur="onSendMessageBlur"
                        onInput="onInputChange"
                    />
                    <div className="${styles['send__message__container']}">
                        <button
                            className="${styles['send__message__button']}"
                            type="button"
                            onclick="onSendMessage"
                        />
                        <span className="${styles['send__message__popup']} error-span" data-name="${'message'}" />
                    </div>
                </footer>
            </article>
        </div>
    `;

    return new Templator(pageTemplate).prepareToCompile({
        OnClick: 'openProfilePage',
        ChatList: getChatList(chatList),
    });
}
