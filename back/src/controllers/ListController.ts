import { Request, Response } from "express";
import { BasicTrade } from "../../../shared";
import ListService from "../services/ListService";

export default class ListController {
    constructor (
        private listService: ListService,
    ) {
    }

    get(req: Request, res: Response): void {
        this.listService.getBasicList()
            .then((trades: Array<BasicTrade>) => res.send(trades));
    }
}
