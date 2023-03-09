import { Block } from './Block';
import { Templator } from './Templator';
import { isEqual } from '../utils/isEqual';

describe('Block', () => {
    const template = () => (`
            <div className="someClass">
                <span>someText</span>
            </div>
        `);

    let isComponentDidMount = false;
    let component: null | Component = null;

    class Component extends Block {
        constructor(template: () => string, context?: object) {
            const state = {
                name: 'State name',
            };

            const templator = new Templator(template, state);
            const vApp = templator.compile(context);
            super('test', vApp, state);

            this.store.onStateChanged = () => {
                templator.updateTemplate(this.store.state);
            };
        }

        componentDidMount() {
            isComponentDidMount = true;
        }

        get state() {
            return this.store.state;
        }

        set state(val) {
            this.store.setState(val);
        }
    }

    beforeEach(() => {
        component = new Component(template);
    });

    test('Component has correct page name', () => {
        expect(component?.pageName).toBe('test');
    });

    test('component has state and state can be changed', () => {
        expect(component?.state.name).toBe('State name');

        if (component) {
            component.state = {
                name: 'New state name',
            };
        }

        expect(component?.state.name).toBe('New state name');
    });

    test('Component didMount method is working', () => {
        expect(isComponentDidMount).toBe(false);
        component?.render();
        expect(isComponentDidMount).toBe(true);
    });

    test('Component has correct meta', () => {
        const template = () => '<div className="class">Hello</div>';
        component = new Component(template);

        const vDom = {
            tagName: 'div',
            attrs: {
                className: 'class',
            },
            children: [
                'Hello',
            ],
        };

        expect(isEqual(component.getMeta(), vDom)).toBe(true);
    });

});
