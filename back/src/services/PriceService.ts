import { ItemPrice } from '../../../shared';
import GwApiService from './GwApiService';
import MongoService from './MongoService';

export default class PriceService {
    constructor(
        private mongoService: MongoService,
        private gwApiService: GwApiService,
    ) {
    }

    getProfit(price: ItemPrice): number {
        return 0.85 * price.sells.unit_price - price.buys.unit_price;
    }

    getRoi(price: ItemPrice): number {
        return Math.round(this.getProfit(price) / price.buys.unit_price * 100);
    }

    async getPricesByIds(ids: Array<number>): Promise<Array<ItemPrice>> {
        const collection = await this.mongoService.getPricesCollection();
        const date = new Date();
        const from = new Date();
        const to = new Date();
        from.setMinutes(date.getMinutes() - 5);
        to.setMinutes(date.getMinutes() + 5);

        const zeroPriceIds = this.getZeroPriceIds();
        const requestedZeroPriceIds = ids.filter((id) =>
            zeroPriceIds.includes(id)
        );
        ids = ids.filter((id) => !zeroPriceIds.includes(id));

        let prices = await collection.find({
            id: { $in: ids },
            date: {
                $gt: from,
                $lt: to,
            },
        }).toArray();
        prices = prices.concat(prices);

        if (prices.length > ids.length) {
            const uniquePrices: Array<ItemPrice> = [];

            for (const price of prices) {
                if (uniquePrices.find((p) => p.id === price.id)) {
                    continue;
                }

                uniquePrices.push(price);
            }

            prices = uniquePrices;
        }

        if (requestedZeroPriceIds.length > 0) {
            prices = prices.concat(
                this.getZeroPricesByIds(requestedZeroPriceIds),
            );
        }

        const foundIds = prices.map((price: ItemPrice) => price.id);
        const missingIds = ids.filter((id) => !foundIds.includes(id));

        if (missingIds.length === 0) {
            return prices;
        }

        console.log(
            'need to fetch prices',
            missingIds.slice(0, 10),
            missingIds.length,
        );

        const missingPrices = await this.gwApiService.getItemPrices(
            missingIds.slice(0, 100),
        );

        if (missingPrices.length === 0) {
            return prices;
        }

        for (const price of missingPrices) {
            price.date = date;
        }

        await collection.insertMany(missingPrices);

        prices = prices.concat(missingPrices);

        return prices;
    }

    getZeroPricesByIds(ids: Array<number>): Array<ItemPrice> {
        const prices: Array<ItemPrice> = [];
        const date = new Date();

        for (const id of ids) {
            prices.push({
                _id: id,
                id,
                buys: {
                    quantity: 0,
                    unit_price: 0,
                },
                sells: {
                    quantity: 0,
                    unit_price: 0,
                },
                date,
            });
        }

        return prices;
    }

    getZeroPriceIds(): Array<number> {
        return [
            // nutmeg seed
            12249,
            // Ginger Root
            12328,
            // Peach
            12503,
            // Eggplant
            12502,
            // Shallot
            12517,
            // Bell Pepper
            12235,
            // Tomato
            12141,
            // Basil Leaf
            12245,
            // Cheese Wedge
            12159,
            // Almond
            12337,
            // Pear
            12514,
            // Rice-Ball
            12145,
            // Massive-Balloon-Bouquet
            74693,
            // Basic-Salvage-Kit
            23040,
            // Black Lion Salvage Kit
            19986,
            // Glob of Dark Matter
            46681,
            23043, // Master's Salvage Kit
            6736, // Vigorous Apprentice Gloves
            12240, //Celery Stalk
            87289, // Bottle of Coconut Milk
            12339, //Lime
            12252, //Lemon
            12137, //Glass of Buttermilk
        ];
    }
}
