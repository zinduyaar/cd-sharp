import { Capacitor } from '@capacitor/core';
import { IndexedDbStorage } from './IndexedOfflineDb';
import { CapacitorStorage } from './CapacitorOfflineDb';

export class LocalDb {
    getDb(): IOfflineDb {
        if (Capacitor.isNativePlatform()) {
            return new CapacitorStorage();
        } else {
            return new IndexedDbStorage();
        }
    }

}