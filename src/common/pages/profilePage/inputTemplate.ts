import styles from './styles.module.css';
import { input } from '../../components/input/input.tmpl';

export type InputProps = {
    title: string
    input: {
        type: string
        name: string
        placeholder: string
        value: string
    }
};

export const inputTemplate = (item: InputProps, isEditMode: boolean = false) => {
    const getField = () => {
        if (isEditMode) {
            const props = {
                ...item.input,
                onInput: 'onInputChange',
                onBlur: 'onInputBlur',
            };
            return (`
                <div className="${styles['input__container']}">
                    ${input(props)}
                    <span className="${styles['input-error']} error-span" data-name="${item.input.name}" />
                </div>
            `);
        } else {
            return (`
               <p className="${styles['item__value']}">${item.input.value}</p>
            `);
        }
    };

    return (`
        <li className="${styles['user__info__item']}">
            <label className="${styles['item__label']}">
                <span className="${styles['item__title']}">${item.title}</span>
                    ${getField()}
            </label>
        </li>
    `);
};
