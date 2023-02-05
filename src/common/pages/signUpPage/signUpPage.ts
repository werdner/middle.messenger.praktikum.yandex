import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import { Block } from '../../../core/Block';
import {InputValidator} from "../../../utils/inputValidator";

export class SignUpPage extends Block {
    private readonly validatorConfig: Record<string, any>;
    private inputValidator: InputValidator

    constructor(context?: object) {
        const state = {
            first_name: '',
            email: '',
            second_name: '',
            phone: '',
            login: '',
            password: '',
            errors: {},
        };

        const events = {
            openSignInPage: () => router.start('/sign-in'),
            onInputBlur: (event: Event) => this.inputValidator.onInputBlur(event),
            onInputChange: (event: Event) => {
                const { target } = event;
                if (target instanceof HTMLInputElement) {
                    let state = this.store.state;
                    state[target.name] = target.value;
                    this.store.setState(state);
                }
            },
            onSubmitForm: (event: Event) => {
                this.inputValidator.onSubmitForm(event)

                console.log({
                    first_name: this.store.state.first_name,
                    email: this.store.state.email,
                    second_name: this.store.state.second_name,
                    phone: this.store.state.phone,
                    login: this.store.state.login,
                    password: this.store.state.password,
                });
            },
        };
        const vApp = new Templator(template(state)).compile(context, events);

        super(vApp, state);

        this.validatorConfig = {
            password: {
                isRequired: {
                    message: 'Поле пароля не должно быть пукстым',
                },
                isCapitalSymbol: {
                    message: 'Поле пароля должно содержать одну заглавную букву',
                },
                isContainDigit: {
                    message: 'Поле пароля должно содержать одну цифру',
                },
                min: {
                    message: 'Поле пароля должно содержать минимум 8 символов',
                    value: 8,
                },
                max: {
                    message: 'Поле пароля не должно превышать 40 символлов',
                    value: 40,
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
