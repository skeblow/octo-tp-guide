// import { Collection, Db, MongoClient } from 'mongodb';
import { MongoClient, Database, Collection } from '../deps.ts';
import { Item, ItemBltc, ItemPrice } from '../../../shared/index.ts';

export default class MongoService {
    constructor(
        private client: MongoClient,
    ) {
    }

    private async getDb(): Promise<Database> {
        return this.client.database('octo-tp-guide');
    }

    async getItemsCollection(): Promise<Collection<Item>> {
        const db = await this.getDb();

        return db.collection('items');
    }

    async getPricesCollection(): Promise<Collection<ItemPrice>> {
        const db = await this.getDb();

        return db.collection('item-prices');
    }

    async getBltcCollection(): Promise<Collection<ItemBltc>> {
        const db = await this.getDb();

        return db.collection('item-bltc');
    }
}
