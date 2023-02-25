import { Templator } from '../../../core/Templator/Templator';
import { template as errorContainer } from '../../templates/errorContainer/errorContainer.tmpl';

export function template() {
    const errorContainerTemplate = new Templator(errorContainer);

    return errorContainerTemplate.prepareToCompile({
        ErrorCode: '500',
        ErrorMessage: 'Мы уже фиксим',
        OnClick: 'openChatsPage',
        ButtonText: 'Назад к чатам',
    });
}
