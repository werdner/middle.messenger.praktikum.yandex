import {isPlainObject} from "../../utils/isPlainObject";

export enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type TMethodRequest = (url: string, options: TRequestOptions) => Promise<any>

export type TRequestOptions = {
    method?: METHODS
    headers?: Record<string, string>
    timeout?: number
    data?: unknown
    withCredentials?: boolean
};

function queryStringify(data: Record<string, unknown>): string {
    let str = '?';

    const arr = Object.entries(data);

    arr.forEach(([key, value], index) => {
        str = str + `${key}=${value}`;
        if (index !== arr.length - 1) {
            str = str + '&';
        }
    });
    return str;
}

function onload(xhr: XMLHttpRequest, resolve: (value: (XMLHttpRequest | PromiseLike<XMLHttpRequest>)) => void, reject: (value: unknown) => void) {
    return function () {
        const startObject = xhr.responseText.trim().startsWith('{');
        const startArray = xhr.responseText.trim().startsWith('[');

        const endObject = xhr.responseText.trim().endsWith('}');
        const endArray = xhr.responseText.trim().endsWith(']');

        const isStartBracket = startObject || startArray;
        const isEndBracket = endObject || endArray;

        const isJson = isStartBracket && isEndBracket;
        const badResponse = !xhr.status.toString().startsWith('2');

        const done = badResponse ? reject : resolve;

        done(isJson ? JSON.parse(xhr.responseText) : xhr.responseText);
        xhr.abort();
    }
}

export class HTTPTransport {
    private readonly _parentPath: string;

    constructor(_parentPath: string = '') {
        this._parentPath = _parentPath;
    }

    request: TMethodRequest = (url, options) => {
        const {method = METHODS.GET, timeout = 10000, headers = {}, data} = options || {};

        const isFormdata = data instanceof FormData;

        const isGetWithData = (METHODS.GET === method) && isPlainObject(data)

        const xhr = new XMLHttpRequest();
        const uri = this._parentPath + (isGetWithData ? `${url}${queryStringify(data)}` : url);
        const body = isFormdata ? data : JSON.stringify(data);

        const promise = new Promise((resolve, reject) => {
            xhr.open(method, uri);
            xhr.withCredentials = true;

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = onload(xhr, resolve, reject);
            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGetWithData) {
                xhr.send();
            } else {
                xhr.send(body);
            }
        });

        return promise;
    };
}
