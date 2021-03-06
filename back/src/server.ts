// import express, { Request, Response } from 'express';
import { ROUTES } from './routes.ts';
import { opine, opineCors } from './deps.ts';

const app = opine();
const port: number = 3000;

app.use(opineCors());

for (const route of ROUTES) {
    switch (route.method) {
        case 'get':
            app.get(route.route, route.handler as any);
            break;
        case 'post':
            app.post(route.route, route.handler as any);
            break;
        case 'patch':
            app.patch(route.route, route.handler as any);
            break;
        case 'delete':
            app.delete(route.route, route.handler as any);
            break;
        default:
            throw 'not handled method! (' + route.method + ')';
    }
}

app.listen(port, () => {
    console.log('app started on http://localhost:' + port);
});
