import {Templator} from '../../../utils/Templator'
import {template as authTemplate} from '../../components/form/authForm.tmpl'
import * as styles from './styles.module.css'

export function template() {
    const signInTemplate = new Templator(authTemplate())

    const fieldsInfo = [
        {
            type: 'text',
            placeholder: 'Логин',
            name: 'login'
        },
        {
            type: 'text',
            placeholder: 'Пароль',
            name: 'password'
        }
    ]

    const signInForm = () => {
        return fieldsInfo.map((field) => ( `
                <input
                    className="${styles['input-field']}"
                    type="${field.type}"
                    placeholder="${field.placeholder}"
                    name="${field.name}"
                />
            `
        ))
    }

    return signInTemplate.prepareToCompile({
        HeaderText: 'Войти',
        AuthForm: signInForm(),
        ButtonText: 'Войти',
        LinkText: 'Нет аккаунта?',
        OnClick: 'openSignUpPage'
    })
}