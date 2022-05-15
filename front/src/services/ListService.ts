import { BASE_URL } from "@/config";
import { BasicTrade, RecipeTrade, SalvageTrade } from "../../../shared";

class ListService {
    public getList(list: string): Promise<Array<BasicTrade|RecipeTrade|SalvageTrade>> {
        return fetch(BASE_URL + '/lists/' + list)
            .then(res => res.json());
    }
}

export default new ListService();
