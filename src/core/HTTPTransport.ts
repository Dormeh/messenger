export enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type RequestOptions = {
    method?: METHODS;
    headers?: Record<string, string>;
    timeout?: number;
    data?: unknown;
};

type HTTPMethod = (url: string, options?: RequestOptions) => Promise<unknown>

import { isJson } from '../asserts/utils';

type RequestData = Record<string, string | number>;

Object.defineProperty(XMLHttpRequest.prototype, 'responseJSON', {
    value: function () {
        return typeof this.response === 'string' && isJson(this.response) ? JSON.parse(this.response) : this.response;
    },
    writable: false,
    enumerable: false,
});

function queryStringify(data: RequestData) {
    if (!data) return '';
    return Object.entries(data).reduce((acc, [key, value], index, arr) => {
        return `${acc}${key}=${value}${index < arr.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    public get: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.GET });
    };

    public post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    public put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    public patch: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PATCH });
    };

    public delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request = (url: string, options: RequestOptions) => {
        const { method = METHODS.GET, headers = {}, data, timeout = 5000 } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            if (method === METHODS.GET && data) {
                xhr.open(method, `${url}${queryStringify(data as RequestData)}`);
            } else {
                xhr.open(method, url);
            }

            Object.entries(headers).forEach(([header, val]) => xhr.setRequestHeader(header, val));

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            xhr.withCredentials = true;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export default new HTTPTransport();
