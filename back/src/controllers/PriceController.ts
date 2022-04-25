import PriceService from '../services/PriceService.ts';

export default class PriceController {
    constructor(
        private priceService: PriceService,
    ) {
    }

    get(req: any, res: any): void {
        const ids = ((req.query.ids || '') + '').split(',')
            .filter((id) => !!id)
            .map((id) => +id);

        if (ids.length === 0) {
            res.send([]);

            return;
        }

        this.priceService.getPricesByIds(ids)
            .then((prices) => res.send(prices));
    }
}
