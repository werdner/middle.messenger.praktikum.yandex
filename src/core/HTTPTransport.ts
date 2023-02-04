enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type TRequestData = Record<string, string | number>;
type TMethodRequest = (url: string, options: TRequestOptions) => Promise<XMLHttpRequest>

export type TRequestOptions = {
    method?: METHODS
    headers?: Record<string, string>
    timeout?: number
    data?: unknown
    withCredentials?: boolean
};

function queryStringify(data: TRequestData) {
    if (!data) return '';
    return Object.entries(data).reduce((acc, [key, value], index, arr) => {
        return `${acc}${key}=${value}${index < arr.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    private _parentPath: string;

    constructor(_parentPath: string = '') {
        this._parentPath = _parentPath;
    }

    public get: TMethodRequest = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.GET });
    };

    public post: TMethodRequest = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    public put: TMethodRequest = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    public patch: TMethodRequest = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PATCH });
    };

    public delete: TMethodRequest = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request: TMethodRequest = (url, options) => {
        const {
            method = METHODS.GET,
            headers = {},
            data,
            timeout = 5000,
            withCredentials = false,
        } = options;

        const query = method === METHODS.GET ? queryStringify(data as TRequestData) : '';

        return new Promise((resolve, reject) => {
            const xhr = new window.XMLHttpRequest();

            xhr.open(method, this._parentPath + url + query);

            if (withCredentials) {
                xhr.withCredentials = true;
            }

            Object.entries(headers).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            xhr.onload = () => {
                if (xhr.status >= 300) {
                    reject(xhr);
                } else {
                    resolve(xhr);
                }
            };

            xhr.onabort = () => reject(xhr);
            xhr.onerror = () => reject(xhr);
            xhr.timeout = timeout;
            xhr.ontimeout = () => reject(xhr);

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data as any);
            }
        });
    };
}

export default new HTTPTransport();
