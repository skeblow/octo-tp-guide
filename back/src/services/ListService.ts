import { BasicTrade } from "../../../shared";
import ItemController from "../controllers/ItemController";
import MongoService from "./MongoService";

export default class ListService {
    constructor (
        private mongoService: MongoService,
    ) {
    }

    async getBasicList(): Promise<any> {
        const collection = await this.mongoService.getPricesCollection();

        const items = await collection.find({
            "buys.quantity": {$gt: 100_000},
        }).toArray();

        const ids = items.map(item => item.id);
        const uniqueIds = [...new Set(ids)];

        return uniqueIds;
    }
}
