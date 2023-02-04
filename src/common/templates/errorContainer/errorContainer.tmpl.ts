import styles from './styles.module.css';

export function template() {
    return `
        <div className="${styles['error__container']}">
            <div className="${styles['error__info']}">
                <h1 className="${styles['error__code']}"> {{ ErrorCode }} </h1>
                <p className="${styles['error__message']}"> {{ ErrorMessage }} </p>
                <button className="${styles['error__button']}" onClick="{{ OnClick }}"> {{ ButtonText }} </button>
            </div>
        </div>
    `;
}
