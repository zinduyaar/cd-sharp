import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export class CapacitorStorage implements IOfflineDb {
    async saveData(key: string, data: any): Promise<void> {
        try {
            await Storage.set({ key, value: JSON.stringify(data) });
        } catch (error) {
            throw new Error('Error saving data to Capacitor Storage: ' + error);
        }
    }

    async getData(key: string): Promise<any> {
        try {
            const { value } = await Storage.get({ key });
            return value ? JSON.parse(value) : null;
        } catch (error) {
            throw new Error('Error retrieving data from Capacitor Storage: ' + error);
        }
    }
}
