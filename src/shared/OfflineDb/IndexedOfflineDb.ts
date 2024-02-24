export class IndexedDbStorage implements IOfflineDb {
    constructor() {
        this.initializeIndexedDB();
    }
    initializeIndexedDB = () => {
        const request = indexedDB.open('textEditorDB');

        request.onerror = function (event: any) {
            console.error('IndexedDB error:', event.target.error);
        };

        request.onsuccess = function (event: any) {

            console.log('IndexedDB initialized');
        };

        request.onupgradeneeded = function (event: any) {
            const db = (event.target as IDBOpenDBRequest).result;
            db.createObjectStore('text', { keyPath: 'id' });
        };
    };
    async saveData(key: string, data: any): Promise<void> {
        const request = indexedDB.open('textEditorDB', 1);

        request.onerror = function (event: any) {
            console.error('IndexedDB error:', event.target.error);
        };

        request.onsuccess = function (event: any) {
            const db = event.target.result;
            const transaction = db.transaction(key, 'readwrite');
            const objectStore = transaction.objectStore(key);
            const addRequest = objectStore.put(data);

            addRequest.onsuccess = function () {
                console.log('Data saved to IndexedDB');
            };

            addRequest.onerror = function (event: any) {
                console.error('Error saving data to IndexedDB:', event.target.error);
            };
        };
    }

    async getData(key: string): Promise<any> {
        return new Promise((resolve, reject) => {

            const request = indexedDB.open('textEditorDB', 1);

            request.onerror = function (event: any) {
                console.error('IndexedDB error:', event.target.error);
                reject();
            };

            request.onsuccess = function (event: any) {
                const db = event.target.result;
                const transaction = db.transaction([key], 'readonly');
                const objectStore = transaction.objectStore(key);
                const getRequest = objectStore.get(1);

                getRequest.onsuccess = function (event: any) {
                    const data = event.target.result;
                    if (data) {
                        resolve(data);
                    } else {
                        resolve(undefined);
                    }
                };

                getRequest.onerror = function (event: any) {
                    console.error('Error reading data from IndexedDB:', event.target.error);
                    reject();
                };
            };
        });
    }
}