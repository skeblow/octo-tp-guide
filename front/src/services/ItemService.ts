import ItemEntity from '../models/ItemEntity';

class ItemService {
    get(): Array<ItemEntity> {
        return items;
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
