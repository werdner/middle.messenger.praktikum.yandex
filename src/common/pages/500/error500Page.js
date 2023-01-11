import {Templator} from '../../../utils/Templator'
import {template} from './error500Page.tmpl'

export class Error500Page {
    #error500Templator
    #context

    constructor(context) {
        this.#error500Templator = new Templator(template())
        this.#context = context
    }

    render() {
        return this.#error500Templator.compile(this.#context)
    }
}