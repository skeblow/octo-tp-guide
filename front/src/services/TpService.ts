import { BASE_URL } from '@/config';
import { ListedItem, ListedItemToCancel } from '../../../shared';

class TpService {
    public getCurrentSells(token: string): Promise<Array<ListedItem>> {
        return fetch(BASE_URL + '/tp/current/sells?token=' + token)
            .then(res => res.json())
    }

    public getCancelSells(token: string): Promise<Array<ListedItemToCancel>> {
        return fetch(BASE_URL + '/tp/cancel/sells?token=' + token)
            .then(res => res.json())
    }

    public getCurrentBuys(token: string): Promise<Array<ListedItem>> {
        return fetch(BASE_URL + '/tp/current/buys?token=' + token)
            .then(res => res.json())
    }

    public getCancelBuys(token: string): Promise<Array<ListedItemToCancel>> {
        return fetch(BASE_URL + '/tp/cancel/buys?token=' + token)
            .then(res => res.json())
    }
}

export default new TpService();
