import { Request, Response } from "express";
import { BasicTrade } from "../../../shared";
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
                    .then((trades: Array<BasicTrade>) => res.send(trades));
                break;
            case 'expensive':
                this.listService.getExpensiveBasicList()
                    .then((trades: Array<BasicTrade>) => res.send(trades));
                break;
            default: throw 'unknown list';
        }
    }
}
