import { Item, ItemPrice } from '../../../shared';
import GwApiService from './GwApiService';
import MongoService from './MongoService';

export default class ItemService {
    constructor(
        private mongoService: MongoService,
        private gwApiService: GwApiService,
    ) {
    }

    async getAll(): Promise<Array<Item>> {
        const collection = await this.mongoService.getItemsCollection();

        return await collection
            .find({})
            .sort({
                name: 1,
            })
            .toArray();
    }

    async getAllByIds(ids: Array<number>): Promise<Array<Item>> {
        const collection = await this.mongoService.getItemsCollection();

        let items = await collection.find({
            _id: { $in: ids },
        }).toArray();

        const foundIds = items.map((item: Item) => item.id);
        const missingIds = ids.filter((id) => !foundIds.includes(id));

        if (missingIds.length > 0) {
            const missingItems = await this.gwApiService.getItems(missingIds);

            for (const item of missingItems) {
                item._id = item.id;
            }

            if (missingItems.length > 0) {
                await collection.insertMany(missingItems);

                items = items.concat(missingItems);
            }
        }

        return items;
    }

    async getItemById(id: number): Promise<Item | null> {
        const collection = await this.mongoService.getItemsCollection();
        const item: Item | null = await collection.findOne({ _id: id });

        if (item !== null) {
            return item;
        }

        console.log('need to fetch', id);

        const newItem = await this.gwApiService.getItem(id);

        if (newItem === null) {
            console.log('item', id, 'does not exist');

            return null;
        }

        newItem._id = newItem.id;
        await collection.insertOne(newItem);

        return newItem;
    }
}
