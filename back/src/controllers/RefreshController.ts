import { Request, Response } from "express";
import BltcService from "../services/BltcService";
import CookingService from "../services/CookingService";
import ItemService from "../services/ItemService";
import PriceService from "../services/PriceService";
import * as fs from 'fs';
import { Recipe } from "../../../shared";
import UtilityService from "../services/UtilityService";
import OpenService from "../services/OpenService";
import WeaponsmithService from "../services/WeaponsmithService";

export default class RefreshController {
    constructor(
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
        private cookingService: CookingService,
        private utilityService: UtilityService,
        private openService: OpenService,
        private weaponsmithService: WeaponsmithService,
    ) {
    }

    private async getRecipeIds(): Promise<Array<number>> {
        let recipes: Array<Recipe> = 
            (await this.cookingService.getAll())
            .concat(await this.utilityService.getAll())
            .concat(await this.openService.getAll())
            .concat(await this.weaponsmithService.getAll());
        let ids: Array<number> = [];

        for (const recipe of recipes) {
            ids = ids.concat(recipe.input.map(item => item.id))
                .concat(recipe.output.map(item => item.id));
        }

        return ids;
    }

    async refresh(req: Request, res: Response): Promise<void> {
        const requestIds: Array<number> = ((req.query.ids || '') + '').split(',')
            .filter(id => !! id)
            .map(id => +id);

        const filename = './data/ids';
        let fileIds: string = fs.readFileSync(filename, 'utf-8').toString();

        let ids: Array<any> = fileIds
            .split('\n')
            .flatMap(ids => ids.split(','))
            .map(id => +id)
            .filter(id => id > 0)
            .concat(await this.getRecipeIds())
            .concat(requestIds);
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

        console.log('done refreshing');
        res.send('done');
    }
}
