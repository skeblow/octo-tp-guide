import { BankItem } from "../../../shared";

class ApiService {
    readonly BASE_URL = 'https://api.guildwars2.com/v2';

    public getActiveListingIds(token: string): Promise<Array<number>> {
        return Promise.all([
            fetch(this.BASE_URL + '/commerce/transactions/current/sells?access_token=' + token + '&page=0'),
            fetch(this.BASE_URL + '/commerce/transactions/current/sells?access_token=' + token + '&page=1'),
        ])
            .then((res) => Promise.all(res.map(res => res.json())))
            .then((res: Array<Array<any>|object>) => res.filter(item => Array.isArray(item)))
            .then(res => res.flatMap((val: any) => val.map((obj: any) => obj.item_id)));
    }

    public getBankMaterials(token: string): Promise<Array<BankItem>> {
        return fetch('https://api.guildwars2.com/v2/account/materials?access_token=' + token)
            .then(res => res.json());
    }
}

export default new ApiService();
