import GwApiService from "../services/GwApiService.ts";
import TpService from "../services/TpService.ts";

export default class TpController {
    constructor (
        private gwApiService: GwApiService,
        private tpService: TpService,
    ) {
    }

    public getCurrentSells(req: any, res: any): void {
        const token = req.query.token || '';

        if (! token) {
            throw 'No token provided!';
        }

        this.gwApiService.getCurrentSells(token)
            .then(sells => res.send(sells));
    }

    public getCancelSells(req: any, res: any): void {
        const token = req.query.token || '';

        if (! token) {
            throw 'No token provided!';
        }

        this.tpService.getCancelSells(token)
            .then(sells => res.send(sells));
    }
}
