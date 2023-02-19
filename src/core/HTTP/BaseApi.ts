import { httpService, METHODS } from './index';

type API = {
    headers: Record<string, string>;
    get: (url: string, data?: unknown) => Promise<any>;
    post: (url: string, data?: unknown) => Promise<any>;
    put: (url: string, data?: unknown) => Promise<any>;
    delete: (url: string, data?: unknown) => Promise<any>;
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
