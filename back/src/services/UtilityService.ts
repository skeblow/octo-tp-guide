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
            }
        ];
    }
}
