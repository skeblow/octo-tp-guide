import { Recipe, RecipeType } from "../../../shared/index.ts";

export default class RecipeService {
    public createBerserkPearlRecipe(options: {
        output: number,
        orichalcumOre: number,
        ancientWood: number,
    }): Recipe {
        return {
            id: options.output,
            type: RecipeType.weaponsmith,
            output: [{ id: options.output, quantity: 1 }],
            input: [
                // 24295 Vial of Powerful Blood
                { id: 24295, quantity: 5 },
                // 19721-Glob-of-Ectoplasm
                { id: 19721, quantity: 5 },
                // orichalcum ore
                { id: 19701, quantity: options.orichalcumOre },
                // 19725-Ancient-Wood-Log
                { id: 19725, quantity: options.ancientWood },
            ],
            cost: 0,
        };
    }

    public createMarauderPearlRecipe(options: {
        output: number,
        orichalcumOre: number,
        ancientWood: number,
    }): Recipe {
        return {
            id: options.output,
            type: RecipeType.weaponsmith,
            output: [{ id: options.output, quantity: 1 }],
            input: [
                // 75654-Ebony-Orb
                { id: 75654, quantity: 3 },
                // 19721-Glob-of-Ectoplasm
                { id: 19721, quantity: 5 },
                // orichalcum ore
                { id: 19701, quantity: options.orichalcumOre },
                // 19725-Ancient-Wood-Log
                { id: 19725, quantity: options.ancientWood },
            ],
            // barbed thorns
            cost: 30 * 16,
        };
    }

    public createViperPearlRecipe(options: {
        output: number,
        orichalcumOre: number,
        ancientWood: number,
    }): Recipe {
        return {
            id: options.output,
            type: RecipeType.weaponsmith,
            output: [{ id: options.output, quantity: 1 }],
            input: [
                // 74090-Pile-of-Flax-Seeds
                { id: 74090, quantity: 150 },
                // 76491-Black-Diamond
                { id: 76491, quantity: 3 },
                // 19721-Glob-of-Ectoplasm
                { id: 19721, quantity: 5 },
                // orichalcum ore
                { id: 19701, quantity: options.orichalcumOre },
                // 19725-Ancient-Wood-Log
                { id: 19725, quantity: options.ancientWood },
            ],
            // milling basin + milling stone + leaf fosil
            cost: 5.6 * 20 + 16 * 11 + 19 * 30,
        };
    }
}
