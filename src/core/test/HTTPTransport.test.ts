import http from 'core/HTTPTransport';
import METHODS from 'core/HTTPTransport';
const TEST_URL = 'http://mockhost/mock/path'
describe('core/HTTPTransport', () => {
    it('should send requests', async () => {
        await http
            .request(`${TEST_URL}`, { method: METHODS.GET })
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
            .request(`${TEST_URL}`, { headers: { 'mock-header': 'test' } })
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
        await http
            .get(`${TEST_URL}`, { data: { param: 'mock' } })
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
            .post(`${TEST_URL}`, { data: { postprop: 'mock' } })
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
            .put(`${TEST_URL}`, { data: { putprop: 'mock' } })
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
            .delete(`${TEST_URL}`, { data: { deleteprop: 'mock' } })
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
