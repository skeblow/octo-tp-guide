import fetch, { Response } from "node-fetch";
import { ItemBltc } from "../../../shared";
import MongoService from "./MongoService";

export default class BltcService {
    readonly BASE_URL = 'https://www.gw2bltc.com/en/item/';

    constructor (
        private mongoService: MongoService,
    ) {
    }

    async getBltcByIds(ids: Array<number>): Promise<Array<ItemBltc>> {
        const collection = await this.mongoService.getBltcCollection();
        const date = new Date();
        const from = new Date();
        const to = new Date();
        from.setDate(from.getDate() - 1);
        from.setHours(0);
        from.setMinutes(0);
        to.setHours(23);
        to.setMinutes(59);

        let bltcs: Array<ItemBltc> = await collection.find({
            id: {$in: ids},
            date: {
                $gt: from,
                $lt: to,
            },
        }).toArray();

        const foundIds = bltcs.map(bltc => bltc.id);
        const missingIds = ids.filter(id => ! foundIds.includes(id));

        if (missingIds.length === 0) {
            return bltcs;
        }

        console.log('need to fetch bltcs', missingIds.slice(0, 10), missingIds.length);
        
        for (const id of ids) {
            const bltc = await this.fetchBltc(id, date);

            if (bltc !== null) {
                await collection.insertOne(bltc);
                bltcs.push(bltc);
            }
        }

        return bltcs;
    }

    async fetchBltc(id: number, date: Date): Promise<ItemBltc|null> {
        const res = await fetch(this.BASE_URL + id);
        const html = await res.text();
        const found = html.match(/\s+tp:.*/g);

        if (found === null) {
            return null;
        }

        let data = found[0].toString()
            .trim()
            .substring(3);
        data = data.substring(0, data.length - 1);
        const parsed = JSON.parse(data);

        const itemBltc: ItemBltc = {
            id: id,
            bought: parsed.bought,
            oldBought: parsed.old_bought,
            sold: parsed.sold,
            oldSold: parsed.old_sold,
            date: date,
        }

        return itemBltc;
    }
}
