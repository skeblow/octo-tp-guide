import { Recipe, RecipeType } from '../../../shared/index.ts';
import RecipeService from "./RecipeService.ts";

export default class WeaponsmithService {
    constructor (
        private recipeService: RecipeService,
    ) {
    }

    public getAll(): Array<Recipe> {
        return [
            // 15433-Berserkers-Pearl-Reaver
            this.recipeService.createBerserkPearlRecipe({
                output: 15433,
                orichalcumOre: 30 + 6,
                ancientWood: 30 + 6,
            }),
            // 15272-Berserkers-Pearl-Carver
            this.recipeService.createBerserkPearlRecipe({
                output: 15272,
                orichalcumOre: 30 + 10,
                ancientWood: 30,
            }),
            // 15314-Berserkers-Pearl-Sabre
            this.recipeService.createBerserkPearlRecipe({
                output: 15314,
                orichalcumOre: 30 + 12,
                ancientWood: 30,
            }),
             // 15356-Berserkers-Pearl-Bludgeoner
             this.recipeService.createBerserkPearlRecipe({
                output: 15356,
                orichalcumOre: 30 + 6,
                ancientWood: 30 + 6,
            }),

            // 74471-Marauder-Pearl-Sabre
            this.recipeService.createMarauderPearlRecipe({
               output: 74471,
               orichalcumOre: 30 + 12,
               ancientWood: 30,
            }),
            // 75226-Marauder-Pearl-Reaver
            this.recipeService.createMarauderPearlRecipe({
                output: 75226,
                orichalcumOre: 30 + 6,
                ancientWood: 30 + 6,
            }),
            // 74062-Marauder-Pearl-Carver
            this.recipeService.createMarauderPearlRecipe({
                output: 74062,
                orichalcumOre: 30 + 10,
                ancientWood: 30,
            }),
            // 77012-Marauder-Pearl-Broadsword
            this.recipeService.createMarauderPearlRecipe({
                output: 77012,
                orichalcumOre: 30 + 12,
                ancientWood: 30,
            }),
            // 71331-Oiled-Orichalcum-Dagger-Blade
            this.createOiledOrichalcumRecipe({
                output: 71331,
                orichalcumOre: 6,
            }),
            // 76164-Oiled-Orichalcum-Hammer-Head
            this.createOiledOrichalcumRecipe({
                output: 76164,
                orichalcumOre: 6,
            }),
            // 76084-Oiled-Orichalcum-Hammer-Head
            this.createOiledOrichalcumRecipe({
                output: 76084,
                orichalcumOre: 6,
            }),
            // 77064-Oiled-Orichalcum-Mace-Head
            this.createOiledOrichalcumRecipe({
                output: 77064,
                orichalcumOre: 6,
            }),
            // 73959-Vipers-Pearl-Carver
            this.recipeService.createViperPearlRecipe({
                output: 73959,
                orichalcumOre: 30 + 10,
                ancientWood: 30,
            }),
            // 76641-Vipers-Pearl-Bludgeoner
            this.recipeService.createViperPearlRecipe({
                output: 76641,
                orichalcumOre: 30 + 6,
                ancientWood: 30 + 6,
            }),
            // 74122-Vipers-Pearl-Reaver
            this.recipeService.createViperPearlRecipe({
                output: 74122,
                orichalcumOre: 30 + 6,
                ancientWood: 30 + 6,
            }),
            {
                // 9440-Hardened-Sharpening-Stone
                id: 9440,
                type: RecipeType.artificier,
                output: [
                    { id: 9440, quantity: 5 },
                ],
                input: [
                    // 24276-Pile-of-Incandescent-Dust
                    { id: 24276, quantity: 3 },
                    // 19684-Mithril-Ingot
                    { id: 19684, quantity: 3 },
                ],
            },
            {
                // 9443-Superior-Sharpening-Stone
                id: 9443,
                type: RecipeType.weaponsmith,
                output: [
                    { id: 9443, quantity: 5 },
                ],
                input: [
                    // 24277-Pile-of-Crystalline-Dust
                    { id: 24277, quantity: 3 },
                    // 19685-Orichalcum-Ingot
                    { id: 19685, quantity: 1 },
                ],
            },
            {
                // 43451-Potent-Superior-Sharpening-Stone
                id: 43451,
                type: RecipeType.weaponsmith,
                output: [
                    { id: 43451, quantity: 5 },
                ],
                input: [
                    // 24277-Pile-of-Crystalline-Dust
                    { id: 24277, quantity: 15 + 3 },
                    // 19685-Orichalcum-Ingot
                    { id: 19685, quantity: 5 + 1 },
                ],
            },
        ];
    }

    private createOiledOrichalcumRecipe(options: {
        output: number,
        orichalcumOre: number,
    }): Recipe {
        return {
            id: options.output,
            type: RecipeType.weaponsmith,
            output: [{ id: options.output, quantity: 1 }],
            input: [
                // orichalcum ore
                { id: 19701, quantity: options.orichalcumOre },
                // 74090-Pile-of-Flax-Seeds
                { id: 74090, quantity: 75 },
            ],
            // milling basin + milling stone
            cost: 56 + 25 * 11,
        };
    }
}
