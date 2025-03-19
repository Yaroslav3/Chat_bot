
import { db } from '../config/configSql.tsx';
import SQLite, {} from 'react-native-sqlite-storage';

const CREATE_TABLE_MESSAGE = 'CREATE TABLE IF NOT EXISTS message (id INTEGER PRIMARY KEY AUTOINCREMENT, idChat INTEGER, message TEXT, data DATE)';
const SELECT_MESSAGE_BY_ID_CHAT = 'SELECT * FROM message WHERE idChat = ?';
const INSERT_MESSAGE_BY_ID_CHAT = 'INSERT INTO message (idChat, message, data) VALUES (?, ?, ?)';
const DROP_TABLE_MESSAGE = 'DROP TABLE IF EXISTS message';

export const removeTableMessage = async () => {
    return new Promise<void>((resolve, reject) => {
        db.transaction((tx: SQLite.Transaction) => {
            tx.executeSql(DROP_TABLE_MESSAGE, [],
                () => {
                    console.log('Table removed successfully');
                    resolve();
                },
                (tx: SQLite.Transaction, error) => {
                    console.error('Error removing table:', error);
                    reject(error);
                }
            );
        });
    });
};

export const createTableMessage = async () => {
    await db.transaction((tx: SQLite.Transaction) => {
        tx.executeSql(CREATE_TABLE_MESSAGE,
            [],
            () => console.log('Table created successfully')
        );
    });
};

export const insertMessage = async (idChat: number, message: string, data: string) => {
    return new Promise<void>((resolve, reject) => {
        db.transaction((tx: SQLite.Transaction) => {
            tx.executeSql(INSERT_MESSAGE_BY_ID_CHAT,
                [idChat, message, data],
                () => {
                    console.log('Data inserted successfully');
                    resolve();
                },
                (error) => {
                    console.error('Error inserting data', error);
                    reject(error);
                }
            );
        });
    });
};

export const fetchDataMessageByIDChat = (idChat: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: SQLite.Transaction) => {
            tx.executeSql(SELECT_MESSAGE_BY_ID_CHAT,
                [idChat],
                (tx: SQLite.Transaction, results) => {
                    const rows = results.rows.raw();
                    resolve(rows);
                },
                (tx: SQLite.Transaction, error) => {
                    console.error('SQL error:', error);
                    reject(error);
                }
            );
        });
    });
};
