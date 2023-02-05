import styles from './styles.module.css';

type UserAvatar = (size: 'l' | 'xl') => string;

export const template: UserAvatar = (size = 'l') => {
    return `
        <span className="${styles['user__avatar']} ${styles[size]}" />
    `;
};
