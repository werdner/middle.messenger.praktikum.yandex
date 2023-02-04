import { Templator } from '../../../core/Templator/index';
import { template } from './index';
import { router } from '../../../core/Router';
import {Block} from "../../../core/Block";
import {Validator} from "../../../utils/validator";

export class SignUpPage extends Block {
    private readonly validatorConfig
    private validator: Validator

    constructor(context?: object) {
        const state = {
            first_name: '',
            email: '',
            second_name: '',
            phone: '',
            login: '',
            password: '',
            errors: {}
        }

        const events = {
            openSignUpPage: () => router.start('/sign-in'),
            onInputBlur: (event: Event) => {
                const {target} = event

                if (target instanceof HTMLInputElement) {
                    const popup = document.querySelector(`[data-name=${target.name}]`)
                    const isHTMLElement = popup && popup instanceof HTMLElement
                    const {errors, hasErrors} = this.validator.validate(this.validatorConfig, this.store.state, target.name)

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
            onInputChange: (event: Event) => {
                const {target} = event
                if (target instanceof HTMLInputElement) {
                    let state = this.store.state
                    state[target.name] = target.value
                    this.store.setState(state)
                }
            },
            onSubmitForm: (event: Event) => {
                event.preventDefault()
                const popup = document.querySelectorAll(`.error-span`)
                const {errors, hasErrors} = this.validator.validate(this.validatorConfig, this.store.state)

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

                console.log({
                    first_name: this.store.state.first_name,
                    email: this.store.state.email,
                    second_name: this.store.state.second_name,
                    phone: this.store.state.phone,
                    login: this.store.state.login,
                    password: this.store.state.password,
                })
            },
        }
        const vApp = new Templator(template(state)).compile(context, events)

        super(vApp, state)

        this.validator = new Validator()
        this.validatorConfig = {
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
            password: {
                isRequired: {
                    message: "Password field is required"
                },
                isCapitalSymbol: {
                    message: "Password must contain at least one capital character"
                },
                isContainDigit: {
                    message: "Password must contain at least one digit"
                },
                min: {
                    message: "Password must have at least 8 characters",
                    value: 8
                },
                max: {
                    message: "Password must not exceed 40 characters",
                    value: 40
                }
            }
        }
    }

    // private validate(fieldName?: string) {
    //     let errors = {}
    //
    //     if (fieldName) {
    //         errors = this.validator.({fieldName, value: this.store.state[fieldName]}, this.validatorConfig);
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
