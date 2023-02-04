import { EventBus } from './EventBus';
import { VDom, VTree } from './vdom/index';
import { mount } from './vdom/mount';
import { render } from './vdom/render';

export type Store = {
    state: Record<string, any>,
    onStateChanged: () => void,
    setState: (nextState: Record<string, any>) => void
};

export class Block {
    static EVENTS: Record<string, string> = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update',
    };

    private vDom: VDom;
    private meta: VTree;
    private eventBus: () => EventBus;
    private root?: Node;
    private element?: VTree;
    protected store: Store;

    constructor(vTree?: VTree | null, state?: Store['state']) {
        const eventBus = new EventBus();

        this.vDom = new VDom();
        this.meta = this.makeMetaProxy({
            tagName: vTree?.tagName ?? 'fragment',
            attrs: vTree?.attrs ?? {},
            children: vTree?.children ?? [],
        });

        this.store = this.makeStoreProxy({
            state: state ?? {},
            onStateChanged: () => {},
            setState(nextState) {
                this.state = nextState;
                this.onStateChanged();
            },
        });


        this.eventBus = () => eventBus;
        this.registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
        eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    private registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this.render.bind(this));
    }

    private createResources() {
        const { tagName, attrs, children } = this.meta;
        this.element = this.vDom.createElement(tagName, { attrs, children });

        return this.element;
    }

    private init() {
        this.createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    public componentDidMount() {}

    protected dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private componentDidUpdate() {
        if (!this.element || !this.root) return;

        const { tagName, attrs, children } = this.meta;
        const vNewApp = this.vDom.createElement(tagName, { attrs, children });

        const patch = this.vDom.diff(this.element, vNewApp);
        this.root = patch && patch(this.root);

        this.element = vNewApp;
    }

    protected setMeta(nextMeta?: VTree | null) {
        if (!nextMeta) {
            return;
        }

        Object.assign(this.meta, nextMeta);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    private makeStoreProxy(store: Store) {
        const self: Block = this;

        return new Proxy(store, {
            set(target, prop: keyof Store, nextValue) {
                if (target[prop] !== nextValue) {
                    target[prop] = nextValue;
                    self.store = target;
                }

                return true;
            },
            deleteProperty() {
                throw new Error('Отказано в доступе');
            },
        });
    }

    public render() {
        if (!this.element) return;
        const app = render(this.element);

        this.root = mount(app, document.getElementById('root'));
    }


    getContent() {
        return this.element;
    }

    private makeMetaProxy(meta: VTree) {
        const self: Block = this;

        return new Proxy(meta, {
            set(target, prop: keyof VTree, nextValue) {
                if (target[prop] !== nextValue) {
                    target[prop] = nextValue;
                    self.meta = target;
                    self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target, [prop]: nextValue });
                    self.render();

                }

                return true;
            },
            deleteProperty() {
                throw new Error('Отказано в доступе');
            },
        });
    }
}
