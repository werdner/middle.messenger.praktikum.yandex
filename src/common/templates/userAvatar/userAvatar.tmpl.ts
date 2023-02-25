import styles from './styles.module.css';

export type UserAvatar = { size: 'l' | 'xl', onAvatarUpload?: string, src: string, isEditMode?: boolean };

export const template = ({ size, onAvatarUpload, src, isEditMode }: UserAvatar) => {
    if (isEditMode) {
        return `
            <label>
                <input className="${styles['user__avatar-edit']} ${styles[size]}" onInput="${onAvatarUpload}" type="file" />
                <span className="${styles['user__avatar']} ${styles[size]}" />
            </label>
        `;
    }

    return `
        ${src ? (`
            <img className="${styles['user__avatar']} ${styles[size]}" src="${src}" />
        `) : (`
            <span className="${styles['user__avatar']} ${styles[size]}" src="${src}" />
        `) }
    `;
};
