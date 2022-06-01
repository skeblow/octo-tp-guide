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

            // 71768-Vipers-Pearl-Rod
            this.recipeService.createViperPearlRecipe({
                output: 71768,
                orichalcumOre: 30,
                ancientWood: 30 + 15,
            }),
            // 72064-Vipers-Pearl-Quarterstaff
            this.recipeService.createViperPearlRecipe({
                output: 72064,
                orichalcumOre: 30,
                ancientWood: 30 + 18,
            }),
            // 73000-Vipers-Pearl-Conch
            this.recipeService.createViperPearlRecipe({
                output: 73000,
                orichalcumOre: 30,
                ancientWood: 30 + 15,
            }),

            // 73265-Minstrels-Pearl-Quarterstaff
            this.recipeService.createMinstrelPearlRecipe({
                output: 73265,
                orichalcumOre: 30,
                ancientWood: 48,
            }),
            // 73404-Minstrels-Pearl-Rod
            this.recipeService.createMinstrelPearlRecipe({
                output: 73404,
                orichalcumOre: 30,
                ancientWood: 45,
            }),

            // {
            //     // 9476-Master-Tuning-Crystal
            //     id: 9476,
            //     type: RecipeType.artificier,
            //     output: [
            //         { id: 9476, quantity: 5 },
            //     ],
            //     input: [
            //         // 24277-Pile-of-Crystalline-Dust
            //         { id: 24277, quantity: 5 },
            //     ],
            // },
            // {
            //     // 43449-Potent-Master-Tuning-Crystal
            //     id: 43449,
            //     type: RecipeType.artificier,
            //     output: [
            //         { id: 43449, quantity: 5 },
            //     ],
            //     input: [
            //         // 24277-Pile-of-Crystalline-Dust
            //         { id: 24277, quantity: 30 },
            //     ],
            // },
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
