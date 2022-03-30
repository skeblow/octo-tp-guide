export interface Item {
    _id: number;
    id: number;
    type: string;
    rarity: string;
    icon: string;
}

export interface ItemPrice {
    _id: number;
    id: number;
    buys: {
        quantity: number,
        unit_price: number,
    };
    sells: {
        quantity: number,
        unit_price: number,
    };
}
