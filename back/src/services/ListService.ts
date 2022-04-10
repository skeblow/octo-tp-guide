import { BasicTrade, Item, ItemBltc, ItemPrice, Recipe, RecipeTrade, RefineTrade, SalvageTrade, TradeItem } from "../../../shared";
import BltcService from "./BltcService";
import CookingService from "./CookingService";
import ItemService from "./ItemService";
import MongoService from "./MongoService";
import PriceService from "./PriceService";
import RefineService from "./RefineService";
import SalvageService from "./SalvageService";

export default class ListService {
    constructor (
        private mongoService: MongoService,
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
        private refineService: RefineService,
        private salvageService: SalvageService,
        private cookingService: CookingService,
    ) {
    }

    async getCheapBasicList(): Promise<Array<BasicTrade>> {
        let list = await this.getBasicList(
            25,
            50,
            2_000,
            2_000,
        );
        list = list.sort((trade1: BasicTrade, trade2: BasicTrade) => this.priceService.getRoi(trade2.price) - this.priceService.getRoi(trade1.price));

        return list;
    }

    async getExpensiveBasicList(): Promise<Array<BasicTrade>> {
        let list = await this.getBasicList(
            25,
            20_000,
            20,
            20,
        );
        list = list.sort((trade1: BasicTrade, trade2: BasicTrade) => trade1.item.name.localeCompare(trade2.item.name));

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

        const prices = await this.priceService.getPricesByIds(ids);
        const items = await this.itemService.getAllByIds(ids);
        const bltcs = await this.bltcService.getBltcByIds(ids);

        const trades: Array<BasicTrade> = [];

        for (const price of prices) {
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

    async getRefineList(): Promise<Array<RefineTrade>> {
        const recipes = await this.refineService.getAll();
        const itemIds = recipes
            .map(
                recipe => recipe.input
                    .map(item => item.id)
                    .concat(recipe.output.map(item => item.id))
            )
            .flat();

        const items = await this.itemService.getAllByIds(itemIds);
        const prices = await this.priceService.getPricesByIds(itemIds);
        const bltcs = await this.bltcService.getBltcByIds(itemIds);

        const trades: Array<RefineTrade> = [];

        for (const recipe of recipes) {
            const inputs: Array<TradeItem> = recipe.input.map(input => {
                return {
                    item: items.find(i => i.id === input.id) as Item,
                    price: prices.find(p => p.id === input.id) as ItemPrice,
                    bltc: bltcs.find(b => b.id === input.id) as ItemBltc,
                    quantity: input.quantity,
                };
            });
            const outputs: Array<TradeItem> = recipe.output.map(output => {
                return {
                    item: items.find(i => i.id === output.id) as Item,
                    price: prices.find(p => p.id === output.id) as ItemPrice,
                    bltc: bltcs.find(b => b.id === output.id) as ItemBltc,
                    quantity: output.quantity,
                };
            });
            const totalBuy = inputs.reduce((total, item: TradeItem) => total + item.price.buys.unit_price * item.quantity, 0)
            const totalSell = outputs.reduce((total, item: TradeItem) => total +item.price.sells.unit_price * item.quantity, 0)
            const profit = Math.round( 0.85 * totalSell - totalBuy );
            const roi = Math.round( profit / totalBuy * 100 );
            
            if (outputs.length === 0) {
                continue;
            }

            trades.push({
                id: recipe.id,
                recipe: recipe,
                input: inputs,
                output: outputs[0],
                totalBuy: totalBuy,
                totalSell: totalSell,
                profit: profit,
                roi: roi,
            });
        }

        trades.sort((trade1, trade2) => trade2.roi - trade1.roi);

        return trades;
    }

    async getSalvageList(): Promise<Array<SalvageTrade>> {
        const recipes = await this.salvageService.getAll();
        const itemIds = recipes
            .flatMap(
                recipe => recipe.input
                    .map(item => item.id)
                    .concat(recipe.output.map(item => item.id))
            );
        
        const items = await this.itemService.getAllByIds(itemIds);
        const prices = await this.priceService.getPricesByIds(itemIds);
        const bltcs = await this.bltcService.getBltcByIds(itemIds);

        let trades: Array<SalvageTrade> = [];

        for (const recipe of recipes) {
            const inputs: Array<TradeItem> = recipe.input.map(input => {
                return {
                    item: items.find(i => i.id === input.id) as Item,
                    price: prices.find(p => p.id === input.id) as ItemPrice,
                    bltc: bltcs.find(b => b.id === input.id) as ItemBltc,
                    quantity: input.quantity,
                };
            });
            const outputs: Array<TradeItem> = recipe.output.map(output => {
                return {
                    item: items.find(i => i.id === output.id) as Item,
                    price: prices.find(p => p.id === output.id) as ItemPrice,
                    bltc: bltcs.find(b => b.id === output.id) as ItemBltc,
                    quantity: output.quantity,
                };
            });

            if (inputs.length === 0) {
                continue;
            }

            trades.push({
                id: recipe.id,
                recipe: recipe,
                input: inputs[0],
                output: outputs,
            });
        }

        trades = trades.sort((trade1: SalvageTrade, trade2: SalvageTrade) => {
            const trade1Roi = this.salvageService.getSalvageRoi(trade1);
            const trade2Roi = this.salvageService.getSalvageRoi(trade2);

            return trade2Roi - trade1Roi;
        });

        return trades;
    }

    async getCookingList(): Promise<Array<RecipeTrade>> {
        const recipes = await this.cookingService.getAll();
        let itemIds = recipes
            .flatMap(
                recipe => recipe.input
                    .map(item => item.id)
                    .concat(recipe.output.map(item => item.id))
            );
        itemIds = [...new Set(itemIds)];

        const [
            items,
            prices,
            bltcs,
        ] = await Promise.all([
            this.itemService.getAllByIds(itemIds),
            this.priceService.getPricesByIds(itemIds),
            this.bltcService.getBltcByIds(itemIds),
        ]);

        let trades: Array<RecipeTrade> = [];

        for (const recipe of recipes) {
            const inputs: Array<TradeItem> = recipe.input.map(input => {
                return {
                    item: items.find(i => i.id === input.id) as Item,
                    price: prices.find(p => p.id === input.id) as ItemPrice,
                    bltc: bltcs.find(b => b.id === input.id) as ItemBltc,
                    quantity: input.quantity,
                };
            });
            const outputs: Array<TradeItem> = recipe.output.map(output => {
                return {
                    item: items.find(i => i.id === output.id) as Item,
                    price: prices.find(p => p.id === output.id) as ItemPrice,
                    bltc: bltcs.find(b => b.id === output.id) as ItemBltc,
                    quantity: output.quantity,
                };
            });

            if (outputs.length === 0) {
                continue;
            }

            trades.push({
                id: recipe.id,
                recipe: recipe,
                input: inputs,
                output: outputs[0],
            });
        }

        trades = trades.sort((trade1: RecipeTrade, trade2: RecipeTrade) => {
            const trade1Roi = this.cookingService.getCookingRoi(trade1);
            const trade2Roi = this.cookingService.getCookingRoi(trade2);

            return trade2Roi - trade1Roi;
        });

        return trades;
    }
}
