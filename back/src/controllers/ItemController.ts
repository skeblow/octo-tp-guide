// import { Request, Response } from 'express';
import ItemService from '../services/ItemService.ts';

export default class ItemController {
    constructor(
        private itemService: ItemService,
    ) {
    }

    getAll(req: any, res: any): void {
        const ids = ((req.query.ids || '') + '').split(',')
            .filter((id) => !!id)
            .map((id) => +id);

        if (ids.length === 0) {
            this.itemService.getAll()
                .then((items) => res.send(items));

            return;
        }

        this.itemService.getAllByIds(ids)
            .then((items) => res.send(items));
    }

    get(req: any, res: any): void {
        const id = parseInt(req.params['id']);

        this.itemService.getItemById(id)
            .then((item) => {
                res.send(item);
            });
    }
}
