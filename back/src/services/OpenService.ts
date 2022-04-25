import { Recipe, RecipeItem, RecipeType, SalvageRecipe } from '../../../shared';

export default class OpenService {
    async getAll(): Promise<Array<SalvageRecipe>> {
        return [
            {
                // 8920-Heavy-Loot-Bag
                id: 8920,
                type: RecipeType.open,
                input: [
                    { id: 8920, quantity: 1 },
                ],
                cost: -1 * 0.8 * ((3 + 5) / 2),
                output: [
                    // silk scrap
                    { id: 19748, quantity: 0.2244 },
                    // thick leather section
                    { id: 19729, quantity: 0.1712 },
                    // mithril ore
                    { id: 19700, quantity: 0.3472 },
                    // gossamer scrap
                    { id: 19745, quantity: 0.0685 },
                    // hardened leather section
                    { id: 19732, quantity: 0.053 },
                    // Tier 5 Fine Material
                    ...this.getOneOfWithQuantity(
                        [
                            24341, // Large Bone
                            24350, // Large Claw
                            24276, // Pile of Incandescent Dust
                            24356, // Large Fang
                            24288, // Large Scale
                            24299, // Intricate Totem
                            24282, // Potent Venom Sac
                            24294, // Vial of Potent Blood
                        ],
                        0.3631,
                    ),
                    // Tier 6 Rare Material
                    ...this.getOneOfWithQuantity(
                        [
                            24358, // Ancient Bone
                            24351, // Vicious Claw
                            24277, // Pile of Crystalline Dust
                            24357, // Vicious Fang
                            24289, // Armored Scale
                            24300, // Elaborate Totem
                            24283, // Powerful Venom Sac
                            24295, // Vial of Powerful Blood
                        ],
                        0.0913,
                    ),
                    // pile of essence
                    ...this.getOneOfWithQuantity(
                        [
                            24335,
                            24334,
                            24331,
                            24332,
                            24333,
                        ],
                        0.0014,
                    ),
                    // core
                    ...this.getOneOfWithQuantity(
                        [
                            // https://www.gw2bltc.com/en/tp/search?name=core%20-stormcaller&rarity=Rare&type=CraftingMaterial
                            24309,
                            24324,
                            24314,
                            24304,
                            24339,
                            24329,
                            24319,
                        ],
                        0.0081,
                    ),
                    // lodestone
                    ...this.getOneOfWithQuantity(
                        [
                            24330,
                            24315,
                            24320,
                            24325,
                            24310,
                            24340,
                            24305,
                        ],
                        0.0012,
                    ),
                ],
            },
            {
                // 76165-Heavy-Thorned-Bag
                id: 76165,
                type: RecipeType.open,
                input: [
                    { id: 76165, quantity: 1 },
                ],
                cost: -1 * 0.8 * ((3 + 5) / 2),
                output: [
                    // silk scrap
                    { id: 19748, quantity: 0.45 },
                    // gossamer scrap
                    { id: 19745, quantity: 0.02 },
                    // thick leather section
                    { id: 19729, quantity: 0.25 },
                    // hardened leather section
                    { id: 19732, quantity: 0.02 },
                    // intricate totem
                    { id: 24299, quantity: 0.08 },
                    // 24300 Elaborate Totem
                    { id: 24300, quantity: 0.01 },
                    // 66930-Mordrem-Sliver
                    { id: 66930, quantity: 0.18 },
                    // 24276-Pile-of-Incandescent-Dust
                    { id: 24276, quantity: 0.08 },
                    // 24277-Pile-of-Crystalline-Dust
                    { id: 24277, quantity: 0.02 },
                    // 24282 Potent Venom Sac
                    { id: 24282, quantity: 0.07 },
                    // 24283 Powerful Venom Sac
                    { id: 24283, quantity: 0.02 },
                    // 24295 Vial of Powerful Blood
                    { id: 24295, quantity: 0.03 },
                    // 24294 Vial of Potent Blood
                    { id: 24294, quantity: 0.07 },
                ],
            },
            {
                // 9293-Bag-of-Stolen-Goods
                id: 9293,
                type: RecipeType.open,
                input: [
                    { id: 9293, quantity: 1 },
                ],
                cost: -1 * 0.8 * ((3 + 5) / 2),
                output: [
                    // silk scrap
                    { id: 19748, quantity: 0.35 },
                    // gossamer scrap
                    { id: 19745, quantity: 0.02 },
                    // thick leather section
                    { id: 19729, quantity: 0.25 },
                    // hardened leather section
                    { id: 19732, quantity: 0.01 },
                    // Tier 5 Fine Material
                    ...this.getOneOfWithQuantity(
                        [
                            24341, // Large Bone
                            24350, // Large Claw
                            24276, // Pile of Incandescent Dust
                            24356, // Large Fang
                            24288, // Large Scale
                            24299, // Intricate Totem
                            24282, // Potent Venom Sac
                            24294, // Vial of Potent Blood
                        ],
                        0.055 * 8,
                    ),
                    // Tier 6 Rare Material
                    ...this.getOneOfWithQuantity(
                        [
                            24358, // Ancient Bone
                            24351, // Vicious Claw
                            24277, // Pile of Crystalline Dust
                            24357, // Vicious Fang
                            24289, // Armored Scale
                            24300, // Elaborate Totem
                            24283, // Powerful Venom Sac
                            24295, // Vial of Powerful Blood
                        ],
                        0.01 * 8,
                    ),
                    // slab of poultry meat
                    { id: 24360, quantity: 0.02 },
                ],
            },
            {
                // 9349-Heavy-Bag-of-Booty
                id: 9349,
                type: RecipeType.open,
                input: [
                    { id: 9349, quantity: 1 },
                ],
                cost: -1 * 0.8 * ((3 + 5) / 2),
                output: [
                    // silk scrap
                    { id: 19748, quantity: 0.39 },
                    // thick leather section
                    { id: 19729, quantity: 0.26 },
                    // gossamer scrap
                    { id: 19745, quantity: 0.03 },
                    // hardened leather section
                    { id: 19732, quantity: 0.03 },
                    // 24294 Vial of Potent Blood
                    { id: 24294, quantity: 0.07 },
                    // Tier 5 Fine Material
                    ...this.getOneOfWithQuantity(
                        [
                            24341, // Large Bone
                            24350, // Large Claw
                            24276, // Pile of Incandescent Dust
                            24356, // Large Fang
                            24288, // Large Scale
                            24299, // Intricate Totem
                            24282, // Potent Venom Sac
                            24294, // Vial of Potent Blood
                        ],
                        0.06 * 8,
                    ),
                    // Tier 6 Rare Material
                    ...this.getOneOfWithQuantity(
                        [
                            24358, // Ancient Bone
                            24351, // Vicious Claw
                            24277, // Pile of Crystalline Dust
                            24357, // Vicious Fang
                            24289, // Armored Scale
                            24300, // Elaborate Totem
                            24283, // Powerful Venom Sac
                            24295, // Vial of Powerful Blood
                        ],
                        0.01 * 8,
                    ),
                ],
            },
            {
                // 9281-Supply-Bag
                id: 9281,
                type: RecipeType.open,
                input: [
                    { id: 9281, quantity: 1 },
                ],
                cost: -1 * 0.8 * ((3 + 5) / 2),
                output: [
                    // coarse leather section
                    { id: 19730, quantity: 0.28 },
                    // cotton scrap
                    { id: 19741, quantity: 0.35 },
                    // Tier 6 Rare Material
                    ...this.getOneOfWithQuantity(
                        [
                            24344, // Bone
                            24348, // Claw
                            24354, // Fang
                            24274, // Pile of Radiant Dust
                            24286, // Scale
                            24298, // Totem
                        ],
                        0.0913,
                    ),
                    // 24307-Onyx-Fragment
                    { id: 24307, quantity: 0.02 },
                ],
            },
            {
                // 9344-Light-Bag-of-Booty
                id: 9344,
                type: RecipeType.open,
                input: [
                    { id: 9344, quantity: 1 },
                ],
                cost: -1 * 0.8 * ((3 + 5) / 2),
                output: [
                    // bone
                    { id: 24344, quantity: 0.01 },
                    // Bone Shard
                    { id: 24343, quantity: 0.05 },
                    // 12229-Chocolate-Bar
                    { id: 12229, quantity: 0.08 },
                    // Claw
                    { id: 24348, quantity: 0.01 },
                    // Fang
                    { id: 24354, quantity: 0.01 },
                ],
            },
        ];
    }

    private getOneOfWithQuantity(
        ids: Array<number>,
        quantity: number,
    ): Array<RecipeItem> {
        return ids.map((id: number): RecipeItem => {
            return {
                id,
                quantity: quantity / ids.length,
            };
        });
    }
}
