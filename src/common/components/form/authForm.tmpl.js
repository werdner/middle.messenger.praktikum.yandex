import * as styles from './styles.module.css'
import {button} from '../button/button.tmpl'

export function template() {
    return `
        <div className="${styles['auth__container']}">
            <h1 className="${styles['auth__header']}">{{ HeaderText }}</h1>
            <form className="${styles['auth__form']}">
                {{ AuthForm }}
                ${
                    button('blue', '{{ ButtonText }}', '', styles['auth__button_submit'], 'submit')
                }
                ${
                    button('ghost', '{{ LinkText }}', '{{ OnClick }}', styles['auth__bottom-button'])
                }
            </form>
        </div>
    `
}
