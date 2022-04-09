import { Recipe, RecipeTrade, RecipeType } from "../../../shared";

export default class CookingService {
    getCookingRoi(trade: RecipeTrade): number {
        const sellPrice = trade.output.price?.sells?.unit_price * trade.output.quantity;
        const buyPrice = trade.input.reduce((total, item) => total + item.price?.buys?.unit_price * item.quantity, 0);
        const profit = Math.round( 0.85 * sellPrice - buyPrice );
    
        return Math.round( profit / buyPrice * 100 );
    }

    async getAll(): Promise<Array<Recipe>> {
        return [
            {
                // Cup-of-Light-Roasted-Coffee
                id: 82642,
                type: RecipeType.cooking,
                output: [
                    {id: 82642, quantity: 1},
                ],
                input: [
                    // Bag-of-Coffee-Beans
                    {id: 82991, quantity: 1},
                    // Lump-of-Coal
                    {id: 19750, quantity: 2},
                    // Jug-of-Water
                    {id: 12156, quantity: 2},
                    // Milling-Stone
                    {id: 77256, quantity: 1},
                ],
            },
            {
                // Pile-of-Pumpkin-Pie-Spice
                id: 12519,
                type: RecipeType.cooking,
                output: [
                    {id: 12519, quantity: 1},
                ],
                input: [
                    // Cinnamon-Stick
                    {id: 12258, quantity: 1},
                    // Clove
                    {id: 12534, quantity: 1},
                    // Nutmeg-Seed
                    {id: 12249, quantity: 1},
                    // Ginger-Root
                    {id: 12328, quantity: 1},
                ],
            },
            {
                // Omnomberry-Compote
                id: 12458,
                type: RecipeType.cooking,
                output: [
                    {id: 12458, quantity: 1},
                ],
                input: [
                    // Omnomberry
                    {id: 12128, quantity: 1},
                    // Bag-of-Sugar
                    {id: 12155, quantity: 1},
                ],
            },
            {
                // Raspberry-Peach-Compote
                id: 12421,
                type: RecipeType.cooking,
                output: [
                    {id: 12421, quantity: 1},
                ],
                input: [
                    // Raspberry
                    {id: 12254, quantity: 1},
                    // Peach
                    {id: 12503, quantity: 1},
                    // Bag-of-Sugar
                    {id: 12155, quantity: 1},
                ],
            },
            {
                // 12427-Super-Veggie-Pizza
                id: 12427,
                type: RecipeType.cooking,
                output: [
                    {id: 12427, quantity: 8},
                ],
                input: [
                    // Artichoke
                    {id: 12512, quantity: 4},
                    // Eggplant
                    {id: 12502, quantity: 4},
        
                    // Shallot
                    {id: 12517, quantity: 2},
                    // Bell-Pepper
                    {id: 12235, quantity: 2},
                    // Spinach-Leaf
                    {id: 12241, quantity: 2},
                    
                    // Mushroom
                    {id: 12147, quantity: 1},
                    // Portobello-Mushroom
                    {id: 12334, quantity: 1},
                
                    // Jug-of-Water
                    {id: 12156, quantity: 1},
                    // Bag-of-Flour
                    {id: 12136, quantity: 1},
                    // 12138-Stick-of-Butter
                    {id: 12138, quantity: 1},
                    // 12141-Tomato
                    {id: 12141, quantity: 1},
                    // 12142-Onion
                    {id: 12142, quantity: 1},
                    // 12245-Basil-Leaf
                    {id: 12245, quantity: 1},
                    // 12163-Head-of-Garlic
                    {id: 12163, quantity: 1},
                     // 12159-Cheese-Wedge
                    {id: 12159, quantity: 1},
                ],
            },
            {
                // 36077-Piece-of-Candy-Corn-Almond-Brittle
                id: 36077,
                type: RecipeType.cooking,
                output: [
                    {id: 36077, quantity: 1},
                ],
                input: [
                    // 12337-Almond
                    {id: 12337, quantity: 3},
                    // 12155-Bag-of-Sugar
                    {id: 12155, quantity: 1},
                    // 36041-Piece-of-Candy-Corn
                    {id: 36041, quantity: 15},
                ],
            },
            {
                // 12386-Bowl-of-Blackberry-Pear-Compote
                id: 12386,
                type: RecipeType.cooking,
                output: [
                    {id: 12386, quantity: 1},
                ],
                input: [
                    // 12537-Blackberry
                    {id: 12537, quantity: 1},
                    // 12514-Pear
                    {id: 12514, quantity: 1},
                    // Bag-of-Sugar
                    {id: 12155, quantity: 1},
                ],
            },
            {
                // 95942-Meaty-Asparagus-Skewer
                id: 95942,
                type: RecipeType.cooking,
                output: [
                    {id: 95942, quantity: 1},
                ],
                input: [
                    // 24359-Slab-of-Red-Meat
                    {id: 24359, quantity: 1},
                    // 12505-Asparagus-Spear
                    {id: 12505, quantity: 2},
                    // 8576-Bottle-of-Rice-Wine
                    {id: 8576, quantity: 1},
                    // 12271-Bottle-of-Soy-Sauce
                    {id: 12271, quantity: 1},
                ],
            },
        ];
    }
}
