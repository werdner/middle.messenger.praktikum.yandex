import { Block } from '../Block';

export class Route {
    private readonly _block: Block | null;
    private _pathname: string;

    constructor(pathname: string, view: Block) {
        this._pathname = pathname;
        this._block = view;
    }

    navigate(pathname: string) {
        if (!this.match(pathname) && this._block) {
            this._pathname = pathname;
            this._block.render();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        this._block?.render();
    }
}
