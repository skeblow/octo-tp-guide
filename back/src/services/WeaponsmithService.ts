import { Recipe, RecipeType, SalvageRecipe } from "../../../shared";

export default class WeaponsmithService {
    async getAll(): Promise<Array<Recipe>> {
        return [
            {
                // 71331-Oiled-Orichalcum-Dagger-Blade
                id: 71331,
                type: RecipeType.weaponsmith,
                output: [{id: 71331, quantity: 1}],
                input: [
                    // orichalcum ore
                    {id: 19701, quantity: 6},
                    // 74090-Pile-of-Flax-Seeds
                    {id: 74090, quantity: 75},
                    // 77256-Milling-Stone
                    {id: 77256, quantity: 25},
                ],
                // milling basin
                cost: 56,
            },
            {
                // 76164-Oiled-Orichalcum-Hammer-Head
                id: 76164,
                type: RecipeType.weaponsmith,
                output: [{id: 76164, quantity: 1}],
                input: [
                    // orichalcum ore
                    {id: 19701, quantity: 6},
                    // 74090-Pile-of-Flax-Seeds
                    {id: 74090, quantity: 75},
                    // 77256-Milling-Stone
                    {id: 77256, quantity: 25},
                ],
                // milling basin
                cost: 56,
            },
            {
                // 76084-Oiled-Orichalcum-Greatsword-Hilt
                id: 76084,
                type: RecipeType.weaponsmith,
                output: [{id: 76084, quantity: 1}],
                input: [
                    // orichalcum ore
                    {id: 19701, quantity: 6},
                    // 74090-Pile-of-Flax-Seeds
                    {id: 74090, quantity: 75},
                    // 77256-Milling-Stone
                    {id: 77256, quantity: 25},
                ],
                // milling basin
                cost: 56,
            },
            {
                // 77064-Oiled-Orichalcum-Mace-Head
                id: 77064,
                type: RecipeType.weaponsmith,
                output: [{id: 77064, quantity: 1}],
                input: [
                    // orichalcum ore
                    {id: 19701, quantity: 6},
                    // 74090-Pile-of-Flax-Seeds
                    {id: 74090, quantity: 75},
                    // 77256-Milling-Stone
                    {id: 77256, quantity: 25},
                ],
                // milling basin
                cost: 56,
            },
            {
                // 74825-Oiled-Ancient-Scepter-Core
                id: 74825,
                type: RecipeType.weaponsmith,
                output: [{id: 74825, quantity: 1}],
                input: [
                    // 19725-Ancient-Wood-Log
                    {id: 19725, quantity: 6},
                    // 74090-Pile-of-Flax-Seeds
                    {id: 74090, quantity: 75},
                    // 77256-Milling-Stone
                    {id: 77256, quantity: 25},
                ],
                // milling basin
                cost: 56,
            },
        ];
    }
}