import { Request, Response } from "express";
import ItemService from "../services/ItemService";

export default class ItemController {
    constructor(
        private itemService: ItemService,
    ) {
    }

    getAll(req: Request, res: Response): void {
        res.send('ass');
    }

    get(req: Request, res: Response): void {
        const id = parseInt(req.params['id']);

        this.itemService.getItemById(id)
            .then(item => {
                res.send(item);
            });
    }
}
