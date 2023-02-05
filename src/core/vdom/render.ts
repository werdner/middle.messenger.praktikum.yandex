import { VTree } from './VDom';

const renderElement = ({ tagName, attrs = {}, children = [] }: VTree): HTMLElement | DocumentFragment => {
    const element = tagName === 'fragment' ? document.createDocumentFragment() : document.createElement(tagName);

    for (const [key, value] of Object.entries(attrs)) {

        if (!(element instanceof HTMLElement)) return element;

        if (/^on/.test(key) && typeof value !== 'string') {
            element.addEventListener(key.slice(2).toLowerCase(), value);
        } else if (key === 'className' && typeof value === 'string') {
            const classes = value.split(' ');

            classes.forEach((item) => {
                element.classList.add(item);
            });
        } else {
            if (typeof value === 'string') {
                element.setAttribute(key, value);
            }
        }
    }

    for (const child of children) {
        element.append(render(child));
    }

    return element;
};

export const render = (vNode: VTree | string): HTMLElement | DocumentFragment | Text => {
    if (typeof vNode === 'string') {
        return document.createTextNode(vNode);
    }

    return renderElement(vNode);
};
