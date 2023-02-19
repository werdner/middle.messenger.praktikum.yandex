import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import { Block } from '../../../core/Block';
import {InputValidator} from "../../../utils/inputValidator";
import {SignInRequest} from "../../../services/api/auth/types";
import {auth} from "../../../services/api/auth/auth";

type ValidationConfig = Record<string, Record<string, Record<string, string | number>>>;

export class SignInPage extends Block {
    private readonly validatorConfig?: ValidationConfig;
    private inputValidator?: InputValidator

    constructor(context?: object) {
        const state = {
            login: '',
            password: '',
            errors: {},
        };

        const events = {
            openSignUpPage: () => router.go('/sign-up'),
            onInputBlur: (event: Event) => this.inputValidator?.onInputBlur(event),
            onInputChange: (event: Event) => {
                const { target } = event;
                if (target instanceof HTMLInputElement) {
                    let state = this.store.state;
                    state[target.name] = target.value;
                    this.store.setState(state);
                }
            },
            onSubmitForm: async (event: Event) => {
                const hasErrors = this.inputValidator?.onSubmitForm(event)
                const userData = {
                    login: this.store.state.login,
                    password: this.store.state.password,
                }

                if (hasErrors) return

                await this.signIn(userData)
            },
        };


        const vApp = new Templator(template, state).compile(context, events);

        super(vApp, state);

        this.validatorConfig = {
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
        };

        this.inputValidator = new InputValidator(this.store, this.validatorConfig)
    }

    async signIn(userData: SignInRequest) {
        try {
            this.store.state.loading = true

            await auth.signin(userData);
            const user = await auth.user();
            localStorage.setItem('user', JSON.stringify(user));

            router.go('/messenger');
        } catch (error) {
            alert(error)
        } finally {
            this.store.state.loading = false
        }
    }
}
