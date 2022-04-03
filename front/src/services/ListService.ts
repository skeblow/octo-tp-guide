import { BasicTrade } from "../../../shared";

class ListService {
    readonly BASE_URL = 'http://localhost:3000';

    async getBasicList(): Promise<Array<BasicTrade>> {
        const res = await fetch(this.BASE_URL + '/lists/');

        return await res.json();
    }
}

export default new ListService();
