import * as styles from "./styles.module.css";

export const button = (
    variant = 'blue',
    value = '',
    onClick = '',
    additionalClassName = '',
    type = 'click'
) => {
    return (`
        <button
            className="${styles['button']} ${styles[variant]} ${additionalClassName}"
            onClick="${onClick}"
            type="${type}"
        >
            ${value}
        </button>
    `)
}
