import achievementJson from '../jsonDump/achievements.json';

export default function checkForAchievement(userAchievement: string | number) {
    const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
    const achievement = getKeyValue(achievementJson.achievements, userAchievement.toString() as any)
    return achievement
}