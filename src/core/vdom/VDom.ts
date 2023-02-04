import { render } from './render';

export type VTree = {
    tagName: string
    attrs: Record<string, string | EventListenerOrEventListenerObject>
    children: (VTree | string)[]
};

type Patch = (node: Node) => Node | undefined

export class VDom {
    createElement = (tagName = 'fragment', { attrs = {}, children = [] }: Omit<VTree, 'tagName'>): VTree => {
        const vElem = Object.create(null);

        return Object.assign(vElem, {
            tagName,
            attrs,
            children,
        });
    };

    zip = (xs: Patch[], ys: NodeListOf<ChildNode>) => {
        const zipped: [Patch, ChildNode][] = [];
        for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
            zipped.push([xs[i], ys[i]]);
        }
        return zipped;
    };

    diffAttrs = (oldAttrs: VTree['attrs'], newAttrs: VTree['attrs']) => {
        const patches: ((node: HTMLElement) => HTMLElement)[] = [];
        const keys = Object.keys(newAttrs)

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = newAttrs[key]
            const oldValue = oldAttrs[key]

            patches.push((node: HTMLElement) => {
                if (typeof value === 'string') {
                    if (value === oldAttrs[key]) return node

                    if (key === 'className') {
                        const oldClasses = typeof oldValue === 'string' ? oldValue.split(' ') : []
                        const newClasses = value.split(' ');

                        for (let k = 0; k < Math.max(oldClasses.length, newClasses.length); k++) {
                            switch (true) {
                                case newClasses[k] !== oldClasses[k]:
                                    node.classList.remove(oldClasses[k])
                                    node.classList.add(newClasses[k])
                                    break
                                case !newClasses[k] && oldClasses[k]:
                                    node.classList.remove(oldClasses[k])
                                    break
                                default:
                                    node.classList.add(newClasses[k])
                                    break
                            }
                        }
                    } else {
                        node.setAttribute(key, value);
                    }
                }
                return node;
            })
        }

        for (const key in oldAttrs) {
            if (!(key in newAttrs)) {
                patches.push((node: HTMLElement) => {
                    if (/^on/.test(key)) {
                        const listener = oldAttrs[key];

                        if (typeof listener !== 'string') {
                            node.removeEventListener(key.slice(2), listener);
                        }
                    } else {
                        node.removeAttribute(key);
                    }

                    return node;
                });
            }
        }

        return (node: HTMLElement) => {
            for (const patch of patches) {
                patch(node);
            }
            return node;
        };
    };

    diffChildren = (oldVChildren: VTree['children'], newVChildren: VTree['children']) => {
        const childPatches: Patch[] = [];

        oldVChildren.forEach((oldVChild, i) => {
            const patch = this.diff(oldVChild, newVChildren[i])
            if (patch)childPatches.push(patch);
        });

        const additionalPatches: Patch[] = [];
        const shouldReplaceChildren = oldVChildren.length === 0

        for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
            additionalPatches.push((node: Node) => {
                node.appendChild(render(additionalVChild));
                return node;
            });
        }

        return (parent: Node) => {
            if (shouldReplaceChildren && parent instanceof HTMLElement) {
                while (parent.lastChild) {
                    parent.removeChild(parent.lastChild);
                }
            }
            for (const [patch, child] of this.zip(childPatches, parent.childNodes)) {
                patch(child);
            }

            for (const patch of additionalPatches) {
                patch(parent);
            }
            return parent;
        };
    };

    diff(oldVTree: VTree | string, newVTree?: VTree | string): Patch | undefined {
        if (newVTree === undefined) {
            return (node: Node) => {
                if (node instanceof HTMLElement) {
                    node.remove();
                }
                return undefined;
            };
        }

        if (typeof oldVTree === 'string' ||
            typeof newVTree === 'string') {
            if (oldVTree !== newVTree) {
                return (node: Node) => {
                    const newNode = render(newVTree)
                    if (node instanceof HTMLElement || node instanceof Text) {
                        node.replaceWith(newNode)
                    }
                        return newNode;
                };
            } else {
                return (node: Node) => node;
            }
        }

        if (oldVTree.tagName !== newVTree.tagName) {
            return (node) => {
                const newNode = render(newVTree)
                if (node instanceof HTMLElement) {
                    node.replaceWith(newNode)
                }
                return newNode
            }
        }

        const patchAttrs = this.diffAttrs(oldVTree.attrs, newVTree.attrs);
        const patchChildren = this.diffChildren(oldVTree.children, newVTree.children);

        return (node: Node) => {
            if (node instanceof HTMLElement) {
                patchAttrs(node)
            }
            patchChildren(node)
            return node
        };
    }

}
