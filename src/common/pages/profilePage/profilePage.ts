import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import { Block } from '../../../core/Block';
import { InputValidator } from '../../../utils/inputValidator';
import { auth } from '../../../services/api/auth/auth';
import { user } from '../../../services/api/user/user';
import { replaceNullToString } from '../../../utils/replaceNullToString';
import { UpdateProfileRequest } from '../../../services/api/user/types';
import { validatorConfig } from '../../config/validatorConfig';

export class ProfilePage extends Block {
    private readonly validatorConfig;
    private inputValidator: InputValidator;
    private pageTemplator?: Templator;

    constructor(context?: object) {
        let state = {
            isEditMode: false,
            password: '',
            errors: {},
        };

        const getUserData = () => {
            const userData = localStorage.getItem('user');
             const data = userData ? JSON.parse(userData) : {};

            return replaceNullToString(data);
        };


        state = Object.assign(getUserData(), state);

        const events = {
            onLogOut: async () => this.logout(),
            openChatsPage: () => router.go('/messenger'),
            onInputBlur: (event: Event) => this.inputValidator.onInputBlur(event),
            onChangePassword: () => this.openModal('.change_password_modal'),
            onChangePasswordModalClose: () => this.closeModal('.change_password_modal'),
            onAvatarUpload: async (event: Event) => {
                const formData = new FormData();
                const { target } = event;

                if (target instanceof HTMLInputElement) {
                    const image = target.files?.item(0);
                    if (!image) return;
                    formData.append('avatar', image);

                    const userData = await user.updateAvatar(formData);
                    localStorage.setItem('user', JSON.stringify(userData));
                    this.store.setState({ ...state, ...replaceNullToString(userData) });
                    this.setMeta(this.pageTemplator?.updateTemplate(this.store.state));
                }
            },
            changeEditMode: () => {
                this.store.setState({ ...this.store.state, isEditMode: !this.store.state.isEditMode });
                this.setMeta(this.pageTemplator?.updateTemplate(this.store.state));
            },
            onInputChange: (event: Event) => {
                const { target } = event;
                if (target instanceof HTMLInputElement) {
                    let state = Object.assign({}, this.store.state);
                    state[target.name] = target.value;
                    this.store.setState({ ...state });
                }
            },
            onSubmitForm: async (event: Event) => {
                const hasErrors = this.inputValidator.onSubmitForm(event);

                if (hasErrors) return;

                const { email, first_name, second_name, phone, login, password, display_name } = this.store.state;
                const userData = {
                    email,
                    first_name,
                    second_name,
                    phone,
                    login,
                    password,
                    display_name,
                };

                this.store.setState({ ...this.store.state, isEditMode: !this.store.state.isEditMode });

                await this.updateProfile(userData);
                this.setMeta(this.pageTemplator?.updateTemplate(this.store.state));
            },
            onChangePasswordClick: async () => {
                const inputs = document.querySelectorAll('.modal__input');
                const oldPassword = inputs[0];
                const newPassword = inputs[1];

                if (oldPassword instanceof HTMLInputElement && newPassword instanceof HTMLInputElement) {
                    const hasError = this.inputValidator.onInputBlur(newPassword);
                    if (hasError) return;

                    const data = {
                        oldPassword: oldPassword.value,
                        newPassword: newPassword.value,
                    };

                    try {
                        await user.updatePassword(data);
                    } catch (error) {
                        if (error && typeof error === 'object' && 'reason' in error) {
                            alert(error?.reason)
                        } else {
                            alert(error)
                        }
                    }

                    this.closeModal('.change_password_modal');
                }
            },
        };

        const templator = new Templator(template, state);
        const vApp = templator.compile(context, events);

        super('profilePage', vApp, state);

        this.pageTemplator = templator;

        const { first_name, second_name, display_name, phone, email, login, password } = validatorConfig;
        this.validatorConfig = {
            display_name,
            first_name,
            second_name,
            phone,
            email,
            login,
            password,
        };

        this.inputValidator = new InputValidator(this.store, this.validatorConfig);
    }

    async componentWillMount() {
        const state = this.store.state;
        const user = await auth.user();
        localStorage.setItem('user', JSON.stringify(user));

        Object.assign(state, replaceNullToString(user));
        this.store.setState(state);
        this.setMeta(this.pageTemplator?.updateTemplate(this.store.state), false);
    }

    async logout() {
        try {
            this.store.state.loading = true;

            await auth.logout();
            localStorage.removeItem('user');
            router.go('/');
        } catch (error) {
            if (error && typeof error === 'object' && 'reason' in error) {
                alert(error?.reason)
            } else {
                alert(error)
            }
        } finally {
            this.store.state.loading = false;
        }
    }

    async updateProfile(userData: UpdateProfileRequest) {
        let data;

        try {
            this.store.state.loading = true;
            data = await user.updateProfile(userData);
            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            if (error && typeof error === 'object' && 'reason' in error) {
                alert(error?.reason)
            } else {
                alert(error)
            }
        } finally {
            this.store.state.loading = false;
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
}
