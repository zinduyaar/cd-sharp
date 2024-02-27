import { Preferences } from '@capacitor/preferences';

export class CapacitorStorage implements IOfflineDb {
    async saveData(key: string, data: any): Promise<void> {
        try {
            await Preferences.set({ key, value: JSON.stringify(data) });
        } catch (error) {
            throw new Error('Error saving data to Capacitor Storage: ' + error);
        }
    }

    async getData(key: string): Promise<any> {
        try {
            const { value } = await Preferences.get({ key });
            return value ? JSON.parse(value) : null;
        } catch (error) {
            throw new Error('Error retrieving data from Capacitor Storage: ' + error);
        }
    }
}
