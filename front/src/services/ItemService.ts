import ItemEntity from '../models/ItemEntity';

class ItemService {
    readonly BASE_URL = 'http://localhost:3000';

    getAll(): Promise<any> {
        return fetch(this.BASE_URL + '/items/')
            .then(res => res.json());
    }

    get(): Array<ItemEntity> {
        return items;
    }

    getPrices(ids: Array<number>): Promise<any> {
        return fetch(this.BASE_URL + '/prices?ids=' + ids.join(','))
            .then(res => res.json());
    }
}

export default new ItemService();

const items: Array<ItemEntity> = [
    {
        id: 21675,
        name: 'Discarded Garment',
    },
    {
        id: 22331,
        name: 'Salvageable Hide',
    },
];
