import { Achievement } from "../../../shared/index.ts";
import GwApiService from "./GwApiService.ts";

export default class DailyService {
    constructor(
        private gwApiService: GwApiService,
    ) {
    }

    public getDailyAchievements(): Promise<any> { // {[key: string]: Array<{id: number}>}
        return this.gwApiService.getDailyAchievements()
            .then(achievements => {
                let ids: Array<number> = [];

                for (const type in achievements) {
                    ids = ids.concat(achievements[type].map((achievement: any) => +achievement.id));
                }

                return this.gwApiService.getAchievementsByIds(ids)
                    .then(fetchedAchievements => {
                        const result: {[key: string]: Array<Achievement>} = {};

                        for (const type in achievements) {
                            const ids: Array<number> = achievements[type].map((achievement: any) => +achievement.id);
                            result[type] = fetchedAchievements.filter((a: Achievement) => ids.includes(a.id));
                        }

                        return result;
                    });
            });
    }
}
