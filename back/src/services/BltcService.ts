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
        const bltcs = [];
        
        for (const id of ids) {
            const bltc = await this.getBltc(id);

            if (bltc !== null) {
                bltcs.push(bltc);
            }
        }

        return bltcs;
    }

    async getBltc(id: number): Promise<ItemBltc|null> {
        const collection = await this.mongoService.getBltcCollection();
        const date = new Date();
        const from = new Date();
        const to = new Date();
        from.setHours(0);
        from.setMinutes(0);
        to.setHours(23);
        to.setMinutes(59);

        let bltc = await collection.findOne({
            id: id,
            date: {
                $gt: from,
                $lt: to,
            },
        });

        if (bltc !== null) {
            return bltc;
        }

        console.log('missing bltc for', id);

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

        await collection.insertOne(itemBltc);

        return itemBltc;
    }
}
