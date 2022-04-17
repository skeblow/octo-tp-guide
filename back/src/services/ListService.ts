import { BasicTrade, Item, ItemBltc, ItemPrice, RecipeTrade, TradeData, SalvageTrade, TradeItem, Recipe, SalvageRecipe } from "../../../shared";
import BltcService from "./BltcService";
import CookingService from "./CookingService";
import ItemService from "./ItemService";
import MongoService from "./MongoService";
import OpenService from "./OpenService";
import PriceService from "./PriceService";
import RefineService from "./RefineService";
import SalvageService from "./SalvageService";
import TradeService from "./TradeService";
import UtilityService from "./UtilityService";

export default class ListService {
    constructor (
        private mongoService: MongoService,
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
        private tradeService: TradeService,
        private refineService: RefineService,
        private salvageService: SalvageService,
        private cookingService: CookingService,
        private utilityService: UtilityService,
        private openService: OpenService,
    ) {
    }

    async getCheapBasicList(): Promise<Array<BasicTrade>> {
        const list = await this.getBasicList(
            25,
            30,
            1_800,
            1_800,
        );
        list.sort((trade1: BasicTrade, trade2: BasicTrade) => this.priceService.getRoi(trade2.price) - this.priceService.getRoi(trade1.price));

        return list;
    }

    async getExpensiveBasicList(): Promise<Array<BasicTrade>> {
        const list = await this.getBasicList(
            25,
            20_000,
            20,
            20,
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

        const [
            prices,
            items,
            bltcs,
        ] = await Promise.all([
            this.priceService.getPricesByIds(ids),
            this.itemService.getAllByIds(ids),
            this.bltcService.getBltcByIds(ids)
        ]);

        const trades: Array<BasicTrade> = [];

        for (const price of prices) {
            if (trades.map(trade => trade.price.id).includes(price.id)) {
                continue;
            }

            const profit = this.priceService.getProfit(price);
            const roi = this.priceService.getRoi(price);

            const basicTrade: BasicTrade = {
                item: items.find(item => item.id === price.id) as Item,
                price: price,
                bltc: bltcs.find(bltc => bltc.id === price.id) as ItemBltc,
                quantity: 1,
                totalBuy: price.buys.unit_price,
                totalSell: price.sells.unit_price,
                profit: profit,
                roi: roi,
            }
            
            if (basicTrade.totalBuy < minSell || basicTrade.profit < 10 || basicTrade.roi < minRoi) {
                continue;
            }

            trades.push(basicTrade);
        }

        return trades;
    }

    async getRefineList(): Promise<Array<RecipeTrade>> {
        const recipes = await this.refineService.getAll();

        return this.tradeService.getTradesFromRecipes(recipes);
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
}
