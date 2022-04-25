import { Recipe, RecipeType } from "../../../shared";

export default class UtilityService {
    async getAll(): Promise<Array<Recipe>> {
        return [
            {
                // 77567-Tuning-Icicle
                id: 77567,
                type: RecipeType.artificier,
                output: [
                   {id: 77567, quantity: 5},
                ],
                input: [
                    // 24277-Pile-of-Crystalline-Dust
                    {id: 24277, quantity: 5},
                    // 77651-Candy-Cane
                    {id: 77651, quantity: 25},
                ],
            },
            {
                // 9476-Master-Tuning-Crystal
                id: 9476,
                type: RecipeType.artificier,
                output: [
                   {id: 9476, quantity: 5},
                ],
                input: [
                    // 24277-Pile-of-Crystalline-Dust
                    {id: 24277, quantity: 5},
                ],
            },
            {
                // 43449-Potent-Master-Tuning-Crystal
                id: 43449,
                type: RecipeType.artificier,
                output: [
                   {id: 43449, quantity: 5},
                ],
                input: [
                    // 24277-Pile-of-Crystalline-Dust
                    {id: 24277, quantity: 30},
                ],
            },
            {
                // 9443-Superior-Sharpening-Stone
                id: 9443,
                type: RecipeType.artificier,
                output: [
                   {id: 9443, quantity: 5},
                ],
                input: [
                    // 24277-Pile-of-Crystalline-Dust
                    {id: 24277, quantity: 3},
                    // 19685-Orichalcum-Ingot
                    {id: 19685, quantity: 1},
                ],
            },
            {
                // 43451-Potent-Superior-Sharpening-Stone
                id: 43451,
                type: RecipeType.artificier,
                output: [
                   {id: 43451, quantity: 5},
                ],
                input: [
                    // 24277-Pile-of-Crystalline-Dust
                    {id: 24277, quantity: 15 + 3},
                    // 19685-Orichalcum-Ingot
                    {id: 19685, quantity: 5 + 1},
                ],
            },
            {
                // 67528-Bountiful-Maintenance-Oil
                id: 67528,
                type: RecipeType.huntsman,
                output: [
                   {id: 67528, quantity: 5},
                ],
                input: [
                    // 24773-Platinum-Doubloon
                    {id: 24773, quantity: 1},
                    // 66650-Sheet-of-Ambrite
                    {id: 66650, quantity: 3},
                    // 12156-Jug-of-Water
                    {id: 12156, quantity: 20},
                ],
            },
            {
                // 9461-Master-Maintenance-Oil
                id: 9461,
                type: RecipeType.huntsman,
                output: [
                   {id: 9461, quantity: 5},
                ],
                input: [
                    // 24277-Pile-of-Crystalline-Dust
                    {id: 24277, quantity: 3},
                    // 12156-Jug-of-Water
                    {id: 12156, quantity: 20},
                ],
            },
            {
                // 77569-Tin-of-Fruitcake
                id: 77569,
                type: RecipeType.weaponsmith,
                output: [
                   {id: 77569, quantity: 5},
                ],
                input: [
                    // 24277-Pile-of-Crystalline-Dust
                    {id: 24277, quantity: 3},
                    // 19685-Orichalcum-Ingot
                    {id: 19685, quantity: 1},
                    // 77651-Candy-Cane
                    {id: 77651, quantity: 25},
                ],
            },
        ];
    }
}
