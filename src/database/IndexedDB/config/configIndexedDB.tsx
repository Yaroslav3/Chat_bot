export const DB_NAME = 'MessageDB';
export const DB_VERSION = 2;
export const STORE_NAME = 'message';
export const STORE_BTN_CHAT = 'btnChat';

export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(STORE_BTN_CHAT)) {
                const store = db.createObjectStore(STORE_BTN_CHAT, { keyPath: 'id', autoIncrement: true });
                store.createIndex('idChatIndex', 'idChat', { unique: false });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};
