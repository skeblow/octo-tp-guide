import { Request, Response } from "express";
import BltcService from "../services/BltcService";
import ItemService from "../services/ItemService";
import PriceService from "../services/PriceService";

export default class ItemController {
    constructor(
        private itemService: ItemService,
        private priceService: PriceService,
        private bltcService: BltcService,
    ) {
    }

    getAll(req: Request, res: Response): void {
        const ids = ((req.query.ids || '') + '').split(',')
            .filter(id => !! id)
            .map(id => +id);

        if (ids.length === 0) {
            this.itemService.getAll()
                .then(items => res.send(items));

            return;
        }

        this.itemService.getAllByIds(ids)
            .then(items => res.send(items));
    }

    get(req: Request, res: Response): void {
        const id = parseInt(req.params['id']);

        this.itemService.getItemById(id)
            .then(item => {
                res.send(item);
            });
    }

    getBltc(req: Request, res: Response): void {
        const ids = ((req.query.ids || '') + '').split(',')
            .filter(id => !! id)
            .map(id => +id);

        if (ids.length === 0) {
            res.send([]);

            return;
        }

        this.bltcService.getBltc(97919)
            .then(prices => res.send(prices));
    }
<<<<<<< HEAD
=======

    async refresh(req: Request, res: Response): Promise<void> {
        const rawIds = [
            '19748,19745,19718,19739,19741,19743,82796',
            '19720,19746,19747,19742,19740,19744,46741,72845',
            '19698,19700,19703,19697,19699,19701,19702',
            '19684,19679,19682,19683,19687,19685,19680,19686,19688,19681,94270,46738,46743,80714',
            '19719,19729,19728,19730,19732,19731',
            '19735,19738,19737,19733,19734,19736,46739',
            '19723,19726,19722,19727,19724,19725',
            '19710,19713,19709,19711,19712,19714,46736',
            '24341,24345,24343,24358,24344,24342',
            '24350,24347,24348,24346,24351,24349',
            '24276,24272,24274,24277,24273,24275',
            '24356,24353,24354,24352,24355,24357,48805,36059',
            '24288,24286,24285,24289,24287,24284',
            '24299,24298,24300,24297,24296,24363',
            '24282,24279,24283,24280,24281,24278',
            '24294,24295,24290,24291,24292,24293',
            '37897,73034,44941,74328,83103,71641,74202',
            '24335,24331,24334,24333,24332,75648',
            '24309,24308,24306,24307,24310',
            '24314,24315,24311,24313,24312',
            '24316,24320,24317,24318,24319',
            '24324,24325,24322,24321,24323',
            '43773,89271,24330,24328,24327,24326,24329',
            '24339,24337,24336,24340,24338',
            '24304,24301,24305,67832,24302,24303',
            '70842,68942,75015,75857,71049,71428',
            '43792,43786,43787,43782,43784,43790,43789,43794,43781,43783,43788,43791,43785,43796,43797,43795,43793,43780',
            '43855,43847,43857,43845,43851,43849,43853,43856,43854,43852,43862,43846,43860,43859,43850,43858,43844,43861,43848',
            '71075,74671,77087,74101,71794,73960,74321,73045,71073,73740,75779,72666,71836,72308,72015,71919,73927,73198',
            '47088,73000,73576,72395,76287,70581,75740,71768,76641,73959,75575,76756,74122,71864,76928,73284,73054,72064,71548,75826',
            '43864,43863,43865,71654,76704,73962',
            '23040,23043,19986,19718,19739,19741,19743,19748,19745,19721,46681,19719,19728,19730,19731,19722,19723,19726,19727,19724,19725,19729,19732,19697,19699,19703,19698,19702,19700,19701',
            '12535,67367,8868,71069,67368,24353,36077,71225,12178,70842,97105,19757,91751,77630,96762,21161,36080,68634,12147,12342,24314,9440',
        ];
        const ids: Array<number> = rawIds.join(',').split(',').map(id => +id);
        const chunkSize = 100;

        for (let i = 0; i < ids.length; i += chunkSize) {
            const chunk = ids.slice(i, i + chunkSize);

            await this.itemService.getAllByIds(chunk);
            await this.priceService.getPricesByIds(chunk);
            await this.bltcService.getBltcByIds(chunk);
        }

        res.send('done');
    }

>>>>>>> 4f79385 (stuff)
}
