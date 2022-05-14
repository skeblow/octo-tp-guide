import { Recipe, RecipeType } from '../../../shared/index.ts';

export default class JewelcraftingService {
    public getAll(): Array<Recipe> {
        return [
            // 72437-Freshwater-Pearl-Orichalcum-Ring
            this.createFreshwaterPearlRecipe({
                output: 72437,
                orichalcumOre: 20 + 4 + 6,
            }),
            // 72391-Freshwater-Pearl-Orichalcum-Earring
            this.createFreshwaterPearlRecipe({
                output: 72391,
                orichalcumOre: 20 + 4 + 4,
            }),
            // 71686-Freshwater-Pearl-Orichalcum-Amulet
            this.createFreshwaterPearlRecipe({
                output: 71686,
                orichalcumOre: 20 + 4 + 8,
            }),
            // 13459-Ruby-Orichalcum-Earring
            this.createRubyOrichalcumRecipe({
                output: 13459,
                orichalcumOre: 14 * 2,
            }),
            // 13417-Ruby-Orichalcum-Ring
            this.createRubyOrichalcumRecipe({
                output: 13417,
                orichalcumOre: 15 * 2,
            }),
            // 13501-Ruby-Orichalcum-Amulet
            this.createRubyOrichalcumRecipe({
                output: 13501,
                orichalcumOre: 16 * 2,
            }),
        ];
    }

    private createFreshwaterPearlRecipe(options: {
        output: number,
        orichalcumOre: number,
    }) {
        return {
            id: options.output,
            type: RecipeType.jewelcrafting,
            output: [
                { id: options.output, quantity: 1 },
            ],
            input: [
                // 76179-Freshwater-Pearl
                { id: 76179, quantity: 5 },
                // 19721-Glob-of-Ectoplasm
                { id: 19721, quantity: 5 },
                // orichalcum ore
                { id: 19701, quantity: options.orichalcumOre },
            ],
        };
    }

    private createRubyOrichalcumRecipe(options: {
        output: number,
        orichalcumOre: number,
    }) {
        return {
            id: options.output,
            type: RecipeType.jewelcrafting,
            output: [
                { id: options.output, quantity: 1 },
            ],
            input: [
                // orichalcum ore
                { id: 19701, quantity: options.orichalcumOre },
                // 19721-Glob-of-Ectoplasm
                { id: 19721, quantity: 5 },
                // 24474-Ruby-Crystal
                { id: 24474, quantity: 10 },
                // 24276-Pile-of-Incandescent-Dust
                { id: 24276, quantity: 25 },
            ],
        };
    }
}
