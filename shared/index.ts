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
    artificier = 'artificier',
    weaponsmith = 'weaponsmith',
    huntsman = 'huntsman',
    jewelcrafting = 'jewelcrafting',
    tailoring = 'tailoring',
    armorsmith = 'armorsmith',
    leatherworker = 'leatherworker',
}

export interface Recipe {
    // _id: number,
    id: number,
    type: RecipeType,
    input: Array<RecipeItem>,
    output: Array<RecipeItem>,
    cost?: number,
}

export interface RecipeItem {
    id: number,
    quantity: number,
}

export interface SalvageRecipe extends Recipe {
    cost: number,
}

export interface TradeItem {
    item: Item,
    price: ItemPrice,
    bltc: ItemBltc,
    quantity: number,
}

export interface TradeData {
    totalBuy: number,
    totalSell: number,
    profit: number,
    roi: number,
    target: number,
}

export interface BasicTrade extends TradeItem, TradeData {
}

export interface RecipeTrade extends TradeData {
    id: number,
    recipe: Recipe,
    input: Array<TradeItem>,
    output: TradeItem;
}

export interface SalvageTrade extends TradeData {
    id: number,
    recipe: SalvageRecipe,
    input: TradeItem,
    output: Array<TradeItem>,
}

export interface BankItem {
    id: number;
    count: number;
}

export interface Achievement {
    id: number;
    name: string;
    description: string;
    requirement: string;
}

export interface ListedItem {
    id: number,
    itemId: number,
    price: number,
    quantity: number,
    createdAt: string,
}

export interface ListedItemToCancel {
    listedItem: ListedItem,
    item: Item,
    itemPrice: ItemPrice,
    diff: number,
    listing: Listing,
}

export interface Listing {
    id: number,
    buys: Array<{listings: number, unit_price: number, quantity: number}>,
    sells: Array<{listings: number, unit_price: number, quantity: number}>,
}
