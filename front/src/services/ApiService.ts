import { BankItem, ListedItem } from "../../../shared";

class ApiService {
    readonly BASE_URL = 'https://api.guildwars2.com/v2';

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

    public getBankMaterials(token: string): Promise<Array<BankItem>> {
        return Promise.all([
            fetch(this.BASE_URL + '/account/bank?access_token=' + token),
            fetch(this.BASE_URL + '/account/materials?access_token=' + token),
        ])
            .then(res => Promise.all(res.map(res => res.json())))
            .then(res => res.flat())
            .then(res => res.filter(item => item !== null && item.count > 0));
    }

    public getDailyAchievements(): Promise<any> {
        return fetch(this.BASE_URL + '/achievements/daily')
            .then(res => res.json());
    }
}

export default new ApiService();
