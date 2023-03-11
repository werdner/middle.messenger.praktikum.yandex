import { HTTPTransport, queryStringify, onload, METHODS } from './HTTPTransport';
describe('http', () => {
    const data = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    };
    const fetch = new HTTPTransport('https://jsonplaceholder.typicode.com/');

    const xhr = Object.defineProperties(new XMLHttpRequest(), {
        status: { writable: true },
        responseText: { writable: true },
    });

    test('queryStringify should be return url query string from object', () => {
        const queryString = queryStringify(data);
        expect(queryString).toBe('?title=foo&body=bar&userId=1');
    });

    test('fetch function should return promise', async () => {
        const get = async () => {
            await fetch.request('todos/1', {});
        };

        const getWithData = async () => {
            await fetch.request('posts', { data: data });
        };

        const post = async () => {
            await fetch.request('posts', { method: METHODS.POST });
        };

        const postWidthData = async () => {
            await fetch.request('posts', { method: METHODS.POST, data });
        };

        const postWidthHeaders = async () => {
            await fetch.request('posts', {
                method: METHODS.POST,
                data,
                headers: { 'Content-Type': 'application/json' },
            });
        };

        const onloadCallbackStatus200 = () => {
            (xhr as any).status = 200;
            (xhr as any).responseText = 'simple text';

            const resolve = (value: unknown) => value;
            const reject = (value: unknown) => value;

            onload(xhr, resolve, reject);
        };

        const onloadCallbackStatusNot200 = () => {
            (xhr as any).status = 400;
            (xhr as any).responseText = 'simple text';

            const resolve = (value: unknown) => value;
            const reject = (value: unknown) => value;
            onload(xhr, resolve, reject);
        };

        const onloadCallbackResponseText = () => {
            (xhr as any).responseText = 'simple text';

            const resolve = (value: unknown) => value;
            const reject = (value: unknown) => value;
            onload(xhr, resolve, reject);
        };

        const onloadCallbackResponseJson = () => {
            (xhr as any).responseText = '{test: text}';

            const resolve = (value: unknown) => value;
            const reject = (value: unknown) => value;
            onload(xhr, resolve, reject);
        };

        const onloadCallbackResponseArray = () => {
            (xhr as any).responseText = '[{test: text}]';

            const resolve = (value: unknown) => value;
            const reject = (value: unknown) => value;
            onload(xhr, resolve, reject);
        };

        expect(get).not.toThrow();
        expect(getWithData).not.toThrow();

        expect(post).not.toThrow();
        expect(postWidthData).not.toThrow();
        expect(postWidthHeaders).rejects.toBeTruthy();

        expect(onloadCallbackStatus200).not.toThrow();
        expect(onloadCallbackStatusNot200).not.toThrow();

        expect(onloadCallbackResponseText).not.toThrow();
        expect(onloadCallbackResponseJson).not.toThrow();
        expect(onloadCallbackResponseArray).not.toThrow();
    });
});
