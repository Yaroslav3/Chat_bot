import {openDB, STORE_NAME} from '../config/configIndexedDB.tsx';

export const removeTableMessageIndexDB = async () => {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => {
            console.log('Table removed successfully');
            resolve();
        };
        request.onerror = () => {
            console.error('Error removing table:', request.error);
            reject(request.error);
        };
    });
};

export const insertMessageIndexDB = async (idChat: number, message: string, data: string) => {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add({ idChat, message, data });

        request.onsuccess = () => {
            console.log('Data inserted successfully');
            resolve();
        };
        request.onerror = () => {
            console.error('Error inserting data:', request.error);
            reject(request.error);
        };
    });
};
export const fetchDataMessageIndexDB = async (idChat: number): Promise<any[]> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            const rows = request.result.filter((msg: any) => msg.idChat === idChat);
            resolve(rows);
        };
        request.onerror = () => {
            console.error('SQL error:', request.error);
            reject(request.error);
        };
    });
};
