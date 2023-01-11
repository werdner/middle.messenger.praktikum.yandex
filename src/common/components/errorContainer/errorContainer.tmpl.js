import * as styles from './styles.module.css'

export function template() {
    return `
        <div className="${styles['error__container']}">
            <div className="${styles['error__info']}">
                <span className="${styles['error__code']}"> {{ ErrorCode }} </span>
                <span className="${styles['error__message']}"> {{ ErrorMessage }} </span>
                <a className="${styles['error__link']}" href="{{ PathName }}"> {{ ButtonText }} </a>
            </div>
        </div>
    `
}