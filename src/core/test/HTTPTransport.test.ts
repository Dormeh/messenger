import http from 'core/HTTPTransport';
import METHODS from 'core/HTTPTransport';

describe('core/HTTPTransport', () => {
    it('should send requests', async () => {
        await http
            .request('http://mockhost/mock/path', { method: METHODS.GET })
            .then(({ status }) => {
                expect(status).toBe(200);
            })
            .catch((error) => {
                expect(error).toBe(null);
                throw new Error();
            });
    });
    it('should send requests with headers', async () => {
        await http
            .request('http://mockhost/mock/path', { headers: { 'mock-header': 'test' } })
            .then((response) => {
                const headers = response
                    .getAllResponseHeaders()
                    .split('\r\n')
                    .reduce((result, current) => {
                        const [name, value] = current.split(': ');
                        result[name] = value;
                        return result;
                    }, {});
                expect(response.status).toBe(200);
                expect(headers['mock-header']).toBe('test');
            })
            .catch((error) => {
                expect(error).toBe(null);
                throw new Error();
            });
    });

    it('should send get requests with parameters', async () => {
        const response = await http
            .get('http://mockhost/mock/path', { data: { param: 'mock' } })
            .then(({ status, response }) => {
                expect(status).toBe(200);
                expect(JSON.parse(response)).toEqual({ param: 'mock' });
            })
            .catch((error) => {
                expect(error).toBe(null);
                throw new Error();
            });
    });
    it('should send post requests with JSON', async () => {
        await http
            .post('http://mockhost/mock/path', { data: { postprop: 'mock' } })
            .then(({ status, response }) => {
                expect(status).toBe(200);
                expect(JSON.parse(response)).toEqual({ postprop: 'mock' });
            })
            .catch((error) => {
                expect(error).toBe(null);
                throw new Error();
            });
    });

    it('should send put requests with JSON', async () => {
        await http
            .put('http://mockhost/mock/path', { data: { putprop: 'mock' } })
            .then(({ status, response }) => {
                expect(status).toBe(200);
                expect(JSON.parse(response)).toEqual({ putprop: 'mock' });
            })
            .catch((error) => {
                expect(error).toBe(null);
                throw new Error();
            });
    });

    it('should send delete requests with JSON', async () => {
        await http
            .delete('http://mockhost/mock/path', { data: { deleteprop: 'mock' } })
            .then(({ status, response }) => {
                expect(status).toBe(200);
                expect(JSON.parse(response)).toEqual({ deleteprop: 'mock' });
            })
            .catch((error) => {
                expect(error).toBe(null);
                throw new Error();
            });
    });
});
