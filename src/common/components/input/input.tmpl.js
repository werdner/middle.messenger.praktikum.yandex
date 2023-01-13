import * as styles from "../../pages/profilePage/styles.module.css";

export const input = (type, name, placeholder, additionalClassName) => {
    return `
        <input
            className="${styles['item__field']} ${styles[additionalClassName]}"
            type="${type}"
            name="${name}"
            placeholder="${placeholder}"
        />`
}
