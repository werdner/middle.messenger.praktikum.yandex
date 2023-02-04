import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import { Block } from '../../../core/Block';
import { Validator } from '../../../utils/validator';

export class ChatPage extends Block {
    private readonly validatorConfig;
    private validator: Validator;

    constructor(context?: object) {
        const state = {
            message: '',
            errors: {},
        };

        const events = {
            openProfilePage: () => router.start('/profile'),
            onSendMessageBlur: () => {
                const popup = document.querySelector('.popup-error');
                const isHTMLElement = popup && popup instanceof HTMLElement;
                const { errors, hasErrors } = this.validator.validate(this.validatorConfig, this.store.state, 'message');

                const newState = Object.assign({}, this.store.state);
                newState.errors = {
                    ...state.errors,
                    ...errors,
                };

                if (hasErrors) {
                    this.store.setState(newState);
                } else {
                    this.store.state.errors['message'] = '';
                }

                if (hasErrors && isHTMLElement) {
                    popup.textContent = this.store.state.errors['message'];
                    popup.style.display = 'inline-block';
                }

                if (isHTMLElement) {
                    setTimeout(() => {
                        popup.style.display = 'none';
                        popup.textContent = '';
                    }, 3000);
                }
            },
            onSendMessage: () => {
                const popup = document.querySelector('.popup-error');
                const isHTMLElement = popup && popup instanceof HTMLElement;
                const { errors, hasErrors } = this.validator.validate(this.validatorConfig, this.store.state, 'message');

                const newState = Object.assign({}, this.store.state);
                newState.errors = {
                    ...state.errors,
                    ...errors,
                };

                if (hasErrors) {
                    this.store.setState(newState);
                } else {
                    this.store.state.errors['message'] = '';
                }

                if (hasErrors && isHTMLElement) {
                    popup.textContent = this.store.state.errors['message'];
                    popup.style.display = 'inline-block';
                }

                if (isHTMLElement) {
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

        this.validator = new Validator();
        this.validatorConfig = {
            message: {
                isRequired: {
                    message: 'Message field is required',
                },
            },
        };
    }

    // private validate(fieldName?: string) {
    //     let errors = {}
    //
    //     if (fieldName) {
    //         errors = validateByField({fieldName, value: this.store.state[fieldName]}, this.validatorConfig);
    //     } else {
    //         errors = validateAll(this.store.state, this.validatorConfig);
    //     }
    //
    //     const state = this.store.state
    //     const errorsLength = Object.keys(errors).length
    //
    //     if (errorsLength > 0) {
    //         state.errors = {
    //             ...state.errors,
    //             ...errors
    //         }
    //     } else {
    //         fieldName ? state.errors[fieldName] = '' : state.errors = {}
    //     }
    //
    //     this.store.setState(state)
    //     return errorsLength !== 0;
    // };
}
