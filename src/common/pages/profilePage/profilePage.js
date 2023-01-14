import {Templator} from '../../../utils/Templator'
import {template} from "./profilePage.tmpl";
import {inputTemplate} from './inputTemplate'
import {router} from "../../../utils/Router";
import {button} from "../../components/button/button.tmpl";

export class ProfilePage {
    #state
    #profileTemplator
    #context

    constructor(context) {
        this.#profileTemplator = new Templator(template())
        this.#context = context
        this.isEditMode = true

        this.#state = {
            fieldsInfo: [
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
                    title: 'Имя',
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
            ],
            adjustSettingButtons: [
                {
                    title: 'Изменить данные',
                    method: 'changeEditMode',
                    variant: 'ghost'
                },
                {
                    title: 'Изменить пароль',
                    variant: 'ghost'
                },
                {
                    title: 'Выйти',
                    variant: 'red'
                }
            ],
            saveSettingButtons: [
                {
                    title: 'Сохранить',
                    method: 'changeEditMode',
                    variant: 'blue'
                },
            ]
        }
    }

    #openChatsPage = () => {
        router.start('/chats')
    }

    #changeEditMode = () => {
        this.isEditMode = !this.isEditMode
        const fieldsList = document.querySelector('.user__info__list')
        const buttonsList = document.querySelector('.buttons__list')

        fieldsList.replaceChildren(new Templator(this.#getList().InfoList).compile())
        buttonsList.replaceChildren(new Templator(this.#getList().ProfileSettingButtons).compile({}, {
            changeEditMode: this.#changeEditMode,
        }))
    }


    #getList = () => {
        const {adjustSettingButtons, saveSettingButtons} = this.#state
        const settingButtons = this.isEditMode ? adjustSettingButtons : saveSettingButtons
        const fields = `
            <>
                ${this.#state.fieldsInfo.map((item) => inputTemplate(item, this.isEditMode))}
            </>`
        const buttons = `
            <>
                ${settingButtons.map((data) => {
                    const {variant, title, method, additionalClassName} = data
                    return button(variant, title, method, additionalClassName)
                })}
            </>`

        return {
            InfoList: fields,
            ProfileSettingButtons: buttons
        }
    }

    render() {
        const context = Object.assign(this.#context ?? {}, this.#getList())

        return this.#profileTemplator.compile(context, {
            openChatsPage: this.#openChatsPage,
            changeEditMode: this.#changeEditMode,
        })
    }
}
