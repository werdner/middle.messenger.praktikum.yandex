import styles from '../../pages/profilePage/styles.module.css';

type Props = {
    type: string
    name: string
    placeholder: string
    value: string
    onInput?: string
    onBlur?: string
    additionalClassName?: string
}

export const input = ({
    type = 'text',
    name = '',
    placeholder = '',
    additionalClassName = '',
    value = '',
    onInput = '',
    onBlur = '',
}: Props) => {
    return `
        <input
            className="${styles['item__field']} ${additionalClassName}"
            type="${type}"
            name="${name}"
            placeholder="${placeholder}"
            value="${value}"
            onInput="${onInput}"
            onBlur="${onBlur}"
        />`;
};
