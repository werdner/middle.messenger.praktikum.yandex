import { Context } from './Templator';
import { VDom, VTree } from '../vdom/VDom';

export class HTMLParser {
    private string: string | null;
    private context?: Context;
    private stack: VTree[];
    private vDome: VDom;

    constructor() {
        this.string = null;
        this.stack = [];
        this.vDome = new VDom();
    }

    private lastStackChild() {
        const { stack } = this;
        return stack[stack.length - 1];
    }

    private *baseParse(): Generator<RegExpExecArray, void> {
        const HTML_ELEMENT: RegExp = /\s*<\/?(\b[a-z1-6]+)?\s*([^>]*)\/?>\s*(([-_а-яА-Я\w{}?,'*.@()+: ]*)\s*(?=<))?/g;
        let match = null;

        if (!this.string) return;

        while (match = HTML_ELEMENT.exec(this.string)) {
            yield match;
        }
    }

    private getAttributes(attributes: string) {
        const JSX_ATTRIBUTE = /([a-zA-Z-]+)="([#а-яА-Я\w()-_ ]*)"/g;
        const result: VTree['attrs'] = {};
        let match = null;

        while (match = JSX_ATTRIBUTE.exec(attributes)) {

            if (/^on/.test(match[1]) && this.context) {
                const event = this.context[match[2].trim()];
                if (event) result[match[1]] = this.context[match[2].trim()];
            } else {
                result[match[1]] = match[2].trim();
            }
        }

        return result;
    }

    private createDOMElement(tag: string, attrs: VTree['attrs'], children: VTree['children']) {
        const el = this.vDome.createElement(tag, {
            attrs,
            children,
        });

        return el;
    }

    parseHTML(string: string, context?: Context) {
        this.string = string;
        this.context = context;
        const parser = this.baseParse();
        const parentNode = parser.next().value;

        let parentDOMElement = null;

        if (parentNode) {
            const children = parentNode[4] ? [parentNode[4]] : [];

            parentDOMElement = this.createDOMElement(parentNode[1], this.getAttributes(parentNode[2]), children);

            this.stack.push(parentDOMElement);
        }

        while (this.stack.length > 0) {
            const nextPart = parser.next().value;

            if (!nextPart) break;

            if (nextPart[0].includes('</')) {
                let lastDOMElement: VTree = this.lastStackChild();

                if (lastDOMElement.tagName === nextPart[1] || !nextPart[1]) {
                    let parentChild = this.stack.pop();
                    lastDOMElement = this.lastStackChild();

                    if (parentChild && lastDOMElement) {

                        lastDOMElement.children.push(parentChild);
                    } else {
                        return parentChild;
                    }
                } else {
                    console.log(this.string, parentNode, this.stack);
                    throw new Error(`Wrong HTML: ${lastDOMElement.tagName} don't match ${nextPart[1]}`);
                }

            } else {
                const children = nextPart[4] ? [nextPart[4]] : [];
                const element = this.createDOMElement(nextPart[1], this.getAttributes(nextPart[2]), children);

                if (nextPart[0].includes('/>')) {
                    this.lastStackChild().children.push(element);
                } else {
                    this.stack.push(element);
                }
            }
        }

        return parentDOMElement;
    }
}
