import fetch, { Response } from "node-fetch";

export default class GwApiService {
    private readonly BASE_URL = 'https://api.guildwars2.com/v2';

    getItem(id: number): Promise<object> {
        return fetch(this.BASE_URL + '/items/' + id)
            .then((res: Response) => res.json() as any);
    }

    getItemPrices(ids: Array<number>): Promise<any> {
        return fetch(this.BASE_URL + '/commerce/prices?ids=' + ids.join(','))
            .then((res: Response) => res.json() as any)
            .then(items => {
                console.log(items);

                return items;
            })
    }
}
