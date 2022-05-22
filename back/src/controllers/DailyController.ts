import DailyService from "../services/DailyService.ts";

export default class DailyController {
    constructor (
        private dailyService: DailyService,
    ) {
    }

    public get(req: any, res: any) {
        this.dailyService.getDailyAchievements()
            .then(achievements => res.send(achievements));
    }
}
