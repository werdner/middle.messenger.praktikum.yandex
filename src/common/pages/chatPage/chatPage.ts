import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import { Block } from '../../../core/Block';
import { InputValidator } from '../../../utils/inputValidator';
import { chat } from '../../../services/api/chat/chat';
import { GetChatsResponse } from '../../../services/api/chat/types';
import { WebSocketChat } from '../../../services/sockets/chat';
import { Message } from '../../../services/sockets/types';
import { validatorConfig } from '../../config/validatorConfig';

export class ChatPage extends Block {
    private readonly validatorConfig;
    private inputValidator: InputValidator;
    private pageTemplator;

    constructor(context?: object) {
        const state = {
            message: '',
            messages: [],
            currentUserId: -1,
            selectedChat: null,
            chatList: [],
            deleteChatStatus: false,
            errors: {},
        };


        const getCurrentUserId = () => {
            const userData = localStorage.getItem('user');
            const data = userData ? JSON.parse(userData) : {};

            return data?.id ?? -1;
        };

        state.currentUserId = getCurrentUserId();

        const events = {
            openProfilePage: () => router.go('/settings'),
            onSendMessageBlur: (event: Event) => this.onSendMessageBlur(event),
            onSendMessage: () => this.sendMessage(),
            onAddNewChat: () => this.openModal('.add_chat_modal'),
            onAddUser: async () => this.openModal('.add_user_modal'),
            onDeleteUser: () => this.openModal('.delete_user_modal'),
            onChatOptionsClick: () => this.openModal('.options__list'),
            onAddChatModalClose: () => this.closeModal('.add_chat_modal'),
            onAddUserModalClose: () => this.closeModal('.add_user_modal'),
            onDeleteUserModalClose: () => this.closeModal('.delete_user_modal'),
            onAddUserToChat: () => this.makeActionWithUser('addUser'),
            onDeleteUserFromChat: () => this.makeActionWithUser('deleteUser'),
            onCloseOptions: () => this.closeModal('.options__list'),
            onInputChange: (event: Event) => {
                const { target } = event;
                if (target instanceof HTMLInputElement) {
                    let state = this.store.state;
                    state[target.name] = target.value;
                    this.store.setState(state);
                }
            },
            onAddChat: async () => {
                this.store.state.loading = true;
                const modal = document.querySelector('.add_chat_modal');
                const input = modal?.querySelector('.modal__input');

                if (input instanceof HTMLInputElement) {
                    await chat.createChat({ title: input.value });
                    const chats = await chat.getChats();

                    const state = this.store.state;
                    this.closeModal('.add_chat_modal');
                    state.chatList = chats;
                    this.setMeta(this.pageTemplator?.updateTemplate(this.store.state));
                }
                this.store.state.loading = false;
            },
            onChangeDeleteStatus: () => {
                const state = this.store.state;
                state.deleteChatStatus = !state.deleteChatStatus;
                this.setMeta(this.pageTemplator?.updateTemplate(this.store.state));
            },
            onDeleteChat: (event: Event) => {
                const { target } = event;

                if (target instanceof HTMLElement) {
                    const chatId = target.getAttribute('data-chat-id');
                    const state = this.store.state;
                    state.deleteChatStatus = false;
                    this.deleteChat(Number(chatId));
                }
            },
            onSelectChat: (event: Event) => {
                const { target } = event;

                if (target instanceof HTMLElement) {
                    const chatId = target.getAttribute('data-chat-id');
                    const state = this.store.state;
                    if (chatId === state.selectedChat?.id) return;

                    const socket = WebSocketChat.instance;
                    socket.connect({
                        chatId: Number(chatId),
                        opened: () => {
                            socket.getMessages();
                        },
                        messages: (msg: Message[] | Message) => {
                            state.messages = (Array.isArray(msg) ? msg : [...state.messages, msg]) as Message[];
                            this.store.state.messages = state.messages;
                        },
                    });

                    state.selectedChat ? state.selectedChat.id = chatId : delete state.selectedChat;

                    const currentChat = this.store.state.chatList.find((chat: GetChatsResponse) => chat.id === Number(chatId));
                    state.selectedChat = currentChat;


                    this.setMeta(this.pageTemplator?.updateTemplate(this.store.state));
                }
            },
        };

        const tempaltor = new Templator(template, state);
        const vApp = tempaltor.compile(context, events);

        super('chatPage', vApp, state);

        this.pageTemplator = tempaltor;

        const { message } = validatorConfig;
        this.validatorConfig = { message };

        this.inputValidator = new InputValidator(this.store, this.validatorConfig);
    }

    async componentWillMount() {
        await this.getChats();
        const state = this.store.state;
        delete state.selectedChat;

        this.store.setState(state);
    }


    sendMessage() {
        const element = document.querySelector('.message__input');

        if (!element) return;

        const hasError = this.inputValidator.onInputBlur(element);
        const popup = document.querySelectorAll('.error-span');

        if (popup instanceof HTMLElement && this.store.state.errors.message) {
            setTimeout(() => {
                popup.style.display = 'none';
                popup.textContent = '';
            }, 3000);

            return;
        }

        if (hasError) return;

        const socket = WebSocketChat.instance;
        socket.sendMessage(this.store.state.message);

        console.log({
            message: this.store.state.message,
        });

        if (element instanceof HTMLInputElement) {
            element.value = '';
        }
        this.store.state.message = '';
    }

    onSendMessageBlur(event: Event) {
        this.inputValidator.onInputBlur(event);
        const popup = document.querySelector('.error-span');

        if (popup instanceof HTMLElement && this.store.state.errors.message) {
            setTimeout(() => {
                popup.style.display = 'none';
                popup.textContent = '';
            }, 3000);
        }
    }

    openModal(identifier: string) {
        const popup = document.querySelector(identifier);

        if (popup && popup instanceof HTMLElement) {
            popup.style.display = 'block';
        }
    }

    closeModal(identifier: string) {
        const popup = document.querySelector(identifier);

        if (popup && popup instanceof HTMLElement) {
            popup.style.display = 'none';
        }
    }

    async getChats() {
        const state = this.store.state;

        state.chatList = await chat.getChats();

        this.store.setState(state);
        this.setMeta(this.pageTemplator?.updateTemplate(this.store.state), false);
    }

    async deleteChat(chatId: number) {
        this.store.state.loadDeleteChat = true;

        try {
            await chat.deleteChat({ chatId });
            delete this.store.state.selectedChat;
            await this.getChats();
        } catch (error) {
            if (error && typeof error === 'object' && 'reason' in error) {
                alert(error?.reason)
            } else {
                alert(error)
            }
        } finally {
            this.store.state.loadDeleteChat = false;
        }
    }

    async makeActionWithUser(type: 'addUser' | 'deleteUser') {
        this.store.state.loading = true;
        const modal = document.querySelector('.add_user_modal');
        const input = modal?.querySelector('.modal__input');

        if (input instanceof HTMLInputElement) {
            await chat[type]({ chatId: this.store.state.selectedChat.id, users: [Number(input.value)] });

            this.closeModal('.options__list');
        }
        this.store.state.loading = false;
    }
}
