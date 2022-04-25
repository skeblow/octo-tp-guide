// import { Request, Response } from 'express';
import BltcService from '../services/BltcService.ts';
import CookingService from '../services/CookingService.ts';
import ItemService from '../services/ItemService.ts';
import PriceService from '../services/PriceService.ts';
import { Recipe } from '../../../shared/index.ts';
import UtilityService from '../services/UtilityService.ts';
import OpenService from '../services/OpenService.ts';
import WeaponsmithService from '../services/WeaponsmithService.ts';
import JewelcraftingService from '../services/JewelcraftingService.ts';

export default class RefreshController {
    constructor(
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
        private cookingService: CookingService,
        private utilityService: UtilityService,
        private openService: OpenService,
        private weaponsmithService: WeaponsmithService,
        private jewelcraftingService: JewelcraftingService,
    ) {
    }

    private async getRecipeIds(): Promise<Array<number>> {
        let recipes: Array<Recipe> = (await this.cookingService.getAll())
            .concat(await this.utilityService.getAll())
            .concat(await this.openService.getAll())
            .concat(await this.weaponsmithService.getAll())
            .concat(this.jewelcraftingService.getAll())
        let ids: Array<number> = [];

        for (const recipe of recipes) {
            ids = ids.concat(recipe.input.map((item) => item.id))
                .concat(recipe.output.map((item) => item.id));
        }

        return ids;
    }

    async refresh(req: any, res: any): Promise<void> {
        const requestIds: Array<number> = ((req.query.ids || '') + '').split(
            ',',
        )
            .filter((id) => !!id)
            .map((id) => +id);

        const filename = '../data/ids';
        let fileIds: string = Deno.readTextFileSync(filename);

        let ids: Array<any> = fileIds
            .split('\n')
            .flatMap((ids) => ids.split(','))
            .map((id) => +id)
            .filter((id) => id > 0)
            .concat(await this.getRecipeIds())
            .concat(requestIds);
        ids = [...new Set(ids)];

        let chunkSize = 20;

        Deno.truncateSync(filename);
        Deno.writeTextFileSync(filename, ids.join(','))

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
