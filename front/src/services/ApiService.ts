class ApiService {
    readonly BASE_URL = 'https://api.guildwars2.com/v2';

    public getActiveListingIds(token: string): Promise<Array<number>> {
        return Promise.all([
            fetch(this.BASE_URL + '/commerce/transactions/current/sells?access_token=' + token + '&page=0'),
            fetch(this.BASE_URL + '/commerce/transactions/current/sells?access_token=' + token + '&page=1'),
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(val => val.flatMap(val => val.map((obj: any) => obj.item_id)));
    }
}

export default new ApiService();
