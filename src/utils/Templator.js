import {HTMLParser} from './HTMLParser'

export class Templator {
    #template
    #regExp
    #context
    #parser

    constructor(template) {
        this.#template = template
        this.#context = null
        this.#regExp = /\{\{(.*?)\}\}/g
        this.#parser = new HTMLParser()
    }

    #parseTemplate(match = this.#regExp.exec(this.#template)) {
        if (!match) return null

        if (match[1].includes('.')) {
            const keys = match[1].trim().split('.')
            const value = keys.reduce((acc, item) => acc[item], this.#context)

            return {
                match: match[0],
                value
            }
        }

        return {
            match: match[0],
            value: this.#context[match[1].trim()]
        }
    }

    prepareToCompile(context) {
        let  variableName = null
        let result = this.#template
        this.#context = context

        while(variableName = this.#parseTemplate()) {

            if (!variableName || !variableName?.value) {
                continue
            }

            const {match, value} = variableName

            if (typeof value === 'function') {
                window[variableName.value.name] = value
                result = result.replace(new RegExp(match, 'gi'), `window.${variableName.value.name}()`)
                continue
            }

            result = result.replace(new RegExp(match, 'gi'), value)
        }

        return result
    }

    compile(context, methods) {
        const HTML = this.#parser.parseHTML(this.prepareToCompile(context), methods)
        return HTML
    }
}