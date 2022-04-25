import { Recipe, RecipeType } from "../../../shared";

export default class JewelcraftingService {
    public getAll(): Array<Recipe> {
        return [
            {
                // 72391-Freshwater-Pearl-Orichalcum-Earring
                id: 72391,
                type: RecipeType.jewelcrafting,
                output: [
                   {id: 72391, quantity: 1},
                ],
                input: [
                    // 76179-Freshwater-Pearl
                    {id: 76179, quantity: 5},
                    // 19721-Glob-of-Ectoplasm
                    {id: 19721, quantity: 5},
                    // orichalcum ore
                    {id: 19701, quantity: 28},
                ],
            },
            {
                // 72437-Freshwater-Pearl-Orichalcum-Ring
                id: 72437,
                type: RecipeType.jewelcrafting,
                output: [
                   {id: 72437, quantity: 1},
                ],
                input: [
                    // 76179-Freshwater-Pearl
                    {id: 76179, quantity: 5},
                    // 19721-Glob-of-Ectoplasm
                    {id: 19721, quantity: 5},
                    // orichalcum ore
                    {id: 19701, quantity: 30},
                ],
            },
            {
                // 71686-Freshwater-Pearl-Orichalcum-Amulet
                id: 71686,
                type: RecipeType.jewelcrafting,
                output: [
                   {id: 71686, quantity: 1},
                ],
                input: [
                    // 76179-Freshwater-Pearl
                    {id: 76179, quantity: 5},
                    // 19721-Glob-of-Ectoplasm
                    {id: 19721, quantity: 5},
                    // orichalcum ore
                    {id: 19701, quantity: 32},
                ],
            },
        ];
    }
}
