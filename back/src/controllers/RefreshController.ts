import { Request, Response } from "express";
import BltcService from "../services/BltcService";
import CookingService from "../services/CookingService";
import ItemService from "../services/ItemService";
import PriceService from "../services/PriceService";
import * as fs from 'fs';

export default class RefreshController {
    constructor(
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
        private cookingService: CookingService,
    ) {
    }

    async refresh(req: Request, res: Response): Promise<void> {
        const filename = './data/ids';
        let fileIds: string = fs.readFileSync(filename, 'utf-8').toString();

        let ids: Array<any> = fileIds
            .split('\n')
            .flatMap(ids => ids.split(','))
            .map(id => +id)
            .filter(id => id > 0);
        ids = ids.concat(await this.getCookingIds());
        ids = [...new Set(ids)];

        let chunkSize = 20;

        fs.truncateSync(filename);

        for (let i = 0; i < ids.length; i += chunkSize) {
            const chunk = ids.slice(i, i + chunkSize);

            fs.appendFileSync(filename, chunk.join(',') + '\n');            
        }       

        chunkSize = 100;

        for (let i = 0; i < ids.length; i += chunkSize) {
            const chunk = ids.slice(i, i + chunkSize);

            await Promise.all([
                this.itemService.getAllByIds(chunk),
                this.priceService.getPricesByIds(chunk),
                this.bltcService.getBltcByIds(chunk),
            ]);
        }

        res.send('done');
    }

    private async getCookingIds(): Promise<Array<number>> {
        const recipes = await this.cookingService.getAll();
        let ids: Array<number> = [];

        for (const recipe of recipes) {
            ids = ids.concat(recipe.input.map(item => item.id))
                .concat(recipe.output.map(item => item.id));
        }

        return ids;
    }
}
