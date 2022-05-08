import { Recipe, RecipeType } from "../../../shared/index.ts";

export default class ArtificierService {
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
                // 77256-Milling-Stone
                { id: 77256, quantity: 25 },
            ],
            // milling basin
            cost: 56,
        };
    }
}
