import { Request, Response } from "express";
import BltcService from "../services/BltcService";
import ItemService from "../services/ItemService";
import PriceService from "../services/PriceService";

export default class ItemController {
    constructor(
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
    ) {
    }

    getAll(req: Request, res: Response): void {
        const ids = ((req.query.ids || '') + '').split(',')
            .filter(id => !! id)
            .map(id => +id);

        if (ids.length === 0) {
            this.itemService.getAll()
                .then(items => res.send(items));

            return;
        }

        this.itemService.getAllByIds(ids)
            .then(items => res.send(items));
    }

    get(req: Request, res: Response): void {
        const id = parseInt(req.params['id']);

        this.itemService.getItemById(id)
            .then(item => {
                res.send(item);
            });
    }

    getBltc(req: Request, res: Response): void {
        const ids = ((req.query.ids || '') + '').split(',')
            .filter(id => !! id)
            .map(id => +id);

        if (ids.length === 0) {
            res.send([]);

            return;
        }

        this.bltcService.getBltc(97919)
            .then(prices => res.send(prices));
    }
}
