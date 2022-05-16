import { Recipe } from "../../../shared/index.ts";
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
        ];
    }
}
