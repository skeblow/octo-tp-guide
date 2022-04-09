import { BasicTrade, RecipeType, SalvageRecipe, SalvageTrade } from "../../../shared";

export default class SalvageService {
    async getAll(): Promise<Array<SalvageRecipe>> {
        return [
            {
                // rich clump of ore
                id: 21695,
                type: RecipeType.salvage,
                input: [
                    {id: 21695, quantity: 1},
                ],
                output: [
                    // mithril ore
                    {id: 19700, quantity: 1.22},
                    // orichalcum ore
                    {id: 19701, quantity: 0.2},
                ],
                cost: 3,
            },
            {
                // valuable metal scrap
                id: 21683,
                type: RecipeType.salvage,
                input: [
                    {id: 21683, quantity: 1},
                ],
                output: [
                    // mithril ore
                    {id: 19700, quantity: 1.55},
                    // orichalcum ore
                    {id: 19701, quantity: 0.13},
                ],
                cost: 3,
            },
            {
                // jagged metal scrap
                id: 21680,
                type: RecipeType.salvage,
                input: [
                    {id: 21680, quantity: 1},
                ],
                output: [
                    // gold
                    {id: 19698, quantity: 0},
                    // iron
                    {id: 19699, quantity: 0},
                    // silver
                    {id: 19703, quantity: 0},
                ],
                cost: 3,
            },
            {
                // metal scrap
                id: 21681,
                type: RecipeType.salvage,
                input: [
                    {id: 21681, quantity: 1},
                ],
                output: [
                    // iron
                    {id: 19699, quantity: 0.19},
                    // platinum
                    {id: 19702, quantity: 1.39},
                    // gold
                    {id: 19698, quantity: 0.26},
                ],
                cost: 3,
            },
            {
                // unstable metal chunk
                id: 79079,
                type: RecipeType.salvage,
                input: [
                    {id: 79079, quantity: 1},
                ],
                output: [
                    // copper
                    {id: 19697, quantity: 0.17},
                    // iron
                    {id: 19699, quantity: 0.92},
                    // platinum
                    {id: 19702, quantity: 0.49},
                    // mithril ore
                    {id: 19700, quantity: 0.16},
                    // orichalcum ore
                    {id: 19701, quantity: 0.31},
                ],
                cost: 3,
            },
            {
                // salvageable hide
                id: 22331,
                type: RecipeType.salvage,
                input: [
                    {id: 22331, quantity: 1},
                ],
                output: [
                    // thick leather section
                    {id: 19729, quantity: 1.31},
                    // hardened leather section
                    {id: 19732, quantity: 0.08},
                ],
                cost: 3,
            },
            {
                // torn hide
                id: 21667,
                type: RecipeType.salvage,
                input: [
                    {id: 21667, quantity: 1},
                ],
                output: [
                    // coarse leather section
                    {id: 19730, quantity: 0},
                    // thin leather section
                    {id: 19728, quantity: 0},
                ],
                cost: 3,
            },
            {
                // bloodstone wrapped hide
                id: 80681,
                type: RecipeType.salvage,
                input: [
                    {id: 80681, quantity: 1},
                ],
                output: [
                    // rawhide leather section
                    {id: 19719, quantity: 0.04},
                    // thin leather section
                    {id: 19728, quantity: 0.04},
                    // coarse leather section
                    {id: 19730, quantity: 0.04},
                    // rugged leather section
                    {id: 19731, quantity: 0.04},
                    // thick leather section
                    {id: 19729, quantity: 0.44},
                    // hardened leather section
                    {id: 19732, quantity: 0.5},
                ],
                cost: 3,
            },
            {
                // unstable wrapped hide
                id: 79213,
                type: RecipeType.salvage,
                input: [
                    {id: 79213, quantity: 1},
                ],
                output: [
                    // rawhide leather section
                    {id: 19719, quantity: 0.18},
                    // thin leather section
                    {id: 19728, quantity: 0.45},
                    // coarse leather section
                    {id: 19730, quantity: 0.45},
                    // rugged leather section
                    {id: 19731, quantity: 0.49},
                    // thick leather section
                    {id: 19729, quantity: 0.16},
                    // hardened leather section
                    {id: 19732, quantity: 0.3},
                ],
                cost: 3,
            },
            {
                // hard leather strap
                id: 21689,
                type: RecipeType.salvage,
                input: [
                    {id: 21689, quantity: 1},
                ],
                output: [
                   // thick leather section
                   {id: 19729, quantity: 1.28},
                   // hardened leather section
                   {id: 19732, quantity: 0.08},
                ],
                cost: 3,
            },
            {
                // discarded garment
                id: 21675,
                type: RecipeType.salvage,
                input: [
                    {id: 21675, quantity: 1},
                ],
                output: [
                   // silk strap
                   {id: 19748, quantity: 1.622},
                   // gossamer strap
                   {id: 19745, quantity: 0.084},
                ],
                cost: 3,
            },
            {
                // ragged garment
                id: 21672,
                type: RecipeType.salvage,
                input: [
                    {id: 21672, quantity: 1},
                ],
                output: [
                   // wool strap
                   {id: 19739, quantity: 0},
                   // cotton strap
                   {id: 19741, quantity: 0},
                ],
                cost: 3,
            },
            {
                // worn garment
                id: 21671,
                type: RecipeType.salvage,
                input: [
                    {id: 21671, quantity: 1},
                ],
                output: [
                   // jute strap
                   {id: 19718, quantity: 0},
                   // wool strap
                   {id: 19739, quantity: 0},
                ],
                cost: 3,
            },
            {
                // rag
                id: 21666,
                type: RecipeType.salvage,
                input: [
                    {id: 21666, quantity: 1},
                ],
                output: [
                   // silk strap
                   {id: 19748, quantity: 1.62},
                   // gossamer strap
                   {id: 19745, quantity: 0.082},
                ],
                cost: 3,
            },
            {
                // unstable rag
                id: 79138,
                type: RecipeType.salvage,
                input: [
                    {id: 79138, quantity: 1},
                ],
                output: [
                   // jute strap
                   {id: 19718, quantity: 0.17},
                   // wool strap
                   {id: 19739, quantity: 0.49},
                   // cotton strap
                   {id: 19741, quantity: 0.43},
                   // linen strap
                   {id: 19743, quantity: 0.3},
                   // silk strap
                   {id: 19748, quantity: 0.17},
                   // gossamer strap
                   {id: 19745, quantity: 0.15},
                ],
                cost: 3,
            },
            {
                // lump of raw ambrite
                id: 66670,
                type: RecipeType.salvage,
                input: [
                    {id: 66670, quantity: 1},
                ],
                output: [
                   // piece of ambrite
                   {id: 66637, quantity: 2},
                ],
                cost: 3,
            },
        ];
    }

    getSalvageSell(trade: SalvageTrade): number {
        return trade.output.reduce((total: number, item: BasicTrade) => total + item.price.sells.unit_price * item.quantity, 0);
    }

    getSalvageProfit(trade: SalvageTrade): number {
        const sellPrice = this.getSalvageSell(trade);
        const buyPrice = trade.input.price.buys.unit_price + trade.recipe.cost;
        
        return Math.round( 0.85 * sellPrice - buyPrice );
    }

    getSalvageRoi(trade: SalvageTrade): number {
        const buyPrice = trade.input.price.buys.unit_price + trade.recipe.cost;
        const profit = this.getSalvageProfit(trade);

        return Math.round( profit / buyPrice * 100 );
    }
}
