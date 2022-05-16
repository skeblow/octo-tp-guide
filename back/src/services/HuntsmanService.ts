import { Recipe, RecipeType } from "../../../shared/index.ts";
import RecipeService from "./RecipeService.ts";

export default class HuntsmanService {
    constructor (
        private recipeService: RecipeService,
    ) {
    }

    public getAll(): Array<Recipe> {
        return [
            // 14493-Berserkers-Pearl-Siren
            this.recipeService.createBerserkPearlRecipe({
                output: 14493,
                orichalcumOre: 30 + 4,
                ancientWood: 30 + 6,
            }),
            // 14577-Berserkers-Pearl-Handcannon
            this.recipeService.createBerserkPearlRecipe({
                output: 14577,
                orichalcumOre: 30 + 6,
                ancientWood: 30 + 6,
            }),
            // 14654-Berserkers-Pearl-Blunderbuss
            this.recipeService.createBerserkPearlRecipe({
                output: 14654,
                orichalcumOre: 36,
                ancientWood: 39,
            }),

            // 74371-Marauder-Pearl-Handcannon
            this.recipeService.createMarauderPearlRecipe({
                output: 74371,
                orichalcumOre: 30 + 6,
                ancientWood: 30 + 6,
            }),

            // 76756-Vipers-Pearl-Handcannon
            this.recipeService.createViperPearlRecipe({
                output: 76756,
                orichalcumOre: 30 + 6,
                ancientWood: 30 + 6,
            }),
            // 75575-Vipers-Pearl-Siren
            this.recipeService.createViperPearlRecipe({
                output: 75575,
                orichalcumOre: 30 + 4,
                ancientWood: 30 + 6,
            }),
            // 71548-Vipers-Pearl-Brazier
            this.recipeService.createViperPearlRecipe({
                output: 71548,
                orichalcumOre: 30 + 4,
                ancientWood: 30 + 6,
            }),
            // 70581-Vipers-Pearl-Needler
            this.recipeService.createViperPearlRecipe({
                 output: 70581,
                 // fake +33 ore, ~eq value as 3 hardened leathers
                 orichalcumOre: 30 + 33,
                 ancientWood: 42,
            }),

            {
                // 67528-Bountiful-Maintenance-Oil
                id: 67528,
                type: RecipeType.huntsman,
                output: [
                    { id: 67528, quantity: 5 },
                ],
                input: [
                    // 24773-Platinum-Doubloon
                    { id: 24773, quantity: 1 },
                    // 66650-Sheet-of-Ambrite
                    { id: 66650, quantity: 3 },
                    // 12156-Jug-of-Water
                    { id: 12156, quantity: 20 },
                ],
            },
            {
                // 9461-Master-Maintenance-Oil
                id: 9461,
                type: RecipeType.huntsman,
                output: [
                    { id: 9461, quantity: 5 },
                ],
                input: [
                    // 24277-Pile-of-Crystalline-Dust
                    { id: 24277, quantity: 3 },
                    // 12156-Jug-of-Water
                    { id: 12156, quantity: 20 },
                ],
            },
        ];
    }
}
