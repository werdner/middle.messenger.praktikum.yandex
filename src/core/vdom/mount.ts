export const mount = (node: HTMLElement | DocumentFragment | Text, target: HTMLElement | null) => {
    if (!target) return;

    target.replaceChildren(node);
    return node;
};
