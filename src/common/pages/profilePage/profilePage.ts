import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import { Block } from '../../../core/Block';
import {InputValidator} from "../../../utils/inputValidator";

export class ProfilePage extends Block {
    private readonly validatorConfig;
    private inputValidator: InputValidator

    constructor(context?: object) {
        const state = {
            isEditMode: false,
            email: '',
            first_name: '',
            second_name: '',
            phone: '',
            login: '',
            display_name: '',
            errors: {},
        };

        const events = {
            openChatsPage: () => router.start('/chats'),
            onInputBlur: (event: Event) => this.inputValidator.onInputBlur(event),
            changeEditMode: () => {
                this.store.setState({ ...this.store.state, isEditMode: !this.store.state.isEditMode });
                const newVApp = new Templator(template(this.store.state)).compile(context, events);
                this.setMeta(newVApp);
            },
            onInputChange: (event: Event) => {
                const { target } = event;
                if (target instanceof HTMLInputElement) {
                    let state = Object.assign({}, this.store.state);
                    state[target.name] = target.value;
                    this.store.setState({ ...state });
                }
            },
            onSubmitForm: (event: Event) => {
                this.inputValidator.onSubmitForm(event)

                const { email, first_name, second_name, phone, login, password, display_name } = this.store.state;
                console.log({
                    email,
                    first_name,
                    second_name,
                    phone,
                    login,
                    password,
                    display_name,
                });
            },
        };

        const vApp = new Templator(template(state)).compile(context, events);

        super(vApp, state);

        this.validatorConfig = {
            display_name: {
                isRequired: {
                    message: 'Поле имени в чате не должно быть пустым',
                },
                isNumberAndLetter: {
                    message: 'Поле имени в чате должно содержать как минимум одно число и одну букву',
                },
                min: {
                    message: 'Поле имени в чате должно содержать как минимум 3 символа',
                    value: 3,
                },
                max: {
                    message: 'Поле имени в чате не должно превышать 20 символов',
                    value: 20,
                },
            },
            first_name: {
                isRequired: {
                    message: 'Поле имени не должно быть пустым',
                },
                isPersonName: {
                    message: 'Поле имени должно начинаться с заглавной буквы и не должно содержать пробелов или чисел',
                },
            },
            second_name: {
                isRequired: {
                    message: 'Поле фамилии не должно быть пустым',
                },
                isPersonName: {
                    message: 'Поле имени должно начинаться с заглавной буквы и не должно содержать пробелов или чисел',
                },
            },
            phone: {
                isRequired: {
                    message: 'Поле телефона не должно быть пустым',
                },
                isPhone: {
                    message: 'Поле телефона не должно быть пустым должно содержать от 10 до 15 цифр',
                },
            },
            email: {
                isRequired: {
                    message: 'Поле почты не дожно быть пустым',
                },
                isEmail: {
                    message: 'Неверно название почты',
                },
            },
            login: {
                isRequired: {
                    message: 'Поле логина не должно быть пустым',
                },
                isNumberAndLetter: {
                    message: 'Поле логина должно содержать как минимум одно число и одну букву',
                },
                min: {
                    message: 'Поле логина должно содержать как минимум 3 символа',
                    value: 3,
                },
                max: {
                    message: 'Поле логина не должно превышать 20 символов',
                    value: 20,
                },
            },
        };

        this.inputValidator = new InputValidator(this.store, this.validatorConfig)
    }
}
