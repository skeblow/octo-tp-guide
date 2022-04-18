import { BasicTrade, Item, ItemBltc, ItemPrice, RecipeTrade, TradeData, SalvageTrade, TradeItem, Recipe, SalvageRecipe } from "../../../shared";
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

    async getCheapBasicList(): Promise<Array<BasicTrade>> {
        const list = await this.getBasicList(
            30,
            30,
            1_800,
            1_800,
        );
        list.sort((trade1: BasicTrade, trade2: BasicTrade) => trade2.roi - trade1.roi);

        return list;
    }

    async getExpensiveBasicList(): Promise<Array<BasicTrade>> {
        const list = await this.getBasicList(
            30,
            20_000,
            30,
            30,
        );
        list.sort((trade1: BasicTrade, trade2: BasicTrade) => trade1.item.name.localeCompare(trade2.item.name));

        return list;
    }

    private async getBasicList(minRoi: number, minSell: number, minSells: number, minBuys: number): Promise<Array<BasicTrade>> {
        const collection = await this.mongoService.getBltcCollection();

        const result = await collection.aggregate([
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
                    bought: {$gt: minBuys},
                    sold: {$gt: minSells},
                },
            },
        ]).toArray();

        const ids = result.map(obj => obj.id);
        let trades: Array<BasicTrade> = await this.tradeService.getTradesFromItemIds(ids);
        trades = trades.filter(trade => trade.totalSell > minSell && trade.profit > 10 && trade.roi > minRoi);

        return trades;
    }

    async getRefineList(): Promise<Array<RecipeTrade>> {
        const recipes = await this.refineService.getAll();

        let trades = await this.tradeService.getTradesFromRecipes(recipes);
        
        trades = trades.sort((trade1, trade2) => {
            const trade1Name = trade1.input[0].item.name.toLocaleLowerCase();
            const trade2Name = trade2.input[0].item.name.toLocaleLowerCase();

            return trade1Name.localeCompare(trade2Name);
        });

        return trades;
    }

    async getSalvageList(): Promise<Array<SalvageTrade>> {
        const recipes = await this.salvageService.getAll();
        
        return this.tradeService.getTradesFromSalvageRecipes(recipes);
    }

    async getOpenList(): Promise<Array<SalvageTrade>> {
        const recipes = await this.openService.getAll();

        return this.tradeService.getTradesFromSalvageRecipes(recipes);
    }

    async getCookingList(): Promise<Array<RecipeTrade>> {
        const recipes = await this.cookingService.getAll();
        
        return this.tradeService.getTradesFromRecipes(recipes);
    }

    async getUtilityList(): Promise<Array<RecipeTrade>> {
        const recipes = await this.utilityService.getAll();
        
        return this.tradeService.getTradesFromRecipes(recipes);
    }

    async getWeaponsmithList(): Promise<Array<RecipeTrade>> {
        const recipes = await this.weaponsmithService.getAll();
        
        return this.tradeService.getTradesFromRecipes(recipes);
    }
}
