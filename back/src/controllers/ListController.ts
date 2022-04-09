import { Request, Response } from "express";
import ListService from "../services/ListService";

export default class ListController {
    constructor (
        private listService: ListService,
    ) {
    }

    get(req: Request, res: Response): void {
        const type = req.params.type + '';

        switch (type) {
            case 'cheap':
                this.listService.getCheapBasicList()
                    .then(trades => res.send(trades));
                break;
            case 'expensive':
                this.listService.getExpensiveBasicList()
                    .then(trades => res.send(trades));
                break;
            case 'refine':
                this.listService.getRefineList()
                    .then(trades => res.send(trades));
                break;
            case 'salvage':
                this.listService.getSalvageList()
                    .then(trades => res.send(trades));
                break;
            case 'cooking':
                this.listService.getCookingList()
                    .then(trades => res.send(trades));
                break;
            default: throw 'unknown list';
        }
    }
}
