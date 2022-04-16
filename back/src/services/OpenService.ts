import { Recipe, RecipeItem, RecipeType, SalvageRecipe } from "../../../shared";

export default class OpenService {
    async getAll(): Promise<Array<SalvageRecipe>> {
        return [
            {
                // 8920-Heavy-Loot-Bag
                id: 8920,
                type: RecipeType.open,
                input: [
                    {id: 8920, quantity: 1},
                ],
                cost: -1 * 0.8 * ((3 + 5) / 2),
                output: [
                    // silk scrap
                    {id: 19748, quantity: 0.2244},
                    // thick leather section
                    {id: 19729, quantity: 0.1712},
                    // mithril ore
                    {id: 19700, quantity: 0.3472},
                    // gossamer scrap
                    {id: 19745, quantity: 0.0685},
                    // hardened leather section
                    {id: 19732, quantity: 0.053},
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
            }
        ];
    }

    private getOneOfWithQuantity(ids: Array<number>, quantity: number): Array<RecipeItem> {
        return ids.map((id: number): RecipeItem => {
            return {
                id,
                quantity: quantity / ids.length,
            } 
        });
    }
}
