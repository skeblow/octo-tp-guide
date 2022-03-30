import { ItemPrice } from "../../../shared";
import GwApiService from "./GwApiService";
import MongoService from "./MongoService";

export default class PriceService {
    constructor (
        private mongoService: MongoService,
        private gwApiService: GwApiService,
    ) {
    }

    async getPricesForItems(ids: Array<number>): Promise<Array<ItemPrice>> {
        const collection = await this.mongoService.getPricesCollection();
        const date = new Date();
        const from = new Date();
        const to = new Date();
        from.setMinutes(date.getMinutes() - 5);
        to.setMinutes(date.getMinutes() + 5);

        let prices = await collection.find({
            _id: {$in: ids},
            date: {
                $gt: from,
                $lt: to,
            }
        }).toArray();

        console.log('prices', prices);

        const foundIds = prices.map((price: ItemPrice) => price.id);
        const missingIds = ids.filter(id => ! foundIds.includes(id));

        if (missingIds.length > 0) {
            console.log('need to fetch prices', missingIds);

            const missingPrices = await this.gwApiService.getItemPrices(missingIds);

            for (const price of missingPrices) {
                price._id = price.id;
                price.date = date;
            }

            await collection.insertMany(missingPrices);

            prices = prices.concat(missingPrices);
        }

        return prices;
    }
}
