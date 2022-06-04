import { BankItem, ListedItem } from "../../../shared";

class ApiService {
    readonly BASE_URL = 'https://api.guildwars2.com/v2';

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
