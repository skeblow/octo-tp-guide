import { Collection, Db, MongoClient } from "mongodb";
import { Item, ItemPrice } from "../../../shared";

export default class MongoService {
    constructor(
        private client: MongoClient,
    ) {
    }

    private async getDb(): Promise<Db> {
        const client = await this.client.connect();

        return client.db('octo-tp-guide');
    }

    async getItemsCollection(): Promise<Collection<Item>> {
        const db = await this.getDb();

        return db.collection('items');
    }

    async getPricesCollection(): Promise<Collection<ItemPrice>> {
        const db = await this.getDb();

        return db.collection('item-prices');
    }
}
