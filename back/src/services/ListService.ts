import { BasicTrade, RecipeTrade, SalvageTrade } from '../../../shared/index.ts';
import ArtificierService from "./ArtificierService.ts";
import CookingService from './CookingService.ts';
import HuntsmanService from "./HuntsmanService.ts";
import JewelcraftingService from './JewelcraftingService.ts';
import MongoService from './MongoService.ts';
import OpenService from './OpenService.ts';
import RefineService from './RefineService.ts';
import SalvageService from './SalvageService.ts';
import TradeService from './TradeService.ts';
import WeaponsmithService from './WeaponsmithService.ts';
import TailorService from './TailorService.ts';
import ArmorsmithService from "./ArmorsmithService.ts";
import LeatherworkerService from "./LeatherworkerService.ts";

export default class ListService {
    constructor(
        private mongoService: MongoService,
        private tradeService: TradeService,
        private refineService: RefineService,
        private salvageService: SalvageService,
        private cookingService: CookingService,
        private openService: OpenService,
        private weaponsmithService: WeaponsmithService,
        private jewelcraftingService: JewelcraftingService,
        private artificierService: ArtificierService,
        private huntsmanService: HuntsmanService,
        private tailorService: TailorService,
        private armorsmithService: ArmorsmithService,
        private leatherworkerService: LeatherworkerService,
    ) {
    }

    public getCheapBasicList(): Promise<Array<BasicTrade>> {
        return this.getBasicList({
            minRoi: 30,
            minSell: 30,
            minSells: 2_000,
            minBuys: 2_000,
        })
            .then(list => list.filter((trade: BasicTrade) => ! [
                24304, 24339, 24329, 24324, 24319, 24314, 24309, // all cores
                24334, // Pile of Vile Essence
                24335, // Pile of Putrid Essence
                71225, // Wool Patch
                8865, 8869, 8870, 8874, 8867, 8873, 8868, 8878, 8866, // all potent potions
                9440, // Hardened-Sharpening-Stone
                9473, // Quality-Tuning-Crystal
                82866, // Handful of Red Lentils
                21686, // Coarse Leather Strap
                19687, // Silver Ingot
                86287, // Corsair Tuning Crystal
                12506, // Tarragon Leaves
                8826, // Minor Potion of Demon Slaying
                72579, // Sheet of Coarse Paper
                19680, // Copper Ingot
                19738, // Stretched Rawhide Leather Square
                12421, // Raspberry Peach Compote
                24325, // Destroyer Lodestone
            ].includes(trade.item.id)))
            .then((list) => list.sort((trade1: BasicTrade, trade2: BasicTrade) => trade2.roi - trade1.roi));
    }

    public getExpensiveBasicList(): Promise<Array<BasicTrade>> {
        return this.getBasicList({
            minRoi: 25,
            minSell: 20_000,
            minSells: 25,
            minBuys: 25,
        })
            .then((list) =>
                list.filter((trade: BasicTrade) =>
                    ! trade.item.name.includes('Antique')
                    && ! trade.item.name.includes('Berserk')
                    && ! trade.item.name.includes('Marauder')
                    && ! trade.item.name.includes('Viper')
                    && ! trade.item.name.includes('Minstrel')
                    && ! trade.item.name.includes('Freshwater Pearl')
                )
            )
            .then((list) =>
                list.sort((trade1: BasicTrade, trade2: BasicTrade) =>
                    trade1.item.name.localeCompare(trade2.item.name)
                )
            );
    }

    private getBasicList(
        options: {
            minRoi: number;
            minSell: number;
            minSells: number;
            minBuys: number;
        },
    ): Promise<Array<BasicTrade>> {
        return this.mongoService.getBltcCollection()
            .then(
                (collection) =>
                    collection.aggregate([
                        {
                            $group: {
                                _id: '$id',
                                id: { $first: '$id' },
                                bought: { $last: '$bought' },
                                sold: { $last: '$sold' },
                            },
                        },
                        {
                            $match: {
                                bought: { $gt: options.minBuys },
                                sold: { $gt: options.minSells },
                            },
                        },
                    ])
                        .toArray(),
            )
            .then((result) => result.map((obj: any) => obj.id))
            .then((ids) => this.tradeService.getTradesFromItemIds(ids))
            .then((trades) =>
                trades.filter((trade) =>
                    trade.totalSell > options.minSell
                    && trade.profit > 10 
                    && trade.roi > options.minRoi
                    && trade.totalBuy > 0
                )
            );
    }

    public getRefineList(): Promise<Array<RecipeTrade>> {
        return this.tradeService.getTradesFromRecipes(this.refineService.getAll())
            .then((trades) =>
                trades.sort(
                    (trade1, trade2) => {
                        const trade1Name = trade1.input[0].item.name
                            .toLocaleLowerCase();
                        const trade2Name = trade2.input[0].item.name
                            .toLocaleLowerCase();

                        return trade1Name.localeCompare(trade2Name);
                    },
                )
            );
    }

    public getSalvageList(): Promise<Array<SalvageTrade>> {
        return this.salvageService.getAll()
            .then((recipes) =>
                this.tradeService.getTradesFromSalvageRecipes(recipes)
            );
    }

    public getOpenList(): Promise<Array<SalvageTrade>> {
        return this.tradeService.getTradesFromSalvageRecipes(this.openService.getAll());
    }

    public getRecipeList(list: string): Promise<Array<RecipeTrade>> {
        let recipes;

        switch (list) {
            case 'cooking':
                recipes = this.cookingService.getAll();
                break;
            case 'weaponsmith':
                recipes = this.weaponsmithService.getAll();
                break;
            case 'jewelcrafting':
                recipes = this.jewelcraftingService.getAll();
                break;
            case 'artificier':
                recipes = this.artificierService.getAll();
                break;
            case 'huntsman':
                recipes = this.huntsmanService.getAll();
                break;
            case 'tailor':
                recipes = this.tailorService.getAll();
                break;
            case 'armorsmith':
                recipes = this.armorsmithService.getAll();
                break;
            case 'leatherworker':
                recipes = this.leatherworkerService.getAll();
                break;
            default: throw 'unknown list'; 
        }

        return this.tradeService.getTradesFromRecipes(recipes)
            .then((trades: Array<RecipeTrade>) => {
                return trades.sort((t1: RecipeTrade, t2: RecipeTrade): number => {
                    if (t1.roi < 10) {
                        return 1;
                    }
    
                    if (t2.roi < 10) {
                        return -1;
                    }

                    const t1Prefix: string = t1.output.item.name.split(' ')[0] ?? '';
                    const t2Prefix: string = t2.output.item.name.split(' ')[0] ?? '';

                    const t1PartNumber: number = this.getItemPartNumber(t1.output.item.name);
                    const t2PartNumber: number = this.getItemPartNumber(t2.output.item.name);

                    return t1Prefix.localeCompare(t2Prefix) 
                        || (t2PartNumber - t1PartNumber) 
                        || t1.output.item.name.localeCompare(t2.output.item.name);
                });
            });
    }

    private getItemPartNumber(name: string): number {
        name = name.toLocaleLowerCase();
        // boots
        // coat
        // gloves
        // helm
        // legs
        // shoulder

        if (name.includes('boots')) {
            return 6;
        }

        if (name.includes('coat')) {
            return 5
        }

        if (name.includes('gloves') || name.includes('gauntlets')) {
            return 4;
        }

        if (name.includes('helm') || name.includes('masque')) {
            return 3;
        }

        if (name.includes('legs') || name.includes('pants')) {
            return 2;
        }

        if (name.includes('shoulders') || name.includes('pauldrons') || name.includes('mantle')) {
            return 1;
        }

        // rever
        // carver
        // broadsword
        // bludgeoner
        // shield
        // sabre

        if (name.includes('rever')) {
            return 6;
        }

        if (name.includes('carver')) {
            return 5;
        }

        if (name.includes('broadsword')) {
            return 4;
        }

        if (name.includes('bludgeoner')) {
            return 3;
        }

        if (name.includes('shield')) {
            return 2;
        }

        if (name.includes('sabre')) {
            return 1;
        }


        // speargun
        // stinger
        // handcannon
        // blunderbuss
        // needler
        // torch
        // siren

        if (name.includes('speargun')) {
            return 7;
        }

        if (name.includes('stinger')) {
            return 6;
        }

        if (name.includes('handcannon')) {
            return 5;
        }

        if (name.includes('blunderbuss')) {
            return 4;
        }

        if (name.includes('needler')) {
            return 3;
        }

        if (name.includes('torch')) {
            return 2;
        }

        if (name.includes('siren')) {
            return 1;
        }

        // conch
        // rod
        // quaterstaff

        if (name.includes('conch')) {
            return 3;
        }

        if (name.includes('rod')) {
            return 2;
        }

        if (name.includes('quaterstaff')) {
            return 1;
        }

        return 0;
    }
}
