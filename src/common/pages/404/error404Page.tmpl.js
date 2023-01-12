import {Templator} from '../../../utils/Templator';
import {template as errorContainer} from '../../components/errorContainer/errorContainer.tmpl';

export function template() {
    const errorContainerTemplate = new Templator(errorContainer())

    return errorContainerTemplate.prepareToCompile({
        ErrorCode: '404',
        ErrorMessage: 'Не туда попали',
        OnClick: 'openChatsPage',
        ButtonText: 'Назад к чатам'
    })
}