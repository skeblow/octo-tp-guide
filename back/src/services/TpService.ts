import { Item, ItemPrice, ListedItem, ListedItemToCancel } from "../../../shared/index.ts";
import GwApiService from "./GwApiService.ts";
import ItemService from "./ItemService.ts";
import PriceService from "./PriceService.ts";

export default class TpService {
    constructor(
        private gwApiService: GwApiService,
        private itemService: ItemService,
        private priceService: PriceService,
    ) {
    }

    public getCancelSells(token: string): Promise<Array<ListedItemToCancel>> {
        return this.gwApiService.getCurrentSells(token)
            .then(listedItems => {
                const itemIds = listedItems.map((listedItem: ListedItem) => listedItem.itemId);

                return Promise.all([
                    this.itemService.getAllByIds(itemIds),
                    this.priceService.getPricesByIds(itemIds),
                ])
                    .then(([items, itemPrices]: [Array<Item>, Array<ItemPrice>]) => listedItems.map(
                        listedItem => {
                            const item = items.find(item => item.id === listedItem.itemId) as Item;
                            const itemPrice = itemPrices.find(itemPrice => itemPrice.id === listedItem.itemId) as ItemPrice;
                            const diff = Math.round((listedItem.price - itemPrice.sells.unit_price) / listedItem.price * 100);

                            return {
                                listedItem,
                                item,
                                itemPrice,
                                diff,
                            };
                        }
                    ))
            })
    }
}
