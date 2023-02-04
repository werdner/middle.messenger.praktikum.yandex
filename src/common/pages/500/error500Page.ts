import { Templator } from '../../../core/Templator/index';
import { template } from './index'
import { router } from '../../../core/Router';
import {Block} from "../../../core/Block";

export class Error500Page extends Block {
    constructor(context?: object) {
        const vApp = new Templator(template()).compile(context, {
            openChatsPage: () => router.start('/chats')
        })

        super(vApp)
    }
}
