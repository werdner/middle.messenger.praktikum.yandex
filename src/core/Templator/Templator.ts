import { HTMLParser } from './HTMLParser';

export type Context = Record<string, any> | null;
type Events = Record<string, (event: Event) => void>;

export class Templator {
    private readonly template: (state?: Record<string, any>) => string;
    private state?: Record<string, any>
    private regExp: RegExp;
    private context?: Context;
    private events?: Events
    private parser: HTMLParser;

    constructor(template: (state?: Record<string, any>) => string, state?: Record<string, any>) {
        this.template = template;
        this.context = null;
        this.regExp = /\{\{(.*?)\}\}/g;
        this.parser = new HTMLParser();
        this.state = state
    }

    private parseTemplate(match = this.regExp.exec(this.template(this.state))) {
        if (!match) return null;
        if (!this.context) return;

        if (match[1].includes('.')) {
            const keys = match[1].trim().split('.');

            const value = keys.reduce((acc, item) => acc[item], this.context);

            return {
                match: match[0],
                value,
            };
        }

        return {
            match: match[0],
            value: this.context[match[1].trim()],
        };
    }

    public prepareToCompile(context?: Context) {
        let  variableName = null;
        let result = this.template(this.state);
        this.context = context;

        while (variableName = this.parseTemplate()) {

            if (!variableName || !variableName?.value) {
                continue;
            }

            let { match, value } = variableName;

            if (Array.isArray(value)) value = value.join('');

            result = result.replace(new RegExp(match, 'gi'), value);
        }

        return result;
    }

    public updateTemplate(newState: Record<string, any>) {
        this.state = newState
        return this.compile(this.context, this.events)
    }

    public compile(context?: Context, events?: Events) {
        this.events = events

        const HTML = this.parser.parseHTML(this.prepareToCompile(context), events);
        return HTML;
    }
}
