import * as styles from './styles.module.css'
import {Templator} from '../../../utils/Templator';
import {template as userAvatar} from '../../components/userAvatar/userAvatar.tmpl'

export function template() {
    const pageTemplate =  `
        <div className="${styles['profile__container']}">
            <div className="${styles['profile__column-left']}">
            <button className="${styles['profile__arrow-back']}" onClick="{{ onClick }}"/>
            </div>
            <article className="${styles['profile__column-right']}">
                <div className="${styles['profile__settings__container']} user">
                    <div className="${styles['user__info']}">
                        ${userAvatar('xl')}
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
    `

    return new Templator(pageTemplate).prepareToCompile({
        UserName: 'Иван',
        onClick: 'openChatsPage'
    })
}
