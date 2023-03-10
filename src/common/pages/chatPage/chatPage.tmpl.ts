import styles from './styles.module.css';
import { Templator } from '../../../core/Templator/Templator';
import { template as userAvatar, UserAvatar } from '../../templates/userAvatar/userAvatar.tmpl';
import { modalTemplate } from '../../templates/modal/modal.template';
import { Message } from '../../../services/sockets/types';
import { parseTime } from '../../../utils/parseTime';

type ChatProps = Record<string, any>;
export type ChatListProps = {
    id: number
    title: string
    avatar: string
    unread_count: number
    last_message?: {
        user: {
            first_name: string
            second_name: string
            avatar: string
            email: string
            login: string
            phone: string
        }
        time: Date
        content: string
    }
};

function getChatList(chatList: ChatListProps[], deleteChatStatus: boolean) {
    const hostResources = 'https://ya-praktikum.tech/api/v2/resources';
    return chatList.map((chat) => {
        const userAvatarProps: UserAvatar = {
            size: 'l',
            src: chat.avatar ? hostResources + chat.avatar : '',
        };

        const renderServiceSide = () => {
            if (deleteChatStatus) {
                return `
                    <span 
                        className="${styles['data__delete-chat']}"
                        data-chat-id="${chat.id}"
                        onClick="onDeleteChat"
                    />
                `;
            } else if (chat.unread_count > 0 ) {
                return (`
                    <div className="${styles['data__unread__messages__container']}">
                       <span className="${styles['data__unread__messages']}">
                          ${chat.unread_count}
                       </span>
                    </div>
                `);
            }

            return '';
        };

        return ( `
            <li
                className="${styles['chat__list__item']} contact"
                onClick="onSelectChat"
                data-chat-id="${chat.id}"
            >
                ${userAvatar(userAvatarProps)}
                <div className="${styles['contact__data']}">
                    <span className="${styles['data__title']}">${chat.title}</span>
                    <p className="${styles['data__message']}">${chat.last_message?.content ?? '???????????? ??????'}</p>
                </div>
                <div className="${styles['data__container']}">
                    <span>${parseTime(chat.last_message?.time)}</span>
                    ${renderServiceSide()}
                </div>
            </li>
        `);
    });
}

function renderMessages(messages: Message[] | Message, currentUserId: number) {
    if (Array.isArray(messages)) {
        return messages.map((_message, index, array) => {
            const oppositeIndex = (array.length - 1) - index;
            const oppositeMessage = array[oppositeIndex];
            return (`
                <li
                    className="${styles['messages__item']} ${currentUserId === oppositeMessage.user_id ? styles['owner'] : styles['other']}"
                >
                    <span>
                        ${oppositeMessage.content}
                    </span>
                </li>
            `);
        });
    }

    return (`
        <li
            className="${styles['messages__item']} ${currentUserId === messages.user_id ? styles['owner'] : styles['other']}"
        >
            <span>
                ${messages.content}
            </span>
        </li>
   x `);
}

function renderSettingsChatModal() {
    return (`
           <div className="${styles['chat__options__list__container']} options__list">
               <ul className="${styles['chat__options__list']}">
                  <li className="${styles['chat__options__item']}" onClick="onAddUser">
                    <span className="${styles['add__user__icon']}" />
                    <span>???????????????? ????????????????????????</span>
                  </li>
                  <li className="${styles['chat__options__item']}" onClick="onDeleteUser">
                     <span className="${styles['delete__user__icon']}" />
                     <span>?????????????? ????????????????????????</span>
                  </li>
               </ul>
                  <span className="${styles['close__options__list']}" onClick="onCloseOptions" />
           </div>
    `);
}

export function template(props?: ChatProps) {
    const {
        message,
        chatList,
        deleteChatStatus,
        selectedChat,
        messages,
        currentUserId,
    } = props ?? {};
    const addChatModalProps = {
        title: '?????????????? ?????????? ??????',
        inputTitle: '???????????????? ????????',
        inputName: 'chat_name',
        buttonText: '??????????????',
        onClose: 'onAddChatModalClose',
        onButtonClick: 'onAddChat',
        identifier: 'add_chat_modal',
    };

    const addUserToChatProps = {
        title: '???????????????? ????????????????????????',
        inputTitle: 'ID ????????????????????????',
        inputName: 'user_id',
        buttonText: '????????????????',
        onClose: 'onAddUserModalClose',
        onButtonClick: 'onAddUserToChat',
        identifier: 'add_user_modal',
    };

    const deleteUserFromChat = {
        title: '?????????????? ???????????????????????? ???? ????????',
        inputTitle: 'ID ????????????????????????',
        inputName: 'user_id',
        buttonText: '??????????????',
        onClose: 'onDeleteUserModalClose',
        onButtonClick: 'onDeleteUserFromChat',
        identifier: 'delete_user_modal',
    };

    const renderRightColumn = () => {
        if (selectedChat?.id === -1 || !selectedChat) {
            return (`
                <div className="${styles['empty__chat']}">???????????????? ??????</div>
            `);
        }
        return (`
                <header className="${styles['window__header']}">
                    ${userAvatar({ size: 'l', src: selectedChat.avatar ?? '' })}
                    <p className="${styles['chat__title']}">${selectedChat.title}</p>
                    <div className="${styles['chat__options__container']}">
                        <div className="${styles['chat__options__click-handler']}" onClick="onChatOptionsClick">
                            <div className="${styles['chat__options']}" />      
                        </div>
                        ${renderSettingsChatModal()}
                    </div>
                </header>
                <div className="${styles['window__main']}">
                    <ul className="${styles['messages__list']}">
                        ${renderMessages(messages, currentUserId)}
                    </ul>
                </div>
                <footer className="${styles['window__footer']} send__message__field">
                    <button className="${styles['send__message__settings']}" type="button"></button>
                    <input
                        className="${styles['send__message__field']} message__input"
                        type="text" placeholder="??????????????????"
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
    `);
    };

    const pageTemplate = () => `
        <div className="${styles['chat__container']}" data-id="chat">
            <article className="${styles['chat__column-left']}">
                <header className="${styles['column-left__header']} header">
                    <div className="${styles['header__container']}">
                        <button className="${styles['header__profile__burger']}">
                            <span className="${styles['burger__line']}" />
                        </button>
                        <button className="${styles['header__profile__button']}" onClick="{{ OnClick }}">??????????????</button>
                    </div>
                    <input href="#" className="${styles['header__profile__search']}" type="text" placeholder="??????????" />
                </header>
                <ul className="${styles['chat__list']} list">
                    {{ ChatList }}
                </ul>
                <footer className="${styles['column-left__footer']}">
                   <button className="${styles['footer__button-add-chat']}" onClick="onAddNewChat" />
                   <button className="${styles['footer__button-delete-chat']}" onClick="onChangeDeleteStatus" />
                </footer>
            </article>
            <article className="${styles['chat__column-right']} window">
            ${renderRightColumn()}
            </article>
            ${modalTemplate(addChatModalProps)}
            ${modalTemplate(addUserToChatProps)}
            ${modalTemplate(deleteUserFromChat)}
        </div>
    `;

    return new Templator(pageTemplate).prepareToCompile({
        OnClick: 'openProfilePage',
        ChatList: getChatList(chatList, deleteChatStatus),
    });
}
