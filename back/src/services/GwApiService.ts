// import fetch, { Response } from 'node-fetch';
import { Achievement, Item, ItemPrice, ListedItem } from '../../../shared/index.ts';

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

    public getCurrentSells(token: string): Promise<Array<ListedItem>> {
        return Promise.all([
            fetch(this.BASE_URL + '/commerce/transactions/current/sells?access_token=' + token + '&page=0'),
            fetch(this.BASE_URL + '/commerce/transactions/current/sells?access_token=' + token + '&page=1'),
            fetch(this.BASE_URL + '/commerce/transactions/current/sells?access_token=' + token + '&page=2'),
        ])
            .then((res) => Promise.all(res.map(res => res.json())))
            .then((res: Array<Array<any>|object>) => res.filter(item => Array.isArray(item)))
            .then(res => res.flat())
            .then(res => res.map(val => {
                return {
                    id: val.id,
                    itemId: val.item_id,
                    price: val.price,
                    quantity: val.quantity,
                    createdAt: val.created,
                };
            }))
            .then(res => res.reverse());
    }
}
