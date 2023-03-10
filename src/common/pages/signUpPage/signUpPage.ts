import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import { Block } from '../../../core/Block';
import { InputValidator } from '../../../utils/inputValidator';
import { auth } from '../../../services/api/auth/auth';
import { SingUpRequest } from '../../../services/api/auth/types';
import { validatorConfig } from '../../config/validatorConfig';

export class SignUpPage extends Block {
    private readonly validatorConfig: Record<string, any>;
    private inputValidator: InputValidator;

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
            openSignInPage: () => router.go('/'),
            onInputBlur: (event: Event) => this.inputValidator.onInputBlur(event),
            onInputChange: (event: Event) => {
                const { target } = event;
                if (target instanceof HTMLInputElement)
                    let state = this.store.state;
                    state[target.name] = target.value;
                    this.store.setState(state);
                }
            },
            onSubmitForm: async (event: Event) => {
                const hasErrors = this.inputValidator.onSubmitForm(event);
                const userData = {
                    first_name: this.store.state.first_name as string,
                    email: this.store.state.email as string,
                    second_name: this.store.state.second_name as string,
                    phone: this.store.state.phone as string,
                    login: this.store.state.login as string,
                    password: this.store.state.password as string,
                };

                if (hasErrors) {
                    return;
                }

                await this.signUp(userData);
            },
        };
        const vApp = new Templator(template, state).compile(context, events);

        super('signUp', vApp, state);

        const { first_name, second_name, phone, email, login, password } = validatorConfig;

        this.validatorConfig = {
            first_name,
            second_name,
            phone,
            email,
            login,
            password,
            password_repeat: {
                isRequired: {
                    message: 'Поле повтора пароля не должно быть пустым',
                },
                isMatch: {
                    message: 'Парооли должны совпадатть',
                    password: '',
                },
            },
        };

        this.inputValidator = new InputValidator(this.store, this.validatorConfig);
    }

    async signUp(userData: SingUpRequest) {
        try {
            this.store.state.loading = true;

            await auth.signup(userData);
            const user = await auth.user();
            localStorage.setItem('user', JSON.stringify(user));

            router.go('/messenger');
        } catch (error) {
            if (error && typeof error === 'object' && 'reason' in error) {
                if (error.reason === 'Cookie is not valid') {
                    router.go('/');
                }
                alert(error?.reason);
            } else {
                alert(error);
            }
        } finally {
            this.store.state.loading = false;
        }
    }
}
