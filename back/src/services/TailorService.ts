import { Recipe, RecipeType } from "../../../shared/index.ts";

export default class TailorService {
    public getAll(): Array<Recipe> {
        return [
            // 72602-Marauder-Exalted-Coat
            this.createMarauderExaltedRecipe({
                output: 72602,
                gossamerScrap: 18,
                hardenedSection: 33,
            }),
            // 73643-Marauder-Exalted-Pants
            this.createMarauderExaltedRecipe({
                output: 73643,
                gossamerScrap: 18,
                hardenedSection: 30,
            }),
            // 75971-Marauder-Exalted-Gloves
            this.createMarauderExaltedRecipe({
                output: 75971,
                gossamerScrap: 12,
                hardenedSection: 33,
            }),
            // 73043-Marauder-Exalted-Mantle
            this.createMarauderExaltedRecipe({
                output: 73043,
                gossamerScrap: 12,
                hardenedSection: 33,
            }),
            // 74879-Marauder-Exalted-Boots
            this.createMarauderExaltedRecipe({
                output: 74879,
                gossamerScrap: 12,
                hardenedSection: 36,
            }),
            // 71494-Marauder-Exalted-Masque
            this.createMarauderExaltedRecipe({
                output: 71494,
                gossamerScrap: 12,
                hardenedSection: 33,
            }),

            // 71075-Vipers-Exalted-Pants
            this.createViperExaltedRecipe({
                 output: 71075,
                 gossamerScrap: 18,
                 hardenedSection: 30,
            }),
            // 74671-Vipers-Exalted-Gloves
            this.createViperExaltedRecipe({
                output: 74671,
                gossamerScrap: 12,
                hardenedSection: 33,
            }),
            // 74101-Vipers-Exalted-Coat
            this.createViperExaltedRecipe({
                output: 74101,
                gossamerScrap: 18,
                hardenedSection: 33,
            }),
            // 71794-Vipers-Exalted-Masque
            this.createViperExaltedRecipe({
                output: 71794,
                gossamerScrap: 12,
                hardenedSection: 33,
            }),
            // 75779-Vipers-Exalted-Boots
            this.createViperExaltedRecipe({
                output: 75779,
                gossamerScrap: 12,
                hardenedSection: 36,
            }),
            // 71073-Vipers-Exalted-Mantle
            this.createViperExaltedRecipe({
                output: 71073,
                gossamerScrap: 12,
                hardenedSection: 33,
            }),
        ];
    }

    private createMarauderExaltedRecipe(options: {
        output: number,
        gossamerScrap: number,
        hardenedSection: number,
    }): Recipe {
        return {
            id: options.output,
            type: RecipeType.tailoring,
            output: [
                { id: options.output, quantity: 1 },
            ],
            input: [
                // 75654-Ebony-Orb
                { id: 75654, quantity: 3 },
                // 19721-Glob-of-Ectoplasm
                { id: 19721, quantity: 5 },
                // gossamer scrap
                { id: 19745, quantity: 12 },
                // hardened leather section
                { id: 19732, quantity: 33 },
            ],
            // barbed thorn + spools
            cost: 30 * 16 + 2.6 * 6.4,
        };
    }

    private createViperExaltedRecipe(options: {
        output: number,
        gossamerScrap: number,
        hardenedSection: number,
    }): Recipe {
        return {
            id: options.output,
            type: RecipeType.tailoring,
            output: [
                { id: options.output, quantity: 1 },
            ],
            input: [
                // 74090-Pile-of-Flax-Seeds
                { id: 74090, quantity: 150 },
                // hardened leather section
                { id: 19732, quantity: options.hardenedSection },
                // 76491-Black-Diamond
                { id: 76491, quantity: 3 },
                // 19721-Glob-of-Ectoplasm
                { id: 19721, quantity: 5 },
                // gossamer scrap
                { id: 19745, quantity: options.gossamerScrap },
                
            ],
            // spool + leaf fossil + milling basin + milling stone
            cost: 2.8 * 6.4 + 30 * 19 + 10 * 56 + 50 * 11,
        };
    }
}
1