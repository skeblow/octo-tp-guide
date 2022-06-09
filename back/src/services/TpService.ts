import { Item, ItemBltc, ItemPrice, ListedItem, ListedItemToCancel, Listing } from "../../../shared/index.ts";
import GwApiService from "./GwApiService.ts";
import ItemService from "./ItemService.ts";
import PriceService from "./PriceService.ts";
import BltcService from "./BltcService.ts";

export default class TpService {
    constructor(
        private gwApiService: GwApiService,
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
    ) {
    }

    public getCancelSells(token: string): Promise<Array<ListedItemToCancel>> {
        return this.gwApiService.getCurrentSells(token)
            .then(listedItems => {
                let itemIds = listedItems.map((listedItem: ListedItem) => listedItem.itemId);
                itemIds = [...new Set(itemIds)];

                return Promise.all([
                    this.itemService.getAllByIds(itemIds),
                    this.priceService.getPricesByIds(itemIds),
                    this.gwApiService.getListingsByIds(itemIds),
                    this.bltcService.getBltcByIds(itemIds),
                ])
                    .then(([items, itemPrices, listings, bltcs]: [Array<Item>, Array<ItemPrice>, Array<Listing>, Array<ItemBltc>]) => listedItems.map(
                        listedItem => {
                            const item = items.find(item => item.id === listedItem.itemId) as Item;
                            const itemPrice = itemPrices.find(itemPrice => itemPrice.id === listedItem.itemId) as ItemPrice;
                            const diff = Math.round((listedItem.price - itemPrice.sells.unit_price) / listedItem.price * 100);
                            const listing = listings.find(listing => listing.id === listedItem.itemId) as Listing;
                            const bltc = bltcs.find(bltc => bltc.id === listedItem.itemId) as ItemBltc;

                            return {
                                listedItem,
                                item,
                                itemPrice,
                                diff,
                                listing,
                                shouldCancel: this.shouldCancelSell(listedItem, listing, bltc),
                            };
                        }
                    ))
            });
    }

    private shouldCancelSell(listedItem: ListedItem, listing: Listing, bltc: ItemBltc): boolean {
        const now = new Date();
        const createdAt = new Date(listedItem.createdAt);
        const dateDiff = Math.ceil((createdAt.valueOf() - now.valueOf()) / (1000 * 60 * 60 * 24));

        if (dateDiff > -2) {
            return false;
        }

        let position = 0;

        for (const sell of listing.sells) {
            if (sell.unit_price === listedItem.price) {
                break;
            }

            position += sell.quantity;
        }

        return position >= bltc.sold * 0.75;
    }
}
