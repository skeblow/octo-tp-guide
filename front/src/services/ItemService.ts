import { BASE_URL } from '@/config';
import { Item, ItemPrice } from '../../../shared';

class ItemService {
    public async getAll(): Promise<Array<Item>> {
        const res = await fetch(BASE_URL + '/items/');

        return await res.json();
    }

    public async getPrices(ids: Array<number>): Promise<Array<ItemPrice>> {
        const res = await fetch(BASE_URL + '/prices?ids=' + ids.join(','));

        return await res.json();
    }
}

export default new ItemService();
