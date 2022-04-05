export interface Item {
    _id: number,
    id: number,
    name: string,
    type: string,
    rarity: string,
    icon: string,
}

export interface ItemPrice {
    _id: number,
    id: number,
    buys: {
        quantity: number,
        unit_price: number,
    };
    sells: {
        quantity: number,
        unit_price: number,
    };
    date: Date,
}

export interface ItemBltc {
    _id?: number;
    id: number;
    bought: number;
    oldBought: number;
    sold: number;
    oldSold: number;
    date: Date;
}

export enum RecipeType {
    refine = 'refine',
    salvage = 'salvage',
    open = 'open',
    cooking = 'cooking',
}

export interface Recipe {
    // _id: number,
    id: number,
    type: RecipeType,
    input: Array<{id: number, quantity: number}>,
    output: Array<{id: number, quantity: number}>,
}

export interface SalvageRecipe extends Recipe {
    cost: number,
}

export interface BasicTrade {
    item: Item,
    price: ItemPrice,
    bltc: ItemBltc,
}

export interface RefineTrade {
    id: number,
    recipe: Recipe,
    input: Array<{
        item: BasicTrade,
        quantity: number,
    }>,
    output: BasicTrade;
}

export interface SalvageTrade {
    id: number,
    recipe: SalvageRecipe,
    input: BasicTrade,
    output: Array<{
        item: BasicTrade,
        quantity: number,
    }>,
}
