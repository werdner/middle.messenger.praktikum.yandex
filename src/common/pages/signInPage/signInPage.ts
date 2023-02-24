import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import { Block } from '../../../core/Block';
import { InputValidator } from '../../../utils/inputValidator';
import { SignInRequest } from '../../../services/api/auth/types';
import { auth } from '../../../services/api/auth/auth';
import { validatorConfig } from '../../config/validatorConfig';

type ValidationConfig = Record<string, Record<string, Record<string, string | number>>>;

export class SignInPage extends Block {
    private readonly validatorConfig?: ValidationConfig;
    private inputValidator?: InputValidator;

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
                const hasErrors = this.inputValidator?.onSubmitForm(event);
                const userData = {
                    login: this.store.state.login,
                    password: this.store.state.password,
                };

                if (hasErrors) return;

                await this.signIn(userData);
            },
        };


        const vApp = new Templator(template, state).compile(context, events);

        super('signIn', vApp, state);

        const { password, login } = validatorConfig;

        this.validatorConfig = { password, login };
        this.inputValidator = new InputValidator(this.store, this.validatorConfig);
    }

    async componentWillMount() {
        try {
            await auth.user();
            router.go('/messenger');
        } catch (error) {
            if (error && typeof error === 'object' && 'reason' in error) {
                console.warn(error.reason)
            }

            router.go('/');
        }
    }

    async signIn(userData: SignInRequest) {
        try {
            this.store.state.loading = true;

            await auth.signin(userData);
            const user = await auth.user();
            localStorage.setItem('user', JSON.stringify(user));

            router.go('/messenger');
        } catch (error) {
            if (error && typeof error === 'object' && 'reason' in error) {
                if (error.reason === 'Cookie is not valid') return
                alert(error?.reason)
            } else {
                alert(error)
            }
        } finally {
            this.store.state.loading = false;
        }
    }
}
