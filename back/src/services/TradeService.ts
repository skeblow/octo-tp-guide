import { Item, ItemBltc, ItemPrice, Recipe, RecipeTrade, SalvageRecipe, SalvageTrade, TradeData, TradeItem } from "../../../shared";
import BltcService from "./BltcService";
import ItemService from "./ItemService";
import PriceService from "./PriceService";

export default class TradeService {
    constructor (
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
    ) {
    }

    public getRecipeTradeData(inputs: Array<TradeItem>, outputs: Array<TradeItem>): TradeData {
        const totalBuy = inputs.reduce((total, item: TradeItem) => total + item.price.buys.unit_price * item.quantity, 0)
        const totalSell = outputs.reduce((total, item: TradeItem) => total +item.price.sells.unit_price * item.quantity, 0)
        const profit = Math.round( 0.85 * totalSell - totalBuy );
        const roi = Math.round( profit / totalBuy * 100 );

        return {
            totalBuy,
            totalSell,
            profit,
            roi,
        };
    }

    public async getTradesFromRecipes(recipes: Array<Recipe>): Promise<Array<RecipeTrade>> {
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
            for (const input of recipe.input) {
                if (
                    prices.find(p => p.id === input.id) === undefined
                    || bltcs.find(b => b.id === input.id) === undefined
                ) {
                    console.log('undefined price of', input.id);

                    return trades;
                }
            }

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
                ...this.getRecipeTradeData(inputs, outputs),
            });
        }

        trades.sort((trade1: RecipeTrade, trade2: RecipeTrade) => trade2.roi - trade1.roi);

        return trades;
    }

    public async getTradesFromSalvageRecipes(recipes: Array<SalvageRecipe>): Promise<Array<SalvageTrade>> {
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

        const trades: Array<SalvageTrade> = [];

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
                ...this.getRecipeTradeData(inputs, outputs),
            });
        }

        trades.sort((trade1: SalvageTrade, trade2: SalvageTrade) => trade2.roi - trade1.roi);

        return trades;
    }
}
