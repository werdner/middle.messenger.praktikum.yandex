import styles from './styles.module.css';
import { Templator } from '../../../core/Templator/Templator';
import { template as userAvatar, UserAvatar } from '../../templates/userAvatar/userAvatar.tmpl';
import { InputProps, inputTemplate } from './index';
import { button, ButtonProps } from '../../templates/button/button.tmpl';

type Store = {
    fieldsInfo: InputProps[]
    adjustSettingButtons: ButtonProps[]
    saveSettingButtons: ButtonProps[]
};

type Props = Record<string, any>;

function getInfoList(profilePageProps?: Props) {
    const { isEditMode, email, login, first_name, second_name, display_name, phone } = profilePageProps ?? {};
    const store: Store = {
        fieldsInfo: [
            {
                title: 'Почта',
                input: {
                    type: 'text',
                    name: 'email',
                    placeholder: 'pochta@yandex.ru',
                    value: email,
                },
            },
            {
                title: 'Логин',
                input: {
                    type: 'text',
                    name: 'login',
                    placeholder: 'ivanivanov',
                    value: login,
                },
            },
            {
                title: 'Имя',
                input: {
                    type: 'text',
                    name: 'first_name',
                    placeholder: 'Иван',
                    value: first_name,
                },
            },
            {
                title: 'Фамилия',
                input: {
                    type: 'text',
                    name: 'second_name',
                    placeholder: 'Иванов',
                    value: second_name,
                },
            },
            {
                title: 'Имя в чате',
                input: {
                    type: 'text',
                    name: 'display_name',
                    placeholder: 'Иван',
                    value: display_name,
                },
            },
            {
                title: 'Телефон',
                input: {
                    type: 'tel',
                    name: 'phone',
                    placeholder: '+79099673030',
                    value: phone,
                },
            },
        ],
        adjustSettingButtons: [
            {
                value: 'Изменить данные',
                onClick: 'changeEditMode',
                variant: 'ghost',
            },
            {
                value: 'Изменить пароль',
                variant: 'ghost',
            },
            {
                value: 'Выйти',
                onClick: 'onLogOut',
                variant: 'red',
            },
        ],
        saveSettingButtons: [
            {
                value: 'Сохранить',
                onClick: 'onSubmitForm',
                variant: 'blue',
            },
        ],
    };

        const { adjustSettingButtons, saveSettingButtons } = store;
        const settingButtons = isEditMode ? saveSettingButtons : adjustSettingButtons;
        const fields = store.fieldsInfo.map((item) => inputTemplate(item, isEditMode));
        const buttons = settingButtons.map((data) => {
            const { variant, value, onClick, additionalClassName } = data;
            return button(value, onClick, variant, additionalClassName);
        });

        return {
            InfoList: fields,
            ProfileSettingButtons: buttons,
        };
}

export function template(profilePageProps?: Props) {
    const formMeta = getInfoList(profilePageProps);
    const hostResources = 'https://ya-praktikum.tech/api/v2/resources';
    const { InfoList, ProfileSettingButtons } = formMeta;

    const userAvatarProps: UserAvatar = {
        size: 'xl',
        onAvatarUpload: 'onAvatarUpload',
        src: profilePageProps?.avatar ?  hostResources + profilePageProps?.avatar : '' as string,
        isEditMode: profilePageProps?.isEditMode as boolean,
    };

    const pageTemplate = () => `
        <div className="${styles['profile__container']}">
            <div className="${styles['profile__column-left']}">
                <button className="${styles['profile__arrow-back']}" onClick="{{ onClick }}"/>
            </div>
            <article className="${styles['profile__column-right']}">
                <div className="${styles['profile__settings__container']} user">
                    <div className="${styles['user__info']}">
                        ${userAvatar(userAvatarProps)}
                        <span className="${styles['user__name']}">{{ UserName }}</span>
                    </div>
                    <ul className="user__info__list">
                        {{ InfoList }}
                    </ul>
                    <div className="${styles['setting-buttons__list']} buttons__list">
                        {{ ProfileSettingButtons }}
                    </div>
                </div>
            </article>
        </div>
    `;

    return new Templator(pageTemplate).prepareToCompile({
        UserName: profilePageProps?.first_name ?? '',
        onClick: 'openChatsPage',
        InfoList,
        ProfileSettingButtons,
    });
}
