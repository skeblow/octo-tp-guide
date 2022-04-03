import { BasicTrade, Item, ItemBltc, ItemPrice } from "../../../shared";
import BltcService from "./BltcService";
import ItemService from "./ItemService";
import MongoService from "./MongoService";
import PriceService from "./PriceService";

export default class ListService {
    constructor (
        private mongoService: MongoService,
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
    ) {
    }

    async getBasicList(): Promise<any> {
        const minRoi = 25;
        const minSell = 50;
        const minSells = 2_000;
        const minBuys = 2_000;

        const collection = await this.mongoService.getBltcCollection();

        const result = await collection.aggregate([
            {
                $group: {_id: '$id', id: {$first: '$id'}, bought: {$last: '$bought'}, sold: {$last: '$sold'}}
            },
            {
                $match: {bought: {$gt: minBuys}, sold: {$gt: minSells}},
            },
        ]).toArray();

        console.log('result (first 10)', result.slice(0, 10));
        const ids = result.map(obj => obj.id);

        let prices = await this.priceService.getPricesByIds(ids);
        prices = prices.filter((price: ItemPrice) => {
            const profit = this.priceService.getProfit(price);
            const roi = this.priceService.getRoi(price);

            return price.sells.unit_price > minSell && profit > 10 && roi > minRoi;
        });
        prices = prices.sort((price1, price2) => this.priceService.getRoi(price2) - this.priceService.getRoi(price1));

        const items = await this.itemService.getAllByIds(prices.map(price => price.id));
        const bltcs = await this.bltcService.getBltcByIds(prices.map(price => price.id));

        const trades: Array<BasicTrade> = [];

        for (const price of prices) {
            trades.push({
                item: items.find(item => item.id === price.id) as Item,
                price: price,
                bltc: bltcs.find(bltc => bltc.id === price.id) as ItemBltc,
            });
        }

        return trades;
    }
}
