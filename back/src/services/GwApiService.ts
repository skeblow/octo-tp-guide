// import fetch, { Response } from 'node-fetch';
import { Achievement, Item, ItemPrice, ListedItem, Listing } from '../../../shared/index.ts';

export default class GwApiService {
    private readonly BASE_URL = 'https://api.guildwars2.com/v2';

    public async getItems(ids: Array<number>): Promise<Array<Item>> {
        return fetch(this.BASE_URL + '/items?ids=' + ids.join(','))
            .then(res => res.json())
            .then(res => Array.isArray(res) ? res : [])
            .catch(() => []);
    }

    public async getItem(id: number): Promise<Item|null> {
        return fetch(this.BASE_URL + '/items/' + id)
            .then(res => res.json())
            .then(res => !! res.id ? res : null)
            .catch(() => null)
    }

    public async getItemPrices(ids: Array<number>): Promise<Array<ItemPrice>> {
        return fetch(this.BASE_URL + '/commerce/prices?ids=' + ids.join(','))
            .then(res => res.json())
            .then(res => Array.isArray(res) ? res : [])
            .catch(() => []);
    }

    public getDailyAchievements(): Promise<{[key: string]: Array<{id: number}>}> {
        return fetch(this.BASE_URL + '/achievements/daily')
            .then(res => res.json())
            .catch(() => []);
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
            ))
            .catch(() => []);
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
                }))
                .catch(() => []);
            
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
                }))
                .catch(() => []);
            
            buys = buys.concat(items);

            if (items.length < 50) {
                break;
            }
        }

        return buys.reverse();
    }

    public getListingsByIds(ids: Array<number>): Promise<Array<Listing>> {
        return fetch(this.BASE_URL + '/commerce/listings?ids=' + ids.join(','))
            .then(res => res.json())
            .catch(() => []);
    }
}
