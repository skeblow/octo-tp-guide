import { MongoClient } from "mongodb";

export default class MongoService {
    constructor(
        private client: MongoClient,
    ) {
    }

    private getDb(): Promise<any> {
        return this.client.connect()
            .then(client => client.db('octo-tp-guide'));
    }

    getItemsCollection(): Promise<any> {
        return this.getDb()
            .then(db => db.collection('items'));
    }
}
