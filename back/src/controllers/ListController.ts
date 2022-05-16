import ListService from '../services/ListService.ts';

export default class ListController {
    constructor(
        private listService: ListService,
    ) {
    }

    get(req: any, res: any): void {
        const type = req.params.type + '';

        switch (type) {
            case 'cheap':
                this.listService.getCheapBasicList()
                    .then((trades) => res.send(trades));
                break;
            case 'expensive':
                this.listService.getExpensiveBasicList()
                    .then((trades) => res.send(trades));
                break;
            case 'refine':
                this.listService.getRefineList()
                    .then((trades) => res.send(trades));
                break;
            case 'salvage':
                this.listService.getSalvageList()
                    .then((trades) => res.send(trades));
                break;
            case 'open':
                this.listService.getOpenList()
                    .then((trades) => res.send(trades));
                break;
            default:
                this.listService.getRecipeList(type)
                    .then((trades) => res.send(trades));
                break;
        }
    }
}
