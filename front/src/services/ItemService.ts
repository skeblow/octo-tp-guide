import { Item, ItemPrice } from '../../../shared';

class ItemService {
    readonly BASE_URL = 'http://localhost:3000';

    async getAll(): Promise<Array<Item>> {
        const res = await fetch(this.BASE_URL + '/items/');

        return await res.json();
    }

    async getPrices(ids: Array<number>): Promise<Array<ItemPrice>> {
        const res = await fetch(this.BASE_URL + '/prices?ids=' + ids.join(','));

        return await res.json();
    }
}

export default new ItemService();
