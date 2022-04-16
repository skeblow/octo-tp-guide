import { BasicTrade, RecipeTrade, SalvageTrade } from "../../../shared";

class ListService {
    readonly BASE_URL = 'http://localhost:3000';

    async getCheapBasicList(): Promise<Array<BasicTrade>> {
        const res = await fetch(this.BASE_URL + '/lists/cheap');

        return await res.json();
    }

    async getExpensiveBasicList(): Promise<Array<BasicTrade>> {
        const res = await fetch(this.BASE_URL + '/lists/expensive');

        return await res.json();
    }

    async getRefineList(): Promise<Array<RecipeTrade>> {
        const res = await fetch(this.BASE_URL + '/lists/refine');

        return await res.json();
    }

    async getSalvageList(): Promise<Array<SalvageTrade>> {
        const res = await fetch(this.BASE_URL + '/lists/salvage');

        return await res.json();
    }

    async getCookingList(): Promise<Array<RecipeTrade>> {
        const res = await fetch(this.BASE_URL + '/lists/cooking');

        return await res.json();
    }

    async getUtilityList(): Promise<Array<RecipeTrade>> {
        const res = await fetch(this.BASE_URL + '/lists/utility');

        return await res.json();
    }

    async getOpenList(): Promise<Array<RecipeTrade>> {
        const res = await fetch(this.BASE_URL + '/lists/open');

        return await res.json();
    }
}

export default new ListService();
