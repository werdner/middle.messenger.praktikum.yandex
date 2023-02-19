import { Validator } from './validator';
import { Store } from '../core/Block';

export class InputValidator {
    private validator: Validator;
    private store: Record<string, any>;
    private state: Store['state'];
    private validatorConfig: Record<string, any>;

    constructor(store: Store, validatorConfig: Record<string, any>) {
        this.store = store;
        this.state = Object.assign({}, store.state);
        this.validator = new Validator();
        this.validatorConfig = validatorConfig;
    }

    public onSubmitForm(event: Event) {
        event.preventDefault();

        if ('password_repeat' in this.validatorConfig) {
            this.validatorConfig.password_repeat.isMatch.password = this.store.state.password;
        }

        const popup = document.querySelectorAll('.error-span');
        const { errors, hasErrors } = this.validator.validate(this.validatorConfig, this.store.state);

        const newState = Object.assign({}, this.store.state);
        newState.errors = {
            ...this.state.errors,
            ...errors,
        };

        if (hasErrors) {
            this.store.setState(newState);
        } else {
            this.store.state.errors = {};
        }

        popup.forEach((element) => {
            const fieldName = element.getAttribute('data-name');

            if (fieldName && this.store.state.errors[fieldName] && element instanceof HTMLElement) {
                element.textContent = this.store.state.errors[fieldName];
                element.style.display = 'inline-block';
            } else if (fieldName && element instanceof HTMLElement) {
                element.textContent = '';
                element.style.display = 'none';
            }
        });

        return hasErrors;
    }

    onInputBlur(event: Event) {
        const { target } = event;

        if (target instanceof HTMLInputElement) {
            if ('password_repeat' in this.validatorConfig) {
                this.validatorConfig.password_repeat.isMatch.password = this.store.state.password;
            }

            const popup = document.querySelector(`[data-name=${target.name}]`);
            const isHTMLElement = popup && popup instanceof HTMLElement;
            const { errors, hasErrors } = this.validator.validate(this.validatorConfig, this.store.state, target.name);

            const newState = Object.assign({}, this.store.state);
            newState.errors = {
                ...this.store.state.errors,
                ...errors,
            };

            if (hasErrors) {
                this.store.setState(newState);
            } else {
                target.name ? this.store.state.errors[target.name] = '' : this.store.state.errors = {};
            }

            if (hasErrors && isHTMLElement) {
                popup.textContent = this.store.state.errors[target.name];
                popup.style.display = 'inline-block';
            } else if (isHTMLElement) {
                popup.style.display = 'none';
                popup.textContent = '';
            }
        }
    }
}
