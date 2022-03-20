import { Request, Response } from "express";


interface Route
{
    method: 'get'|'post'|'patch'|'delete';
    route: string;
    handler: (req: Request, res: Response) => void,
};

export const ROUTES: Route[] = [
    {
        'route': '/',
        'method': 'get',
        'handler': (req: Request, res: Response) => {
            res.send('ass');
        },
    },
];
