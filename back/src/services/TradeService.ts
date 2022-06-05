import {
    BasicTrade,
    Item,
    ItemBltc,
    ItemPrice,
    Recipe,
    RecipeTrade,
    RecipeType,
    SalvageRecipe,
    SalvageTrade,
    TradeData,
    TradeItem,
} from '../../../shared/index.ts';
import BltcService from './BltcService.ts';
import ItemService from './ItemService.ts';
import PriceService from './PriceService.ts';

export default class TradeService {
    constructor(
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
    ) {
    }

    private getBasicTradeTarget(bltc: ItemBltc): number {
        let stacks = Math.round( Math.min(bltc.bought, bltc.sold) / 250 );

        return Math.ceil(stacks / 10) * 250;
    }

    private getRecipeTradeTarget(item: Item, bltc: ItemBltc, recipe: Recipe): number {
        if (recipe.type === RecipeType.salvage) {
            let stacks = Math.round(bltc.bought / 250);

            return Math.ceil(stacks / 5) * 250;
        }

        if (item.name.includes('Viper') || item.name.includes('Minstrel')) {
            return Math.ceil(bltc.sold / 30);
        }

        if (item.name.includes('Amulet') || item.name.includes('Earring') || item.name.includes('Ring')) {
            return Math.ceil(bltc.sold / 20);
        }

        if (item.name.includes('Potent Potion') || item.name.includes('Sharpening')) {
            let stacks = Math.round(bltc.sold / 250);

            return Math.ceil(stacks / 15) * 250;
        }

        if (item.name.includes('Pearl')) {
            return Math.ceil(bltc.sold / 20);
        }

        return Math.ceil(bltc.sold / 10);
    }

    public getTradesFromItemIds(ids: Array<number>): Promise<Array<BasicTrade>> {
        return Promise.all([
            this.priceService.getPricesByIds(ids),
            this.itemService.getAllByIds(ids),
            this.bltcService.getBltcByIds(ids),
        ])
            .then(
                ([prices, items, bltcs]) =>
                    prices.map((price: ItemPrice) => {
                        const profit = this.priceService.getProfit(price);
                        const roi = this.priceService.getRoi(price);
                        const bltc = bltcs.find((bltc) => bltc.id === price.id) as ItemBltc;

                        const basicTrade: BasicTrade = {
                            item: items.find((item) =>
                                item.id === price.id
                            ) as Item,
                            price,
                            bltc,
                            quantity: 1,
                            totalBuy: price.buys.unit_price,
                            totalSell: price.sells.unit_price,
                            profit: profit,
                            roi: roi,
                            target: this.getBasicTradeTarget(bltc),
                        };

                        return basicTrade;
                    }),
            );
    }

    public getRecipeTradeData(
        inputs: Array<TradeItem>,
        outputs: Array<TradeItem>,
        cost: number,
        item: Item,
        bltc: ItemBltc,
        recipe: Recipe,
    ): TradeData {
        const totalBuy = inputs.reduce(
            (total, item: TradeItem) => total + item.price.buys.unit_price * item.quantity,
            0,
        ) + cost;
        const totalSell = outputs.reduce(
            (total, item: TradeItem) => total + item.price.sells.unit_price * item.quantity,
            0,
        );
        const profit = Math.round(0.85 * totalSell - totalBuy);
        const roi = Math.round(profit / totalBuy * 100);

        return {
            totalBuy,
            totalSell,
            profit,
            roi,
            target: this.getRecipeTradeTarget(item, bltc, recipe),
        };
    }

    public async getTradesFromRecipes(
        recipes: Array<Recipe>,
    ): Promise<Array<RecipeTrade>> {
        let itemIds = recipes
            .flatMap(
                (recipe) =>
                    recipe.input
                        .map((item) => item.id)
                        .concat(recipe.output.map((item) => item.id)),
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
                    prices.find((p) => p.id === input.id) === undefined ||
                    bltcs.find((b) => b.id === input.id) === undefined
                ) {
                    console.log('undefined price of', input.id);

                    return trades;
                }
            }

            const inputs: Array<TradeItem> = recipe.input.map((input) => {
                return {
                    item: items.find((i) => i.id === input.id) as Item,
                    price: prices.find((p) => p.id === input.id) as ItemPrice,
                    bltc: bltcs.find((b) => b.id === input.id) as ItemBltc,
                    quantity: input.quantity,
                };
            });
            inputs.sort((trade1, trade2) =>
                trade2.price.buys.unit_price * trade2.quantity -
                trade1.price.buys.unit_price * trade1.quantity
            );
            const outputs: Array<TradeItem> = recipe.output.map((output) => {
                return {
                    item: items.find((i) => i.id === output.id) as Item,
                    price: prices.find((p) => p.id === output.id) as ItemPrice,
                    bltc: bltcs.find((b) => b.id === output.id) as ItemBltc,
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
                ...this.getRecipeTradeData(inputs, outputs, recipe.cost ?? 0, outputs[0].item, outputs[0].bltc, recipe),
            });
        }

        trades.sort((trade1: RecipeTrade, trade2: RecipeTrade) =>
            trade2.roi - trade1.roi
        );

        return trades;
    }

    public async getTradesFromSalvageRecipes(
        recipes: Array<SalvageRecipe>,
    ): Promise<Array<SalvageTrade>> {
        let itemIds = recipes
            .flatMap(
                (recipe) =>
                    recipe.input
                        .map((item) => item.id)
                        .concat(recipe.output.map((item) => item.id)),
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
            const inputs: Array<TradeItem> = recipe.input.map((input) => {
                return {
                    item: items.find((i) => i.id === input.id) as Item,
                    price: prices.find((p) => p.id === input.id) as ItemPrice,
                    bltc: bltcs.find((b) => b.id === input.id) as ItemBltc,
                    quantity: input.quantity,
                };
            });
            const outputs: Array<TradeItem> = recipe.output.map((output) => {
                return {
                    item: items.find((i) => i.id === output.id) as Item,
                    price: prices.find((p) => p.id === output.id) as ItemPrice,
                    bltc: bltcs.find((b) => b.id === output.id) as ItemBltc,
                    quantity: output.quantity,
                };
            });
            outputs.sort((trade1, trade2) =>
                trade2.price.buys.unit_price * trade2.quantity -
                trade1.price.buys.unit_price * trade1.quantity
            );

            if (inputs.length === 0) {
                continue;
            }

            trades.push({
                id: recipe.id,
                recipe: recipe,
                input: inputs[0],
                output: outputs,
                ...this.getRecipeTradeData(inputs, outputs, recipe.cost, inputs[0].item, inputs[0].bltc, recipe),
            });
        }

        trades.sort((trade1: SalvageTrade, trade2: SalvageTrade) =>
            trade2.roi - trade1.roi
        );

        return trades;
    }
}
