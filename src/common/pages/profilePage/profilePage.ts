import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import { Block } from '../../../core/Block';
import {InputValidator} from "../../../utils/inputValidator";
import {auth} from "../../../services/api/auth/auth";
import {user} from "../../../services/api/user/user";
import {replaceNullToString} from "../../../utils/replaceNullToString";
import {UpdateProfileRequest} from "../../../services/api/user/types";

export class ProfilePage extends Block {
    private readonly validatorConfig;
    private inputValidator: InputValidator
    private pageTemplator?: Templator

    constructor(context?: object) {
        let state = {
            isEditMode: false,
            errors: {},
        };

        const getUserData = () => {
            const userData = localStorage.getItem('user')
             const data = userData ? JSON.parse(userData) : {}

            return replaceNullToString(data)
        }


        state = Object.assign(getUserData(), state)

        const events = {
            onLogOut: async () => await this.logout(),
            openChatsPage: () => router.go('/messenger'),
            onInputBlur: (event: Event) => this.inputValidator.onInputBlur(event),
            onAvatarUpload: async (event: Event) => {
                const formData = new FormData()
                const { target } = event;

                if (target instanceof HTMLInputElement) {
                    const image = target.files?.item(0)
                    if (!image) return;
                    formData.append('avatar', image);

                    const userData = await user.updateAvatar(formData);
                    localStorage.setItem('user', JSON.stringify(userData));
                    this.store.setState({ ...state, ...replaceNullToString(userData) })
                    this.setMeta(this.pageTemplator?.updateTemplate(this.store.state))
                }
            },
            changeEditMode: () => {
                this.store.setState({ ...this.store.state, isEditMode: !this.store.state.isEditMode });
                this.setMeta(this.pageTemplator?.updateTemplate(this.store.state))
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
                const hasErrors = this.inputValidator.onSubmitForm(event)

                if (hasErrors) return

                const { email, first_name, second_name, phone, login, password, display_name } = this.store.state;
                const userData = {
                    email,
                    first_name,
                    second_name,
                    phone,
                    login,
                    password,
                    display_name,
                }

                this.store.setState({ ...this.store.state, isEditMode: !this.store.state.isEditMode });

                await this.updateProfile(userData)
                this.setMeta(this.pageTemplator?.updateTemplate(this.store.state))
            },
        };

        const templator = new Templator(template, state)
        const vApp = templator.compile(context, events);

        super(vApp, state);

        this.pageTemplator = templator

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

    async logout() {
        try {
            this.store.state.loading = true

            await auth.logout();
            localStorage.removeItem('user');
            router.go('/');

        } catch (error) {
            alert(error)
        } finally {
            this.store.state.loading = false
        }
    }

    async updateProfile(userData: UpdateProfileRequest) {
        let data

        try {
            this.store.state.loading = true
            data = await user.updateProfile(userData);
            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            alert(error)
        } finally {
            this.store.state.loading = false
        }
    }
}
