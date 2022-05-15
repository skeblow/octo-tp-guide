import { Recipe, RecipeType } from "../../../shared/index.ts";

export default class ArmorsmithService {
    public getAll(): Array<Recipe> {
        return [
            // 77178	Marauder Draconic Boots
            this.createMarauderDraconicRecipe({
                output: 77178,
                orichalcumOre: 4,
                gossamerScrap: 10,
            }),
            // 75437	Marauder Draconic Coat
            this.createMarauderDraconicRecipe({
                output: 75437,
                orichalcumOre: 10,
                gossamerScrap: 10,
            }),
            // 72933	Marauder Draconic Gauntlets
            this.createMarauderDraconicRecipe({
                output: 72933,
                orichalcumOre: 4,
                gossamerScrap: 10,
            }),
            // 73104	Marauder Draconic Helm
            this.createMarauderDraconicRecipe({
                output: 73104,
                orichalcumOre: 2,
                gossamerScrap: 12,
            }),
            // 72262	Marauder Draconic Legs
            this.createMarauderDraconicRecipe({
                output: 72262,
                orichalcumOre: 8,
                gossamerScrap: 10,
            }),
            // 76937	Marauder Draconic Pauldrons
            this.createMarauderDraconicRecipe({
                output: 76937,
                orichalcumOre: 4,
                gossamerScrap: 10,
            }),
        ];
    }

    private createMarauderDraconicRecipe(options: {
        output: number,
        gossamerScrap: number,
        orichalcumOre: number,
    }): Recipe {
        return {
            id: options.output,
            type: RecipeType.armorsmith,
            output: [
                { id: options.output, quantity: 1 },
            ],
            input: [
                // hardened leather section
                { id: 19732, quantity: 30 },
                // 19721-Glob-of-Ectoplasm
                { id: 19721, quantity: 5 },
                // 75654-Ebony-Orb
                { id: 75654, quantity: 3 },
                // gossamer scrap
                { id: 19745, quantity: options.gossamerScrap },
                // orichalcum ore
                { id: 19701, quantity: options.orichalcumOre },
            ],
            // barbed thorn + spools
            cost: 30 * 16 + 2.6 * 6.4,
        };
    }
}