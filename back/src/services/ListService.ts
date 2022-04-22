import { BasicTrade, RecipeTrade, SalvageTrade } from "../../../shared";
import CookingService from "./CookingService";
import MongoService from "./MongoService";
import OpenService from "./OpenService";
import RefineService from "./RefineService";
import SalvageService from "./SalvageService";
import TradeService from "./TradeService";
import UtilityService from "./UtilityService";
import WeaponsmithService from "./WeaponsmithService";

export default class ListService {
    constructor (
        private mongoService: MongoService,
        private tradeService: TradeService,
        private refineService: RefineService,
        private salvageService: SalvageService,
        private cookingService: CookingService,
        private utilityService: UtilityService,
        private openService: OpenService,
        private weaponsmithService: WeaponsmithService,
    ) {
    }

    public getCheapBasicList(): Promise<Array<BasicTrade>> {
        return this.getBasicList({
            minRoi: 25,
            minSell: 30,
            minSells: 1_500,
            minBuys: 1_500,
        })
            .then(list => list.sort((trade1: BasicTrade, trade2: BasicTrade) => trade2.roi - trade1.roi));
    }

    public getExpensiveBasicList(): Promise<Array<BasicTrade>> {
        return this.getBasicList({
            minRoi: 30,
            minSell: 20_000,
            minSells: 25,
            minBuys: 25,
        })
            .then(list => list.sort((trade1: BasicTrade, trade2: BasicTrade) => trade1.item.name.localeCompare(trade2.item.name)));
    }

    private getBasicList(options: {minRoi: number, minSell: number, minSells: number, minBuys: number}): Promise<Array<BasicTrade>> {
        return this.mongoService.getBltcCollection()
            .then(
                collection => collection.aggregate([
                    {
                        $group: {
                            _id: '$id',
                            id: {$first: '$id'},
                            bought: {$last: '$bought'},
                            sold: {$last: '$sold'},
                        },
                    },
                    {
                        $match: {
                            bought: {$gt: options.minBuys},
                            sold: {$gt: options.minSells},
                        },
                    },
                ])
                .toArray()
            )
            .then(result => result.map(obj => obj.id))
            .then(ids => this.tradeService.getTradesFromItemIds(ids))
            .then(trades => trades.filter(trade => trade.totalSell > options.minSell && trade.profit > 10 && trade.roi > options.minRoi));
    }

    public getRefineList(): Promise<Array<RecipeTrade>> {
        return this.refineService.getAll()
            .then(recipes => this.tradeService.getTradesFromRecipes(recipes))
            .then(trades => trades.sort(
                (trade1, trade2) => {
                    const trade1Name = trade1.input[0].item.name.toLocaleLowerCase();
                    const trade2Name = trade2.input[0].item.name.toLocaleLowerCase();
        
                    return trade1Name.localeCompare(trade2Name);
                }
            ));
    }

    public getSalvageList(): Promise<Array<SalvageTrade>> {
        return this.salvageService.getAll()
            .then(recipes => this.tradeService.getTradesFromSalvageRecipes(recipes));
    }

    public getOpenList(): Promise<Array<SalvageTrade>> {
        return this.openService.getAll()
            .then(recipes => this.tradeService.getTradesFromSalvageRecipes(recipes));
    }

    public getCookingList(): Promise<Array<RecipeTrade>> {
        return this.cookingService.getAll()
            .then(recipes => this.tradeService.getTradesFromRecipes(recipes));
    }

    public getUtilityList(): Promise<Array<RecipeTrade>> {
        return this.utilityService.getAll()
            .then(recipes => this.tradeService.getTradesFromRecipes(recipes));
    }

    public getWeaponsmithList(): Promise<Array<RecipeTrade>> {
        return this.weaponsmithService.getAll()
            .then(recipes => this.tradeService.getTradesFromRecipes(recipes));
    }
}
