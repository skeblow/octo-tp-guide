import { BasicTrade, RecipeTrade, SalvageTrade } from '../../../shared/index.ts';
import CookingService from './CookingService.ts';
import JewelcraftingService from './JewelcraftingService.ts';
import MongoService from './MongoService.ts';
import OpenService from './OpenService.ts';
import RefineService from './RefineService.ts';
import SalvageService from './SalvageService.ts';
import TradeService from './TradeService.ts';
import UtilityService from './UtilityService.ts';
import WeaponsmithService from './WeaponsmithService.ts';

export default class ListService {
    constructor(
        private mongoService: MongoService,
        private tradeService: TradeService,
        private refineService: RefineService,
        private salvageService: SalvageService,
        private cookingService: CookingService,
        private utilityService: UtilityService,
        private openService: OpenService,
        private weaponsmithService: WeaponsmithService,
        private jewelcraftingService: JewelcraftingService,
    ) {
    }

    public getCheapBasicList(): Promise<Array<BasicTrade>> {
        return this.getBasicList({
            minRoi: 30,
            minSell: 30,
            minSells: 1_500,
            minBuys: 1_500,
        })
            .then((list) =>
                list.sort((trade1: BasicTrade, trade2: BasicTrade) =>
                    trade2.roi - trade1.roi
                )
            );
    }

    public getExpensiveBasicList(): Promise<Array<BasicTrade>> {
        return this.getBasicList({
            minRoi: 30,
            minSell: 20_000,
            minSells: 25,
            minBuys: 25,
        })
            .then((list) =>
                list.filter((trade: BasicTrade) =>
                    !trade.item.name.includes('Antique')
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
                    trade.totalSell > options.minSell && trade.profit > 10 &&
                    trade.roi > options.minRoi
                )
            );
    }

    public getRefineList(): Promise<Array<RecipeTrade>> {
        return this.refineService.getAll()
            .then((recipes) => this.tradeService.getTradesFromRecipes(recipes))
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
        return this.openService.getAll()
            .then((recipes) =>
                this.tradeService.getTradesFromSalvageRecipes(recipes)
            );
    }

    public getCookingList(): Promise<Array<RecipeTrade>> {
        return this.tradeService.getTradesFromRecipes(
            this.cookingService.getAll()
        );
    }

    public getUtilityList(): Promise<Array<RecipeTrade>> {
        return this.utilityService.getAll()
            .then((recipes) => this.tradeService.getTradesFromRecipes(recipes));
    }

    public getWeaponsmithList(): Promise<Array<RecipeTrade>> {
        return this.tradeService.getTradesFromRecipes(
            this.weaponsmithService.getAll(),
        );
    }

    public getJewelcraftingList(): Promise<Array<RecipeTrade>> {
        return this.tradeService.getTradesFromRecipes(
            this.jewelcraftingService.getAll(),
        );
    }
}
