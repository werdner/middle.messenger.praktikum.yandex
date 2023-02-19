import styles from './styles.module.css';

type ModalProps = {
    active: boolean,
    title: string
    inputTitle: string
    buttonText: string
    onClose: string
    onButtonClick: string
    identifier: string
}

export const chatModalTemplate = (modalProps: ModalProps) => {
    const {title, inputTitle, buttonText, onClose, onButtonClick, identifier} = modalProps

    return (`
        <div className="${styles['modal__backdrop']} ${identifier}">
             <div className="${styles['chat__modal__container']}">
               <h2 className="${styles['chat__modal__header']}">${title}</h2>
               <span className="${styles['chat__modal__close']}" onClick="${onClose}" />
               <div className="${styles['chat__modal__input__container']}"> 
                   <span className="${styles['input__title']}">${inputTitle}</span>
                   <input className="${styles['input']} modal__input" type="text" />
               </div>
               <button className="${styles['chat__modal__button']}" onClick="${onButtonClick}">${buttonText}</button>
            </div>
        </div>
    `)
}
