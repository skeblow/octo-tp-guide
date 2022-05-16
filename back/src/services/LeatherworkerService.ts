import { Recipe, RecipeType } from "../../../shared/index.ts";

export default class LeatherworkerService {
    public getAll(): Array<Recipe> {
        return [
            // 70484 Marauder Emblazoned Boots
            this.createMarauderEmblazonedRecipe({
                output: 70484,
                hardenedSection: 42,
                gossamerScrap: 8,
            }),
            // 74201 Marauder Emblazoned Coat
            this.createMarauderEmblazonedRecipe({
                output: 74201,
                hardenedSection: 45,
                gossamerScrap: 10,
            }),
            // 70575 Marauder Emblazoned Gloves
            this.createMarauderEmblazonedRecipe({
                output: 70575,
                hardenedSection: 36,
                gossamerScrap: 10,
            }),
            // 71962 Marauder Emblazoned Helm
            this.createMarauderEmblazonedRecipe({
                output: 71962,
                hardenedSection: 33,
                gossamerScrap: 12,
            }),
            // 75616 Marauder Emblazoned Pants
            this.createMarauderEmblazonedRecipe({
                output: 75616,
                hardenedSection: 42,
                gossamerScrap: 10,
            }),
            // 74115 Marauder Emblazoned Shoulders
            this.createMarauderEmblazonedRecipe({
                output: 74115,
                hardenedSection: 36,
                gossamerScrap: 10,
            }),

            // 71836 Viper's Emblazoned Boots
            this.createViperEmblazonedRecipe({
                output: 74115,
                hardenedSection: 42,
                gossamerScrap: 8,
            }),
            // 77087 Viper's Emblazoned Coat
            this.createViperEmblazonedRecipe({
                output: 77087,
                hardenedSection: 45,
                gossamerScrap: 10,
            }),
            // 72666 Viper's Emblazoned Gloves
            this.createViperEmblazonedRecipe({
                output: 72666,
                hardenedSection: 36,
                gossamerScrap: 10,
            }),
            // 73740 Viper's Emblazoned Helm
            this.createViperEmblazonedRecipe({
                output: 73740,
                hardenedSection: 33,
                gossamerScrap: 12,
            }),
            // 73960 Viper's Emblazoned Pants
            this.createViperEmblazonedRecipe({
                output: 73960,
                hardenedSection: 42,
                gossamerScrap: 10,
            }),
            // 72308 Viper's Emblazoned Shoulders
            this.createViperEmblazonedRecipe({
                output: 72308,
                hardenedSection: 36,
                gossamerScrap: 10,
            }),
        ];
    }

    private createMarauderEmblazonedRecipe(options: {
        output: number,
        gossamerScrap: number,
        hardenedSection: number,
    }): Recipe {
        return {
            id: options.output,
            type: RecipeType.leatherworker,
            output: [
                { id: options.output, quantity: 1 },
            ],
            input: [
                // 75654-Ebony-Orb
                { id: 75654, quantity: 3 },
                // 19721-Glob-of-Ectoplasm
                { id: 19721, quantity: 5 },
                // gossamer scrap
                { id: 19745, quantity: options.gossamerScrap },
                // hardened leather section
                { id: 19732, quantity: options.hardenedSection },
            ],
            // barbed thorn + spools
            cost: 30 * 16 + 2.6 * 640,
        };
    }

    private createViperEmblazonedRecipe(options: {
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
            cost: 2.8 * 640 + 30 * 19 + 10 * 56 + 50 * 11,
        };
    }
}
