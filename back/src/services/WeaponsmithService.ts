import { Recipe, RecipeType, SalvageRecipe } from '../../../shared/index.ts';

export default class WeaponsmithService {
    public getAll(): Array<Recipe> {
        return [
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
                // 71331-Oiled-Orichalcum-Dagger-Blade
                id: 71331,
                type: RecipeType.weaponsmith,
                output: [{ id: 71331, quantity: 1 }],
                input: [
                    // orichalcum ore
                    { id: 19701, quantity: 6 },
                    // 74090-Pile-of-Flax-Seeds
                    { id: 74090, quantity: 75 },
                    // 77256-Milling-Stone
                    { id: 77256, quantity: 25 },
                ],
                // milling basin
                cost: 56,
            },
            {
                // 76164-Oiled-Orichalcum-Hammer-Head
                id: 76164,
                type: RecipeType.weaponsmith,
                output: [{ id: 76164, quantity: 1 }],
                input: [
                    // orichalcum ore
                    { id: 19701, quantity: 6 },
                    // 74090-Pile-of-Flax-Seeds
                    { id: 74090, quantity: 75 },
                    // 77256-Milling-Stone
                    { id: 77256, quantity: 25 },
                ],
                // milling basin
                cost: 56,
            },
            {
                // 76084-Oiled-Orichalcum-Greatsword-Hilt
                id: 76084,
                type: RecipeType.weaponsmith,
                output: [{ id: 76084, quantity: 1 }],
                input: [
                    // orichalcum ore
                    { id: 19701, quantity: 6 },
                    // 74090-Pile-of-Flax-Seeds
                    { id: 74090, quantity: 75 },
                    // 77256-Milling-Stone
                    { id: 77256, quantity: 25 },
                ],
                // milling basin
                cost: 56,
            },
            {
                // 77064-Oiled-Orichalcum-Mace-Head
                id: 77064,
                type: RecipeType.weaponsmith,
                output: [{ id: 77064, quantity: 1 }],
                input: [
                    // orichalcum ore
                    { id: 19701, quantity: 6 },
                    // 74090-Pile-of-Flax-Seeds
                    { id: 74090, quantity: 75 },
                    // 77256-Milling-Stone
                    { id: 77256, quantity: 25 },
                ],
                // milling basin
                cost: 56,
            },
            {
                // 74825-Oiled-Ancient-Scepter-Core
                id: 74825,
                type: RecipeType.weaponsmith,
                output: [{ id: 74825, quantity: 1 }],
                input: [
                    // 19725-Ancient-Wood-Log
                    { id: 19725, quantity: 6 },
                    // 74090-Pile-of-Flax-Seeds
                    { id: 74090, quantity: 75 },
                    // 77256-Milling-Stone
                    { id: 77256, quantity: 25 },
                ],
                // milling basin
                cost: 56,
            },
            {
                // 75698-Oiled-Ancient-Staff-Head
                id: 75698,
                type: RecipeType.weaponsmith,
                output: [{ id: 75698, quantity: 1 }],
                input: [
                    // 19725-Ancient-Wood-Log
                    { id: 19725, quantity: 6 },
                    // 74090-Pile-of-Flax-Seeds
                    { id: 74090, quantity: 75 },
                    // 77256-Milling-Stone
                    { id: 77256, quantity: 25 },
                ],
                // milling basin
                cost: 56,
            },
            {
                // 15433-Berserkers-Pearl-Reaver
                id: 15433,
                type: RecipeType.weaponsmith,
                output: [{ id: 15433, quantity: 1 }],
                input: [
                    // 24295 Vial of Powerful Blood
                    { id: 24295, quantity: 5 },
                    // 19721-Glob-of-Ectoplasm
                    { id: 19721, quantity: 5 },
                    // orichalcum ore
                    { id: 19701, quantity: 36 },
                    // ancient wood log
                    { id: 19725, quantity: 33 },
                ],
                cost: 0,
            },
            {
                // 15272-Berserkers-Pearl-Carver
                id: 15272,
                type: RecipeType.weaponsmith,
                output: [{ id: 15272, quantity: 1 }],
                input: [
                    // 24295 Vial of Powerful Blood
                    { id: 24295, quantity: 5 },
                    // 19721-Glob-of-Ectoplasm
                    { id: 19721, quantity: 5 },
                    // orichalcum ore
                    { id: 19701, quantity: 40 },
                ],
                cost: 0,
            },
            {
                // 15314-Berserkers-Pearl-Sabre
                id: 15314,
                type: RecipeType.weaponsmith,
                output: [{ id: 15314, quantity: 1 }],
                input: [
                    // 24295 Vial of Powerful Blood
                    { id: 24295, quantity: 5 },
                    // 19721-Glob-of-Ectoplasm
                    { id: 19721, quantity: 5 },
                    // orichalcum ore
                    { id: 19701, quantity: 42 },
                ],
                cost: 0,
            },
            {
                // 9443-Superior-Sharpening-Stone
                id: 9443,
                type: RecipeType.artificier,
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
                type: RecipeType.artificier,
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
}
