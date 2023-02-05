import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import { Block } from '../../../core/Block';
import {InputValidator} from "../../../utils/inputValidator";

export class ChatPage extends Block {
    private readonly validatorConfig;
    private inputValidator: InputValidator

    constructor(context?: object) {
        const state = {
            message: '',
            errors: {},
        };

        const events = {
            openProfilePage: () => router.start('/profile'),
            onSendMessageBlur: (event: Event) => {
                this.inputValidator.onInputBlur(event)
                const popup = document.querySelector('.error-span');

                if (popup instanceof HTMLElement && this.store.state.errors.message) {
                    setTimeout(() => {
                        popup.style.display = 'none';
                        popup.textContent = '';
                    }, 3000);
                }
            },
            onSendMessage: (event: Event) => {
                this.inputValidator.onInputBlur(event)
                const popup = document.querySelectorAll('.error-span');

                if (popup instanceof HTMLElement && this.store.state.errors.message) {
                    setTimeout(() => {
                        popup.style.display = 'none';
                        popup.textContent = '';
                    }, 3000);
                }

                console.log({
                    message: this.store.state.message,
                });
            },
            onInputChange: (event: Event) => {
                const { target } = event;
                if (target instanceof HTMLInputElement) {
                    let state = this.store.state;
                    state[target.name] = target.value;
                    this.store.setState(state);
                }
            },
        };

        const vApp = new Templator(template(state)).compile(context, events);

        super(vApp, state);

        this.validatorConfig = {
            message: {
                isRequired: {
                    message: 'Поле сообщения не должно быть пустым',
                },
            },
        };

        this.inputValidator = new InputValidator(this.store, this.validatorConfig)
    }
}
