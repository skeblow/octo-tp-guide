import fetch, { Response } from 'node-fetch';
import { Item, ItemPrice } from '../../../shared';

export default class GwApiService {
    private readonly BASE_URL = 'https://api.guildwars2.com/v2';

    async getItems(ids: Array<number>): Promise<Array<Item>> {
        const res = await fetch(this.BASE_URL + '/items?ids=' + ids.join(','));
        const items = await res.json();

        return Array.isArray(items) ? items : [];
    }

    async getItem(id: number): Promise<Item | null> {
        const res = await fetch(this.BASE_URL + '/items/' + id);
        const item: any = await res.json();

        return !!item.id ? item : null;
    }

    async getItemPrices(ids: Array<number>): Promise<Array<ItemPrice>> {
        const res = await fetch(
            this.BASE_URL + '/commerce/prices?ids=' + ids.join(','),
        );
        const prices = await res.json();

        return Array.isArray(prices) ? prices : [];
    }
}
