import * as styles from "./styles.module.css";
import {input} from "../../components/input/input.tmpl";

export const inputTemplate = (item, isEditMode = false) => {
    const {type, name, placeholder, value} = item.input

    return (`
        <li className="${styles['user__info__item']}">
            <label className="${styles['item__label']}">
                <span className="${styles['item__title']}">${item.title}</span>
                    ${
                        isEditMode
                            ? input(type, name, placeholder)
                            : `<p className="${styles['item__value']}">${value}</p>`
                    }
            </label>
        </li>
    `)
}
