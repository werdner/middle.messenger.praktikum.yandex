import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import { Block } from '../../../core/Block';
import {InputValidator} from "../../../utils/inputValidator";
import {auth} from "../../../services/api/auth/auth";
import {SingUpRequest} from "../../../services/api/auth/types";

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
            password_repeat: '',
            loading: false,
            errors: {},
        };

        const events = {
            openSignInPage: () => router.go('/sign-in'),
            onInputBlur: (event: Event) => this.inputValidator.onInputBlur(event),
            onInputChange: (event: Event) => {
                const { target } = event;
                if (target instanceof HTMLInputElement) {
                    let state = this.store.state;
                    state[target.name] = target.value;
                    this.store.setState(state);
                }
            },
            onSubmitForm: async (event: Event) => {
                const hasErrors = this.inputValidator.onSubmitForm(event)
                const userData = {
                    first_name: this.store.state.first_name as string,
                    email: this.store.state.email as string,
                    second_name: this.store.state.second_name as string,
                    phone: this.store.state.phone as string,
                    login: this.store.state.login as string,
                    password: this.store.state.password as string,
                }

                if (hasErrors) {
                    return
                }

                await this.signUp(userData)
            },
        };
        const vApp = new Templator(template, state).compile(context, events);

        super(vApp, state);

        this.validatorConfig = {
            password: {
                isRequired: {
                    message: 'Поле пароля не должно быть пустым',
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
            password_repeat: {
                isRequired: {
                    message: 'Поле повтора пароля не должно быть пустым',
                },
                isMatch: {
                    message: 'Парооли должны совпадатть',
                    password: ''
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

    async signUp(userData: SingUpRequest) {
        try {
            this.store.state.loading = true

            await auth.signup(userData)
            const user = await auth.user()
            localStorage.setItem('user', JSON.stringify(user));

            router.go('/messenger');
        } catch (error) {
            alert(error)
        } finally {
            this.store.state.loading = false
        }
    }
}
