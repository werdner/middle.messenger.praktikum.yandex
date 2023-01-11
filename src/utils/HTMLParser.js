export class HTMLParser {
    #string
    #context

    constructor() {
        this.#string = null
    }

    #lastStackChild(stack) {
       return stack[stack.length - 1]
    }

    *#baseParse() {
        const HTML_ELEMENT = /\s*<\/?\b([a-z1-6]+)\s*([^>]*)\/?>\s*(([-_а-яА-Я\w{}?.@()+: ]*)\s*(?=<))?/g
        let match = null
        while(match = HTML_ELEMENT.exec(this.#string)) {
            yield match
        }
    }

    #getAttributes(attributes) {
        const JSX_ATTRIBUTE = /([a-zA-Z-]+)="([#а-яА-Я\w()-_ ]*)"/g
        const result = []
        let match = null

        while(match = JSX_ATTRIBUTE.exec(attributes)) {
            result.push([match[1], match[2].trim()])
        }

        return result
    }

    #createHTMLElement(tag, props, children) {
        const element = tag ? document.createElement(tag) : document.createDocumentFragment()
        if (props) {
            props.forEach(([key, value]) => {

                switch (key) {
                    case 'className': {
                        const classes = value.split(' ')
                        classes.forEach((className) => {
                            if (className !== 'undefined') element.classList.add((className || '').trim())
                        })
                        return
                    }
                    case 'onClick':
                        element.addEventListener('click', (event) => {
                            event.preventDefault()
                            this.#context[value]()
                        })
                        break
                    case 'onSubmit':
                        element.addEventListener('click', (event) => {
                            event.preventDefault()
                            this.#context[value]()
                        })
                        break
                    default:
                        element.setAttribute(key, value)
                }

            })
        }

        children.forEach((child) => {
            if (child) element.append(child.trim())
        })

        return element
    }

    parseHTML(string, context) {
        this.#string = string
        this.#context = context
        const stack = []
        const parser = this.#baseParse()
        const parentNode = parser.next().value
        let parent = null

        if (parentNode) {
            parent = this.#createHTMLElement(parentNode[1], this.#getAttributes(parentNode[2]), [parentNode[4]])

            stack.push(parent)
        }

        while(stack.length > 0) {
            const nextPart = parser.next().value

            if (!nextPart) break

            if (nextPart[0].includes('</')) {

                if (this.#lastStackChild(stack).tagName === nextPart[1].toUpperCase()) {
                    let parentChild = stack.pop()
                    const lastChild = this.#lastStackChild(stack)

                    if (lastChild) {
                        lastChild.append(parentChild)
                    } else {
                        return parent
                    }

                    if (nextPart[4]) lastChild.append(nextPart[4])
                } else {
                    throw new Error(`Wrong HTML: ${this.#lastStackChild(stack).tagName} don't match ${nextPart[1]}`)
                }

            } else {
                const element = this.#createHTMLElement(nextPart[1], this.#getAttributes(nextPart[2]), [nextPart[4]])

                if (nextPart[0].includes('/>')) {
                    this.#lastStackChild(stack).append(element)
                } else {
                    stack.push(element)
                }
            }
        }

        return parent
    }
}