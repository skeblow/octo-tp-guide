import { Request, Response } from "express";
import ItemService from "../services/ItemService";

export default class ItemController {
    constructor(
        private itemService: ItemService,
    ) {
    }

    getAll(req: Request, res: Response): void {
        this.itemService.getAll()
            .then(items => res.send(items));
    }

    get(req: Request, res: Response): void {
        const id = parseInt(req.params['id']);

        this.itemService.getItemById(id)
            .then(item => {
                res.send(item);
            });
    }
}
