import { BASE_URL } from "@/config";
import { BasicTrade, RecipeTrade, SalvageTrade } from "../../../shared";

class ListService {
    public async getCheapBasicList(): Promise<Array<BasicTrade>> {
        const res = await fetch(BASE_URL + '/lists/cheap');

        return await res.json();
    }

    async getExpensiveBasicList(): Promise<Array<BasicTrade>> {
        const res = await fetch(BASE_URL + '/lists/expensive');

        return await res.json();
    }

    async getRefineList(): Promise<Array<RecipeTrade>> {
        const res = await fetch(BASE_URL + '/lists/refine');

        return await res.json();
    }

    public async getSalvageList(): Promise<Array<SalvageTrade>> {
        const res = await fetch(BASE_URL + '/lists/salvage');

        return await res.json();
    }

    public async getCookingList(): Promise<Array<RecipeTrade>> {
        const res = await fetch(BASE_URL + '/lists/cooking');

        return await res.json();
    }

    public async getUtilityList(): Promise<Array<RecipeTrade>> {
        const res = await fetch(BASE_URL + '/lists/utility');

        return await res.json();
    }

    public async getOpenList(): Promise<Array<RecipeTrade>> {
        const res = await fetch(BASE_URL + '/lists/open');

        return await res.json();
    }

    public async getWeaponsmithList(): Promise<Array<RecipeTrade>> {
        const res = await fetch(BASE_URL + '/lists/weaponsmith');

        return await res.json();
    }

    public async getJewelcraftingList(): Promise<Array<RecipeTrade>> {
        const res = await fetch(BASE_URL + '/lists/jewelcrafting');

        return await res.json();
    }

    public async getArtificierList(): Promise<Array<RecipeTrade>> {
        const res = await fetch(BASE_URL + '/lists/artificier');

        return await res.json();
    }

    public getHuntsmanList(): Promise<Array<RecipeTrade>> {
        return fetch(BASE_URL + '/lists/huntsman')
            .then(res => res.json());
    }

    public getTailorList(): Promise<Array<RecipeTrade>> {
        return fetch(BASE_URL + '/lists/tailor')
            .then(res => res.json());
    }
}

export default new ListService();
