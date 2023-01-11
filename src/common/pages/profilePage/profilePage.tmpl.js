import * as styles from './styles.module.css'
import {Templator} from '../../../utils/Templator';
import {template as userAvatar} from '../../components/pofileAvatar/profileAvatar.tmpl'

export function template() {

    const isEditMode = false

    const fieldsInfo = [
        {
            title: 'Почта',
            input: {
                type: 'text',
                name: 'email',
                placeholder: 'pochta@yandex.ru',
                value: 'pochta@yandex.ru'
            }
        },
        {
            title: 'Логин',
            input: {
                type: 'text',
                name: 'login',
                placeholder: 'ivanivanov',
                value: 'ivanivanov'
            }
        },
        {
            title: 'Почта',
            input: {
                type: 'text',
                name: 'first_name',
                placeholder: 'Иван',
                value: 'Иван'
            }
        },
        {
            title: 'Фамилия',
            input: {
                type: 'text',
                name: 'second_name',
                placeholder: 'Иванов',
                value: 'Иванов'
            }
        },
        {
            title: 'Имя в чате',
            input: {
                type: 'text',
                name: 'display_name',
                placeholder: 'Иван',
                value: 'Иван'
            }
        },
        {
            title: 'Телефон',
            input: {
                type: 'tel',
                name: 'phone',
                placeholder: '+7 (909) 967 30 30',
                value: '+7 (909) 967 30 30'
            }
        },
    ]

    const settingButtons = [
        {
            title: 'Изменить данные'
        },
        {
            title: 'Изменить пароль'
        },
        {
            title: 'Выйти',
            additionalClassName: 'exit__button'
        }
    ]

    const pageTemplate =  `
        <div className="${styles['profile__container']}">
            <div className="${styles['profile__column-left']}">
            <a className="${styles['profile__arrow-back']}" href="{{ PathName }}"/>
            </div>
            <article className="${styles['profile__column-right']}">
                <div className="${styles['profile__settings__container']} user">
                    <div className="${styles['user__info']}">
                        ${userAvatar('xl')}
                        <span className="${styles['user__name']}">{{ UserName }}</span>
                    </div>
                    <ul className="${styles['user__info__list']}">
                        {{ InfoList }}
                    </ul>
                    <div className="${styles['setting__buttons__list']}">
                        {{ ProfileSettingButtons }}
                    </div>
                </div>
            </article>
        </div>
    `

    return new Templator(pageTemplate).prepareToCompile({
        UserName: 'Иван',
        PathName: '/chats',
        InfoList: fieldsInfo.map((item) => {
            const {type, name, placeholder, value} = item.input

            return `
            <li className="${styles['user__info__item']}">
                <label className="${styles['item__label']}">
                    <span className="${styles['item__title']}">${item.title}</span>
                    ${
                        isEditMode
                            ? `<input className="${styles['item__field']}" type="${type}" name="${name}" placeholder="${placeholder}" />`
                            : `<p className="${styles['item__value']}">${value}</p>`
                    }
                </label>
            </li>
        `
        }),
        ProfileSettingButtons: settingButtons.map((button) => {
            const {additionalClassName} = button

            return `
                <button
                    className="${styles['profile__setting__button']} ${additionalClassName ? styles[additionalClassName] : ''}"
                >
                    ${button.title}
                </button>
        `
        }),
    })
}