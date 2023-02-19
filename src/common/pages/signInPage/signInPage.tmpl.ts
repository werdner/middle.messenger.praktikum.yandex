import { Templator } from '../../../core/Templator/Templator';
import { template as authTemplate } from '../../templates/form/authForm.tmpl';
import styles from './styles.module.css';

type SignInPageProps = Record<string, any>;

export function template(store?: SignInPageProps) {
    const signInTemplate = new Templator(authTemplate);

    const fieldsInfo = [
        {
            type: 'text',
            placeholder: 'Логин',
            name: 'login',
        },
        {
            type: 'text',
            placeholder: 'Пароль',
            name: 'password',
        },
    ];

    const signInForm = () => {
        return fieldsInfo.map((field) => ( `
                <input
                    className="${styles['input-field']}"
                    type="${field.type}"
                    placeholder="${field.placeholder}"
                    name="${field.name}"
                    onInput="onInputChange"
                    onBlur="onInputBlur"
                    value="${store ? store[field.name] : ''}"
                />
                <span className="${styles['input-error']} error-span" data-name="${field.name}" />
            `
        ));
    };

    return signInTemplate.prepareToCompile({
        HeaderText: 'Войти',
        AuthForm: signInForm(),
        ButtonText: 'Войти',
        LinkText: 'Нет аккаунта?',
        OnClick: 'openSignUpPage',
        onSubmit: 'onSubmitForm',
    });
}
