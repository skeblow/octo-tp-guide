import { Request, Response } from "express";

export default class ListController {
    get(req: Request, res: Response): void {
        res.send('ass');
    }
}
