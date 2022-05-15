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
            case 'cooking':
                this.listService.getCookingList()
                    .then((trades) => res.send(trades));
                break;
            case 'utility':
                this.listService.getUtilityList()
                    .then((trades) => res.send(trades));
                break;
            case 'open':
                this.listService.getOpenList()
                    .then((trades) => res.send(trades));
                break;
            case 'weaponsmith':
                this.listService.getWeaponsmithList()
                    .then((trades) => res.send(trades));
                break;
            case 'jewelcrafting':
                this.listService.getJewelcraftingList()
                    .then((trades) => res.send(trades));
                break;
            case 'artificier':
                this.listService.getArtificierList()
                    .then((trades) => res.send(trades));
                break;
            case 'huntsman':
                this.listService.getHuntsmanList()
                    .then((trades) => res.send(trades));
                break;
            case 'tailor':
                this.listService.getTailorList()
                    .then((trades) => res.send(trades));
                break;
            case 'armorsmith':
                this.listService.getArmorsmithList()
                    .then((trades) => res.send(trades));
                break;
            default:
                throw 'unknown list';
        }
    }
}
