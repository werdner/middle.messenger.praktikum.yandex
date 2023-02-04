import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import {Block} from "../../../core/Block";
import {Validator} from "../../../utils/validator";

export class ProfilePage extends Block {
    private readonly validatorConfig
    private validator: Validator

    constructor(context?: object) {
        const state = {
            isEditMode: false,
            userInfo: {
                email: '',
                first_name: '',
                second_name: '',
                phone: '',
                login: '',
                display_name: ''
            },
            errors: {}
        }

        const events = {
            openChatsPage: () => router.start('/chats'),
            onInputBlur: (event: Event) => {
                const {target} = event

                if (target instanceof HTMLInputElement) {
                    const popup = document.querySelector(`[data-name=${target.name}]`)
                    const isHTMLElement = popup && popup instanceof HTMLElement
                    const {errors, hasErrors} = this.validator.validate(this.validatorConfig, this.store.state.userInfo, target.name)

                    const newState = Object.assign({}, this.store.state)
                    newState.errors = {
                        ...state.errors,
                        ...errors
                    }

                    if (hasErrors) {
                        this.store.setState(newState)
                    } else {
                        target.name ? this.store.state.errors[target.name] = '' : this.store.state.errors = {}
                    }

                    if (hasErrors && isHTMLElement) {
                        popup.textContent = this.store.state.errors[target.name]
                        popup.style.display = 'inline-block'
                    } else if (isHTMLElement) {
                        popup.style.display = 'none'
                        popup.textContent = ''
                    }
                }
            },
            changeEditMode: () => {
                this.store.setState({...this.store.state, isEditMode: !this.store.state.isEditMode})
                const newVApp = new Templator(template(this.store.state)).compile(context, events)
                this.setMeta(newVApp)
            },
            onInputChange: (event: Event) => {
                const {target} = event
                if (target instanceof HTMLInputElement) {
                    let state = Object.assign({}, this.store.state.userInfo)
                    state[target.name] = target.value
                    this.store.setState({...this.store.state, userInfo: state})
                }
            },
            onSubmitForm: (event: Event) => {
                event.preventDefault()
                const popup = document.querySelectorAll(`.error-span`)
                const {errors, hasErrors} = this.validator.validate(this.validatorConfig, this.store.state.userInfo)

                const newState = Object.assign({}, this.store.state)
                newState.errors = {
                    ...state.errors,
                    ...errors
                }

                if (hasErrors) {
                    this.store.setState(newState)
                } else {
                    this.store.state.errors = {}
                }

                popup.forEach((element) => {
                    const fieldName = element.getAttribute('data-name')

                    if (fieldName && this.store.state.errors[fieldName] && element instanceof HTMLElement) {
                        element.textContent = this.store.state.errors[fieldName]
                        element.style.display = 'inline-block'
                    } else if (fieldName && element instanceof HTMLElement) {
                        element.textContent = ''
                        element.style.display = 'none'
                    }
                })

                const {email, first_name, second_name, phone, login, password, display_name} = this.store.state.userInfo

                console.log({
                    email,
                    first_name,
                    second_name,
                    phone,
                    login,
                    password,
                    display_name
                })

                if (errors) return

                this.store.setState({...this.store.state, isEditMode: !this.store.state.isEditMode})
                const newVApp = new Templator(template(this.store.state)).compile(context, events)
                this.setMeta(newVApp)
            },
        }

        const vApp = new Templator(template(state)).compile(context, events)

        super(vApp, state)

        this.validator = new Validator()
        this.validatorConfig = {
            display_name: {
                isRequired: {
                    message: "Login field is required"
                },
                isNumberAndLetter: {
                    message: 'Login must have at least one number and letter'
                },
                min: {
                    message: "Login must have at least 3 characters",
                    value: 3
                },
                max: {
                    message: "Login must not exceed 20 characters",
                    value: 20
                },
            },
            first_name: {
                isRequired: {
                    message: "First name field is required"
                },
                isPersonName: {
                    message: 'The first letter must be capitalized, no spaces and no numbers'
                }
            },
            second_name: {
                isRequired: {
                    message: "First name field is required"
                },
                isPersonName: {
                    message: 'The first letter must be capitalized, no spaces and no numbers'
                }
            },
            phone: {
                isRequired: {
                    message: "Phone name field is required"
                },
                isPhone: {
                    message: 'The phone number must contain from 10 to 15 characters, consists of numbers, may begin with a plus'
                }
            },
            email: {
                isRequired: {
                    message: "Email field is required"
                },
                isEmail: {
                    message: "Incorrect email"
                }
            },
            login: {
                isRequired: {
                    message: "Login field is required"
                },
                isNumberAndLetter: {
                    message: 'Login must have at least one number and letter'
                },
                min: {
                    message: "Login must have at least 3 characters",
                    value: 3
                },
                max: {
                    message: "Login must not exceed 20 characters",
                    value: 20
                }
            },
        }
    }

    // private validate(fieldName?: string) {
    //     let errors = {}

    //     if (fieldName) {
    //         errors = validateByField({fieldName, value: this.store.state.userInfo[fieldName]}, this.validatorConfig);
    //     } else {
    //         errors = validateAll(this.store.state.userInfo, this.validatorConfig);
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
    //     this.store.setState(state)
    //     return errorsLength !== 0;
    // };
}
