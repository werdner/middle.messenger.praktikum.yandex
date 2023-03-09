import { Block } from '../Block';
import { Templator } from '../Templator';

export class HelloPage extends Block {
    constructor(context?: object) {
        const state = {
            name: 'State name',
        };

        const template = () => (`
            <div>Hello</div>
        `);

        const vApp = new Templator(template, state).compile(context);
        super('test', vApp, state);
    }

    get state() {
        return this.store.state;
    }

    set state(val) {
        this.store.setState(val);
    }
}

export class LoginPage extends Block {
    constructor(context?: object) {
        const state = {
            name: 'State name',
        };

        const template = () => (`
            <div>Login</div>
        `);

        const vApp = new Templator(template, state).compile(context);
        super('test', vApp, state);
    }

    get state() {
        return this.store.state;
    }

    set state(val) {
        this.store.setState(val);
    }
}

export class ByePage extends Block {
    constructor(context?: object) {
        const state = {
            name: 'State name',
        };

        const template = () => (`
            <div>Bye</div>
        `);

        const vApp = new Templator(template, state).compile(context);
        super('test', vApp, state);
    }

    get state() {
        return this.store.state;
    }

    set state(val) {
        this.store.setState(val);
    }
}

export class Register extends Block {
    constructor(context?: object) {
        const state = {
            name: 'State name',
        };

        const template = () => (`
            <div>Register</div>
        `);

        const vApp = new Templator(template, state).compile(context);
        super('test', vApp, state);
    }

    get state() {
        return this.store.state;
    }

    set state(val) {
        this.store.setState(val);
    }
}
