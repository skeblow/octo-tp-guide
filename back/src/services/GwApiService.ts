// import fetch, { Response } from 'node-fetch';
import { Achievement, Item, ItemPrice, ListedItem, Listing } from '../../../shared/index.ts';

export default class GwApiService {
    private readonly BASE_URL = 'https://api.guildwars2.com/v2';

    public async getItems(ids: Array<number>): Promise<Array<Item>> {
        const res = await fetch(this.BASE_URL + '/items?ids=' + ids.join(','));
        const items = await res.json();

        return Array.isArray(items) ? items : [];
    }

    public async getItem(id: number): Promise<Item|null> {
        const res = await fetch(this.BASE_URL + '/items/' + id);
        const item: any = await res.json();

        return !! item.id ? item : null;
    }

    public async getItemPrices(ids: Array<number>): Promise<Array<ItemPrice>> {
        const res = await fetch(
            this.BASE_URL + '/commerce/prices?ids=' + ids.join(','),
        );
        const prices = await res.json();

        return Array.isArray(prices) ? prices : [];
    }

    public getDailyAchievements(): Promise<{[key: string]: Array<{id: number}>}> {
        return fetch(this.BASE_URL + '/achievements/daily')
            .then(res => res.json());
    }

    public getAchievementsByIds(ids: Array<number>): Promise<Array<Achievement>> {
        return fetch(this.BASE_URL + '/achievements?ids=' + ids.join(','))
            .then(res => res.json())
            .then((achievements: Array<Achievement>) => achievements.map(
                achievement => {
                    return {
                        ...achievement,
                        name: achievement.name.replace('Daily ', ''),
                    };
                },
            ));
    }

    public async getCurrentSells(token: string): Promise<Array<ListedItem>> {
        let sells: Array<ListedItem> = [];

        for (let i = 0; i < 5; i++) {
            const items: Array<any> = await fetch(this.BASE_URL + '/commerce/transactions/current/sells?access_token=' + token + '&page=' + i)
                .then(res => res.json())
                .then(res => {
                    if (! Array.isArray(res)) {
                        return [];
                    }

                    return res;
                })
                .then((res: Array<any>) => res.map(val => {
                    return {
                        id: val.id,
                        itemId: val.item_id,
                        price: val.price,
                        quantity: val.quantity,
                        createdAt: new Date(val.created),
                    };
                }));
            
            sells = sells.concat(items);

            if (items.length < 50) {
                break;
            }
        }

        return sells.reverse();
    }

    public async getCurrentBuys(token: string): Promise<Array<ListedItem>> {
        let buys: Array<ListedItem> = [];

        for (let i = 0; i < 5; i++) {
            const items: Array<any> = await fetch(this.BASE_URL + '/commerce/transactions/current/buys?access_token=' + token + '&page=' + i)
                .then(res => res.json())
                .then(res => {
                    if (! Array.isArray(res)) {
                        return [];
                    }

                    return res;
                })
                .then((res: Array<any>) => res.map(val => {
                    return {
                        id: val.id,
                        itemId: val.item_id,
                        price: val.price,
                        quantity: val.quantity,
                        createdAt: new Date(val.created),
                    };
                }));
            
            buys = buys.concat(items);

            if (items.length < 50) {
                break;
            }
        }

        return buys.reverse();
    }

    public getListingsByIds(ids: Array<number>): Promise<Array<Listing>> {
        return fetch(this.BASE_URL + '/commerce/listings?ids=' + ids.join(','))
            .then(res => res.json());
    }
}
