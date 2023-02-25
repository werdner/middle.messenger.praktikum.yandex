import { httpService, METHODS } from './index';

type HTTPMethod = (url: string, data?: unknown) => Promise<any>

type API = {
    headers: Record<string, string>;
    get: HTTPMethod;
    post: HTTPMethod;
    put: HTTPMethod;
    delete: HTTPMethod;
};

const api: API = {
    headers: { 'Content-Type': 'application/json' },

    get: (url, data) => {
        const { headers } = api;
        return httpService.request(url, { method: METHODS.GET, headers, data });
    },

    post: (url, data) => {
        const { headers } = api;
        return httpService.request(url, { method: METHODS.POST, headers, data });
    },

    put: (url, data) => {
        let { headers } = api;
        if (data instanceof FormData) {
            headers = {} as any;
        }
        return httpService.request(url, { method: METHODS.PUT, headers, data });
    },

    delete: (url, data) => {
        const { headers } = api;
        return httpService.request(url, { method: METHODS.DELETE, headers, data });
    },
};

export { api };
