import { BASE_URL } from '@/config';

class DailyService {
    public getDailyAchievements(): Promise<any> {
        return fetch(BASE_URL + '/daily')
            .then(res => res.json());
    }
}

export default new DailyService();