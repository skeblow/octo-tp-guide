import { BasicTrade } from "../../../shared";
import MongoService from "./MongoService";

export default class ListService {
    constructor (
        private mongoService: MongoService,
    ) {
    }

    async getBasicList(): Promise<Array<BasicTrade>> {
        const collection = await this.mongoService.getPricesCollection();

        const items = await collection.find({
            
        }).toArray();

        return [];
    }
}
