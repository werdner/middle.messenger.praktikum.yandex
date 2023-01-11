import * as styles from './styles.module.css'

export function template(size = 'l') {
    return `
        <span className="${styles['user__avatar']} ${styles['size-' + size]}" />
    `
}