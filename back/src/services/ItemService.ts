import { Item, ItemPrice } from '../../../shared/index.ts';
import GwApiService from './GwApiService.ts';
import MongoService from './MongoService.ts';

export default class ItemService {
    constructor(
        private mongoService: MongoService,
        private gwApiService: GwApiService,
    ) {
    }

    public getAll(): Promise<Array<Item>> {
        return this.mongoService.getItemsCollection()
            .then(
                collection => collection.find({})
                .sort({ name: 1 })
                .toArray()
            );
    }

    public async getAllByIds(ids: Array<number>): Promise<Array<Item>> {
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

    public async getAllMissingIds(ids: Array<number>): Promise<Array<any>> {
        return this.mongoService.getItemsCollection()
            .then(collection => collection.aggregate([
                    {
                        $match: {_id: {$nin: ids}},
                    },
                    {
                        $group: {
                            _id: null,
                            ids: {$addToSet: '$id'},
                        },
                    },
                ])
            )
            .then(aggregated => aggregated.toArray())
            .then((obj: Array<any>) => obj.flatMap((o: any) => o.ids));

            // const collection = await this.mongoService.getItemsCollection();
            
            // return collection.aggregate([
            //     {
            //         $match: {_id: {$nin: ids}},
            //     },
            //     {
            //         $group: {
            //             _id: null,
            //             ids: {$addToSet: '$id'},
            //         },
            //     },
            // ])
            //     .toArray()
            //     .then((obj: Array<any>) => obj.flatMap((o: any) => o.ids));
    }

    public async getItemById(id: number): Promise<Item | null> {
        const collection = await this.mongoService.getItemsCollection();
        const item: Item | undefined = await collection.findOne({ _id: id });

        if (item !== undefined) {
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
