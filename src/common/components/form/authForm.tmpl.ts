import styles from './styles.module.css';
import { button } from '../button/button.tmpl';
import {validateByField} from "../../../utils/validator";

export function template(): string {
    return `
        <div className="${styles['auth__container']}">
            <h1 className="${styles['auth__header']}">{{ HeaderText }}</h1>
            <form className="${styles['auth__form']}">
                {{ AuthForm }}
                ${
                    button('{{ ButtonText }}', '{{ onSubmit }}', 'blue', styles['auth__button_submit'], 'submit')
                }
                ${
                    button('{{ LinkText }}', '{{ OnClick }}', 'ghost', styles['auth__bottom-button'])
                }
            </form>
        </div>
    `;
}
