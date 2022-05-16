// import { Request, Response } from 'express';
import BltcService from '../services/BltcService.ts';
import CookingService from '../services/CookingService.ts';
import ItemService from '../services/ItemService.ts';
import PriceService from '../services/PriceService.ts';
import { Recipe } from '../../../shared/index.ts';
import OpenService from '../services/OpenService.ts';
import WeaponsmithService from '../services/WeaponsmithService.ts';
import JewelcraftingService from '../services/JewelcraftingService.ts';
import ArtificierService from '../services/ArtificierService.ts';
import HuntsmanService from '../services/HuntsmanService.ts';
import TailorService from "../services/TailorService.ts";
import ArmorsmithService from "../services/ArmorsmithService.ts";
import LeatherworkderService from "../services/LeatherworkerService.ts";

export default class RefreshController {
    constructor(
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
        private cookingService: CookingService,
        private openService: OpenService,
        private weaponsmithService: WeaponsmithService,
        private jewelcraftingService: JewelcraftingService,
        private artificierService: ArtificierService,
        private huntsmanService: HuntsmanService,
        private tailorService: TailorService,
        private armorsmithService: ArmorsmithService,
        private leatherworkerService: LeatherworkderService,
    ) {
    }

    private getRecipeIds(): Array<number> {
        const recipes: Array<Recipe> = this.cookingService.getAll()
            .concat(this.openService.getAll())
            .concat(this.weaponsmithService.getAll())
            .concat(this.jewelcraftingService.getAll())
            .concat(this.artificierService.getAll())
            .concat(this.huntsmanService.getAll())
            .concat(this.tailorService.getAll())
            .concat(this.armorsmithService.getAll())
            .concat(this.leatherworkerService.getAll())
        ;
        let ids: Array<number> = [];

        for (const recipe of recipes) {
            ids = ids.concat(recipe.input.map((item) => item.id))
                .concat(recipe.output.map((item) => item.id));
        }

        return ids;
    }

    public async refresh(req: any, res: any): Promise<void> {
        const requestIds: Array<number> = ((req.query.ids || '') + '')
            .split(',')
            .filter((id) => !!id)
            .map((id) => +id);

        const filename = '../data/ids';
        const fileIds = Deno.readTextFileSync(filename);

        let ids: Array<number> = fileIds
            .split('\n')
            .flatMap((ids) => ids.split(','))
            .map((id) => +id)
            .filter((id) => id > 0)
            .concat(this.getRecipeIds())
            .concat(requestIds);

        ids = ids.concat(await this.itemService.getAllMissingIds(ids));
        ids = [...new Set(ids)];

        let chunkSize = 20;
        const chunked = [];

        for (let i = 0; i < ids.length; i+= chunkSize) {
            chunked.push(ids.slice(i, i + chunkSize).join(','));
        }

        Deno.truncateSync(filename);
        Deno.writeTextFileSync(filename, chunked.join("\n"));

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
