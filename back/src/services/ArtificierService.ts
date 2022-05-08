import { Recipe, RecipeType } from "../../../shared/index.ts";
import RecipeService from "./RecipeService.ts";

export default class ArtificierService {
    constructor (
        private recipeService: RecipeService,
    ) {
    }

    public getAll(): Array<Recipe> {
        return [
            // 74825-Oiled-Ancient-Scepter-Core
            this.createOiledAncientRecipe({
                output: 74825,
                ancientLog: 6,
            }),
            // 75698-Oiled-Ancient-Staff-Head
            this.createOiledAncientRecipe({
                output: 75698,
                ancientLog: 6,
            }),

            // 76286-Marauder-Pearl-Quarterstaff
            this.recipeService.createMarauderPearlRecipe({
                output: 76286,
                orichalcumOre: 30,
                ancientWood: 30 + 18,
            }),
            // 72740-Marauder-Pearl-Rod
            this.recipeService.createMarauderPearlRecipe({
                output: 72740,
                orichalcumOre: 30,
                ancientWood: 30 + 15,
            }),
            // 76109-Marauder-Pearl-Conch
            this.recipeService.createMarauderPearlRecipe({
                output: 76109,
                orichalcumOre: 30,
                ancientWood: 30 + 15,
            }),
        ];
    }

    private createOiledAncientRecipe(options: {
        output: number,
        ancientLog: number,
    }): Recipe {
        return {
            id: options.output,
            type: RecipeType.weaponsmith,
            output: [{ id: options.output, quantity: 1 }],
            input: [
                // 19725-Ancient-Wood-Log
                { id: 19725, quantity: options.ancientLog },
                // 74090-Pile-of-Flax-Seeds
                { id: 74090, quantity: 75 },
            ],
            // milling basin + milling stone
            cost: 56 + 25 * 11,
        };
    }
}
