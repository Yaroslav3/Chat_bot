import {openDB, STORE_BTN_CHAT, STORE_NAME} from '../config/configIndexedDB.tsx';
import {CoreModelsInterface} from '../../../interface/core-models-interface.tsx';
import {TypeMessageEnum, TypeMessageTextEnum} from '../../../enum/type-message.enum.tsx';

export const insertMessageIndexDB = async (
    idChat: string,
    message: string,
    keyboardInline: Array<CoreModelsInterface.BtnDataInlineBtn>[],
    data: string,
    typeMessage: TypeMessageTextEnum,
    send: TypeMessageEnum
) => {
    const db = await openDB();

    return new Promise<{
        id: number;
        idChat: string;
        message: string;
        keyboardInline: Array<CoreModelsInterface.BtnDataInlineBtn>[];
        data: string;
        typeMessage: TypeMessageTextEnum,
        send: TypeMessageEnum
    }>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const request = store.add({ idChat, message, typeMessage, keyboardInline, data, send });

        request.onsuccess = () => {
            const insertedId = request.result;
            const getRequest = store.get(insertedId);

            getRequest.onsuccess = () => {
                if (getRequest.result) {
                    resolve(getRequest.result);
                } else {
                    reject(new Error('Inserted object not found'));
                }
            };

            getRequest.onerror = () => {
                console.error('❌ Error fetching inserted data:', getRequest.error);
                reject(getRequest.error);
            };
        };

        request.onerror = () => {
            console.error('❌ Error inserting data:', request.error);
            reject(request.error);
        };
    });
};
// message
export const fetchDataMessageIndexDB = async (idChat: string): Promise<any[]> => {
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

// remove all messages in chat
export const deleteMessagesByChatIdIndexDB = async (idChat: string): Promise<boolean> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.openCursor();
        let deleted = false;

        request.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest).result;
            if (cursor) {
                if (cursor.value.idChat === idChat) {
                    cursor.delete();
                    deleted = true;
                }
                cursor.continue();
            } else {
                resolve(deleted);
            }
        };

        request.onerror = () => {
            console.error('SQL error:', request.error);
            reject(request.error);
        };
    });
};

// btn_menu
export const insertBtnMenuIndexDB = async (idChat: string, keyboardMenu: string, date: string): Promise<any> => {
    const res = await getBtnMenuByIdChatIndexDB(idChat);
    if (res.length) {
        return await updateBtnDataIndexDB(idChat, keyboardMenu);
    }

    const db = await openDB();
    const transaction = db.transaction(STORE_BTN_CHAT, 'readwrite');
    const store = transaction.objectStore(STORE_BTN_CHAT);

    return new Promise((resolve, reject) => {
        const request = store.add({ idChat, keyboardMenu, date });

        request.onsuccess = (event) => {
            const insertedId = (event.target as IDBRequest).result;
            const getRequest = store.get(insertedId);
            getRequest.onsuccess = () => {
                resolve(getRequest.result);
            };
            getRequest.onerror = () => {
                console.error('Fetch inserted item error:', getRequest.error);
                reject(getRequest.error);
            };
        };

        request.onerror = () => {
            console.error('Insert error:', request.error);
            reject(request.error);
        };
    });
};

export const updateBtnDataIndexDB = async (idChat: string, keyboardMenu: string): Promise<any | null> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_BTN_CHAT, 'readwrite');
    const store = transaction.objectStore(STORE_BTN_CHAT);
    const index = store.index('idChatIndex');

    return new Promise((resolve, reject) => {
        const getRequest = index.get(idChat);

        getRequest.onsuccess = () => {
            const item = getRequest.result;

            if (item) {
                item.keyboardMenu = keyboardMenu;
                const updateRequest = store.put(item);

                updateRequest.onsuccess = () => {
                    // console.log('Updated successfully:', item);
                    resolve(item);
                };

                updateRequest.onerror = () => {
                    console.error('Update error:', updateRequest.error);
                    reject(updateRequest.error);
                };
            } else {
                console.warn('No record found for idChat:', idChat);
                resolve(null);
            }
        };

        getRequest.onerror = () => {
            console.error('Fetch error:', getRequest.error);
            reject(getRequest.error);
        };
    });
};
export const getBtnMenuByIdChatIndexDB = async (idChat: string, limit = 50): Promise<any[]> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_BTN_CHAT, 'readonly');
    const store = transaction.objectStore(STORE_BTN_CHAT);
    const index = store.index('idChatIndex');

    return new Promise((resolve, reject) => {
        const request = index.openCursor(IDBKeyRange.only(idChat), 'prev'); // 'prev' для отримання останніх записів
        const results: any[] = [];

        request.onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor && results.length < limit) {
                results.push(cursor.value);
                cursor.continue();
            } else {
                resolve(results);
            }
        };

        request.onerror = () => {
            console.error('Error fetching btnMenu by idChat with pagination:', request.error);
            reject(request.error);
        };
    });
};

export const removeTableMessageIndexDB = async () => {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => {
            // console.log('Table removed successfully');
            resolve();
        };
        request.onerror = () => {
            console.error('Error removing table:', request.error);
            reject(request.error);
        };
    });
};

export const removeTableBtnChatIndexDB = async () => {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_BTN_CHAT, 'readwrite');
        const store = transaction.objectStore(STORE_BTN_CHAT);
        const request = store.clear();

        request.onsuccess = () => {
            // console.log('Table removed successfully');
            resolve();
        };
        request.onerror = () => {
            console.error('Error removing table:', request.error);
            reject(request.error);
        };
    });
};
