import {Templator} from '../../../utils/Templator'
import {template} from './error404Page.tmpl'

export class Error404Page {
    #error404Templator
    #context

    constructor(context) {
        this.#error404Templator = new Templator(template())
        this.#context = context
    }

    render() {
        return this.#error404Templator.compile(this.#context)
    }
}