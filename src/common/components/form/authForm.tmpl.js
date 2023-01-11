import * as styles from './styles.module.css'

export function template() {
    return `
        <div className="${styles['auth__container']}">
                <h1 className="${styles['auth__header']}">{{ HeaderText }}</h1>
            <form className="${styles['auth__form']}">
                {{ AuthForm }}
                <button className="${styles['auth__button_submit']}" type="submit">{{ ButtonText }}</button>
                <a
                    className="${styles['auth__bottom-link']}"
                    href="{{ PathName }}"
                >
                    {{ LinkText }}
                </a>
            </form>
        </div>
    `
}