import { Request, Response } from "express";
import GwApiService from "../services/GwApiService";
import ItemService from "../services/ItemService";

export default class ItemController {
    constructor(
        private itemService: ItemService,
        public gwApiService: GwApiService,
    ) {
    }

    getAll(req: Request, res: Response): void {
        res.send('ass');
    }

    get(req: Request, res: Response): void {
        const id = parseInt(req.params['id']);

        this.itemService.getItemById(id)
            .then(item => {
                console.log('item', item);
                res.send(item);
            });

        //this.gwApiService.getItem(id)
        //    .then(item => res.send(item));
    }
}
