import { Templator } from '../../../core/Templator/Templator';
import { template as authTemplate } from '../../templates/form/authForm.tmpl';
import styles from './styles.module.css';

type SignUpPageProps = Record<string, any>;

export function template(store: SignUpPageProps): string {
    const signInTemplate = new Templator(authTemplate());

    const fieldsInfo = [
        {
            type: 'text',
            placeholder: 'Почта',
            name: 'email',
        },
        {
            type: 'text',
            placeholder: 'Логин',
            name: 'login',
        },
        {
            type: 'text',
            placeholder: 'Имя',
            name: 'first_name',
        },
        {
            type: 'text',
            placeholder: 'Фамилия',
            name: 'second_name',
        },
        {
            type: 'text',
            placeholder: 'Телефон',
            name: 'phone',
        },
        {
            type: 'text',
            placeholder: 'Пароль',
            name: 'password',
        },
        {
            type: 'text',
            placeholder: 'Пароль (еще раз)',
            name: 'password',
        },
    ];

    const signInForm = () => {
        return fieldsInfo.map((field) => ( `
                <input
                    className="${styles['input-field']}"
                    type="${field.type}"
                    placeholder="${field.placeholder}"
                    onInput="onInputChange"
                    onBlur="onInputBlur"
                    name="${field.name}"
                    value="${store[field.name]}"
                />
                <span className="${styles['input-error']} error-span" data-name="${field.name}" />
            `
        ));
    };

    return signInTemplate.prepareToCompile({
        HeaderText: 'Регистрация',
        AuthForm: signInForm(),
        ButtonText: 'Зарегистрироваться',
        LinkText: 'Войти?',
        OnClick: 'openSignInPage',
        onSubmit: 'onSubmitForm',
    });
}
