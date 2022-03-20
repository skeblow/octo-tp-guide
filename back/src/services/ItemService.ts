import { MongoClient } from "mongodb";

export default class ItemService {
    constructor (
        private client: MongoClient,
    ) {
    }

    getItemById(id: number): Promise<any> {
        return this.client.connect()
            .then(client => {
                const db = client.db('octo-tp-guide');
                const collection = db.collection('items');
        
                return collection.findOne({
                    _id: id,
                });
            })
            .catch(err => console.log(err));
    }
}
