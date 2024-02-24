interface IOfflineDb {
    saveData(key: string, data: any): Promise<void>;
    getData(key: string): Promise<any>;
}
