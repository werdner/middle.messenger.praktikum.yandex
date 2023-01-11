import {Templator} from '../../../utils/Templator';
import {template as errorContainer} from '../../components/errorContainer/errorContainer.tmpl';

export function template() {
    const errorContainerTemplate = new Templator(errorContainer())

    return errorContainerTemplate.prepareToCompile({
        ErrorCode: '500',
        ErrorMessage: 'Мы уже фиксим',
        PathName: '/chats',
        ButtonText: 'Назад к чатам'
    })
}