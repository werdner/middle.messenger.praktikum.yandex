import styles from './styles.module.css';

type ModalProps = {
    title: string
    inputTitle: string
    inputName: string
    buttonText: string
    onClose: string
    onButtonClick: string
    identifier: string
};

type AdditionalModalProps = {
    inputTitle: string
    inputName: string
};

export const modalTemplate = (modalProps: ModalProps, additionalProps?: AdditionalModalProps) => {
    const { title, inputTitle, inputName, buttonText, onClose, onButtonClick, identifier } = modalProps;

    return (`
        <div className="${styles['modal__backdrop']} ${identifier}">
             <div className="${styles['modal__container']}">
               <h2 className="${styles['modal__header']}">${title}</h2>
               <span className="${styles['modal__close']}" onClick="${onClose}" />
               <div className="${styles['modal__input__container']}"> 
                   ${
                        additionalProps
                            ? (`
                               <span className="${styles['input__title']}">${additionalProps.inputTitle}</span>
                               <input
                                   className="${styles['input']} modal__input"
                                   type="text"
                                   name="${additionalProps.inputName}"
                                   onInput="onInputChange"
                               />
                               <span className="${styles['input-error']} error-span" data-name="${additionalProps.inputName}" />
                            `) : ''
                    }
                   <span className="${styles['input__title']}">${inputTitle}</span>
                   <input
                       className="${styles['input']} modal__input"
                       type="text"
                       name="${inputName}"
                       onInput="onInputChange"
                   />
                   <span className="${styles['input-error']} error-span" data-name="${inputName}" />
               </div>
               <button className="${styles['modal__button']}" onClick="${onButtonClick}">${buttonText}</button>
            </div>
        </div>
    `);
};
