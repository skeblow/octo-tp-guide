import GwApiService from "./GwApiService";
import MongoService from './MongoService';

export default class ItemService {
    constructor (
        private mongoService: MongoService,
        private gwApiService: GwApiService,
    ) {
    }

    getPricesForItems(ids: Array<number>): Promise<any> {
        return this.gwApiService.getItemPrices(ids);
    }

    getAll(): Promise<any> {
        return this.mongoService.getItemsCollection()
            .then(
                collection => collection.find({}).toArray()
            )
    }

    getItemById(id: number): Promise<any> {
        return this.mongoService.getItemsCollection()
            .then(collection => collection.findOne({_id: id}))
            .then(item => {
                if (item === null) {
                    console.log('need to fetch', id);

                    return this.gwApiService.getItem(id)
                        .then(
                            (item: any) => {
                                if (! item?.id) {
                                    return null;
                                }

                                item._id = item.id;

                                return this.mongoService.getItemsCollection()
                                    .then(collection => {
                                        collection.insertOne(item);

                                        return item;
                                    })
                            }
                        );
                }

                return item;
            });
    }
}
