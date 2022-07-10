import { Recipe, RecipeType } from "../../../shared/index.ts";
import RecipeService from "./RecipeService.ts";

export default class ArtificierService {
    constructor (
        private recipeService: RecipeService,
    ) {
    }

    public getAll(): Array<Recipe> {
        return [
            // // 74825-Oiled-Ancient-Scepter-Core
            // this.createOiledAncientRecipe({
            //     output: 74825,
            //     ancientLog: 6,
            // }),
            // // 75698-Oiled-Ancient-Staff-Head
            // this.createOiledAncientRecipe({
            //     output: 75698,
            //     ancientLog: 6,
            // }),

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
            // // 73404-Minstrels-Pearl-Rod
            // this.recipeService.createMinstrelPearlRecipe({
            //     output: 73404,
            //     orichalcumOre: 30,
            //     ancientWood: 45,
            // }),

            {
                // 9473-Quality-Tuning-Crystal
                id: 9473,
                type: RecipeType.artificier,
                output: [
                    { id: 9473, quantity: 5 },
                ],
                input: [
                   // 24276-Pile-of-Incandescent-Dust
                   { id: 24276, quantity: 6 },
                ],
            },

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
            {
                // 8865-Potent-Potion-of-Centaur-Slaying
                id: 8865,
                type: RecipeType.artificier,
                output: [
                    { id: 8865, quantity: 3 },
                ],
                input: [
                    // 24276-Pile-of-Incandescent-Dust
                    { id: 24276, quantity: 1 },
                    // thick leather section
                    { id: 19729, quantity: 1 },
                    // 12134-Carrot
                    { id: 12134, quantity: 1 },
                    // 12156-Jug-of-Water
                    { id: 12156, quantity: 1 },
                ],
            },
            {
                // 8869-Potent-Potion-of-Destroyer-Slaying
                id: 8869,
                type: RecipeType.artificier,
                output: [
                    { id: 8869, quantity: 3 },
                ],
                input: [
                    // 24276-Pile-of-Incandescent-Dust
                    { id: 24276, quantity: 1 },
                    // 24324-Destroyer-Core
                    { id: 24324, quantity: 1 },
                    // 19750-Lump-of-Coal
                    { id: 19750, quantity: 1 },
                    // 12156-Jug-of-Water
                    { id: 12156, quantity: 1 },
                ],
            },
            {
                // 8870-Potent-Potion-of-Elemental-Slaying
                id: 8870,
                type: RecipeType.artificier,
                output: [
                    { id: 8870, quantity: 3 },
                ],
                input: [
                    // 24276-Pile-of-Incandescent-Dust
                    { id: 24276, quantity: 1 },
                    // 24474-Ruby-Crystal
                    { id: 24474, quantity: 1 },
                    // 24475-Sapphire-Crystal
                    { id: 24475, quantity: 1 },
                    // 12156-Jug-of-Water
                    { id: 12156, quantity: 1 },
                ],
            },
            {
                // 8874-Potent-Potion-of-Ice-Brood-Slaying
                id: 8874,
                type: RecipeType.artificier,
                output: [
                    { id: 8874, quantity: 3 },
                ],
                input: [
                    // 24276-Pile-of-Incandescent-Dust
                    { id: 24276, quantity: 1 },
                    // 24288-Large-Scale
                    { id: 24288, quantity: 1 },
                    // 24339-Corrupted-Core
                    { id: 24339, quantity: 1 },
                    // 12156-Jug-of-Water
                    { id: 12156, quantity: 1 },
                ],
            },
            {
                // 8867-Potent-Potion-of-Nightmare-Court-Slaying
                id: 8867,
                type: RecipeType.artificier,
                output: [
                    { id: 8867, quantity: 3 },
                ],
                input: [
                    // 12238-Head-of-Lettuce
                    { id: 12238, quantity: 1 },
                    // 24282-Potent-Venom-Sac
                    { id: 24282, quantity: 1 },
                    // 12241-Spinach-Leaf
                    { id: 12241, quantity: 1 },
                    // 12156-Jug-of-Water
                    { id: 12156, quantity: 1 },
                ],
            },
            {
                // 8873-Potent-Potion-of-Ogre-Slaying
                id: 8873,
                type: RecipeType.artificier,
                output: [
                    { id: 8873, quantity: 3 },
                ],
                input: [
                    // 24276-Pile-of-Incandescent-Dust
                    { id: 24276, quantity: 1 },
                    // thick leather section
                    { id: 19729, quantity: 1 },
                    // 12243-Sage-Leaf
                    { id: 12243, quantity: 1 },
                    // 12156-Jug-of-Water
                    { id: 12156, quantity: 1 },
                ],
            },
            {
                // 8868-Potent-Potion-of-Sons-of-Svanir-Slaying
                id: 8868,
                type: RecipeType.artificier,
                output: [
                    { id: 8868, quantity: 3 },
                ],
                input: [
                    // 24276-Pile-of-Incandescent-Dust
                    { id: 24276, quantity: 1 },
                    // 24350-Large-Claw
                    { id: 24350, quantity: 1 },
                    // 24299-Intricate-Totem
                    { id: 24299, quantity: 1 },
                    // 12156-Jug-of-Water
                    { id: 12156, quantity: 1 },
                ],
            },
            {
                // 8878-Potent-Potion-of-Undead-Slaying
                id: 8878,
                type: RecipeType.artificier,
                output: [
                    { id: 8878, quantity: 3 },
                ],
                input: [
                    // 24276-Pile-of-Incandescent-Dust
                    { id: 24276, quantity: 1 },
                    // 24341-Large-Bone
                    { id: 24341, quantity: 1 },
                    // 24334-Pile-of-Vile-Essence
                    { id: 24334, quantity: 1 },
                    // 12156-Jug-of-Water
                    { id: 12156, quantity: 1 },
                ],
            },
            {
                // 8866-Potent-Potion-of-Outlaw-Slaying
                id: 8866,
                type: RecipeType.artificier,
                output: [
                    { id: 8866, quantity: 3 },
                ],
                input: [
                    // 24276-Pile-of-Incandescent-Dust
                    { id: 24276, quantity: 1 },
                    // 24294-Vial-of-Potent-Blood
                    { id: 24294, quantity: 1 },
                    // 24359-Slab-of-Red-Meat
                    { id: 24359, quantity: 1 },
                    // 12156-Jug-of-Water
                    { id: 12156, quantity: 1 },
                ],
            },
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
