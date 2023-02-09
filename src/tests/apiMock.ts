import {setupServer} from 'msw/node';
import {rest} from 'msw'
import user from '../data/testUser.json'

const TEST_ENDPOINT = 'http://mockhost';

const handlers = [
    rest.post(`${process.env.API_ENDPOINT}/auth/logout`, (req, res, ctx) => {

        return res(ctx.status(200));
    }),
    rest.get(`${process.env.API_ENDPOINT}/auth/user`, (req, res, ctx) => {
        return res(
            ctx.json(user)
        )
    }),
    rest.post(`${process.env.API_ENDPOINT}/auth/signin`, async (req, res, ctx) => {
        const body = await req.json()
        return res(ctx.json(body));

    }),
    rest.get(`${TEST_ENDPOINT}/mock/path`, (req, res, ctx) => {
        const param = req.url.searchParams?.get('param');
        const header = req.headers?.get('mock-header');
        const response = [ctx.status(200)];
        if (param) response.push(ctx.json({param}));
        if (header) response.push(ctx.set('mock-header', header));
        return res(...response);
    }),
    rest.post(`${TEST_ENDPOINT}/mock/path`, async (req, res, ctx) => {
        const data = await req.json();
        return res(ctx.status(200), ctx.json(data));
    }),
    rest.put(`${TEST_ENDPOINT}/mock/path`, async (req, res, ctx) => {
        const data = await req.json();
        return res(ctx.status(200), ctx.json(data));
    }),
    rest.delete(`${TEST_ENDPOINT}/mock/path`, async (req, res, ctx) => {
        const data = await req.json();
        return res(ctx.status(200), ctx.json(data));
    }),
];

export const server = setupServer(...handlers);
