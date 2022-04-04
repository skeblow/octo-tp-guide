import { BasicTrade, Item, ItemBltc, ItemPrice, RefineTrade } from "../../../shared";
import BltcService from "./BltcService";
import ItemService from "./ItemService";
import MongoService from "./MongoService";
import PriceService from "./PriceService";
import RecipeService from "./RecipeService";

export default class ListService {
    constructor (
        private mongoService: MongoService,
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
        private recipeService: RecipeService,
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

    async getBasicList(minRoi: number, minSell: number, minSells: number, minBuys: number): Promise<Array<BasicTrade>> {
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
                $match: {bought: {$gt: minBuys}, sold: {$gt: minSells}},
            },
        ]).toArray();

        const ids = result.map(obj => obj.id);

        let prices = await this.priceService.getPricesByIds(ids);
        prices = prices.filter((price: ItemPrice) => {
            const profit = this.priceService.getProfit(price);
            const roi = this.priceService.getRoi(price);

            return price.sells.unit_price > minSell && profit > 10 && roi > minRoi;
        });

        const items = await this.itemService.getAllByIds(prices.map(price => price.id));
        const bltcs = await this.bltcService.getBltcByIds(prices.map(price => price.id));

        const trades: Array<BasicTrade> = [];

        for (const price of prices) {
            trades.push({
                item: items.find(item => item.id === price.id) as Item,
                price: price,
                bltc: bltcs.find(bltc => bltc.id === price.id) as ItemBltc,
            });
        }

        return trades;
    }

    async getRefineList(): Promise<Array<RefineTrade>> {
        const recipes = await this.recipeService.getAll();
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
            const inputs = recipe.input.map(input => {
                const trade: BasicTrade = {
                    item: items.find(i => i.id === input.id) as Item,
                    price: prices.find(p => p.id === input.id) as ItemPrice,
                    bltc: bltcs.find(b => b.id === input.id) as ItemBltc,
                };

                return {
                    item: trade,
                    quantity: input.quantity,
                };
            });
            const outputs: Array<any> = recipe.output.map(output => {
                const trade: BasicTrade = {
                    item: items.find(i => i.id === output.id) as Item,
                    price: prices.find(p => p.id === output.id) as ItemPrice,
                    bltc: bltcs.find(b => b.id === output.id) as ItemBltc,
                };

                return {
                    item: trade,
                    quantity: output.quantity,
                };
            });
            
            if (outputs.length === 0) {
                continue;
            }

            trades.push({
                recipe: recipe,
                input: inputs,
                output: outputs[0],
            });
        }

        return trades;
    }
}
