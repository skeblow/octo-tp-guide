import GwApiService from "./GwApiService.ts";

export default class DailyService {
    constructor(
        private gwApiService: GwApiService,
    ) {
    }

    public getDailyAchievements(): Promise<{[key: string]: Array<{id: number}>}> {
        return this.gwApiService.getDailyAchievements()
            .then(achievements => achievements);
    }
}
