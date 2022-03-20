import fetch, { Response } from "node-fetch";

export default class GwApiService {
    private readonly BASE_URL = 'https://api.guildwars2.com/v2';

    getItem(id: number): Promise<object> {
        return fetch(this.BASE_URL + '/items/' + id)
            .then((res: Response) => res.json() as any);
    }       
}
