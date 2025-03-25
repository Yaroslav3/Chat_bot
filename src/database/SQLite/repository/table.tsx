import { db } from '../config/configSql.tsx';
import SQLite, {} from 'react-native-sqlite-storage';
import {CoreModelsInterface} from "../../../interface/core-models-interface.tsx";
import {TypeMessageEnum, TypeMessageTextEnum} from "../../../enum/type-message.enum.tsx";

const CREATE_TABLE_MESSAGE = 'CREATE TABLE IF NOT EXISTS message (id INTEGER PRIMARY KEY AUTOINCREMENT, idChat INTEGER, message TEXT, typeMessage TEXT,  keyboardInline TEXT, data DATE)';
const SELECT_MESSAGE_BY_ID_CHAT = 'SELECT * FROM message WHERE idChat = ?';
const INSERT_MESSAGE_BY_ID_CHAT = 'INSERT INTO message (idChat, message, typeMessage, keyboardInline, data, send) VALUES (?, ?, ?, ?, ?, ?)';
const DROP_TABLE_MESSAGE = 'DROP TABLE IF EXISTS message';
const DROP_All_MESSAGE_BY_ID_CHAT = 'DELETE FROM messages WHERE idChat = ?';


const CREATE_TABLE_BTN_MENU = 'CREATE TABLE IF NOT EXISTS btnMenu (id INTEGER PRIMARY KEY AUTOINCREMENT, idChat TEXT, keyboardMenu TEXT, data DATE)';
const INSERT_BTN_MENU = 'INSERT INTO btnMenu (idChat, keyboardMenu, data) VALUES (?, ?, ?)';
const UPDATE_BTN_MENU = 'UPDATE btnMenu SET btnData = ? WHERE idChat = ?';
const GET_BTN_MENU_BY_CHAT_ID = 'SELECT * FROM btnMenu WHERE idChat = ?';
const DROP_TABLE_BTN_MENU = 'DROP TABLE IF EXISTS btnMenu';


export const createTableMessage = async () => {
    await db.transaction((tx: SQLite.Transaction) => {
        tx.executeSql(CREATE_TABLE_MESSAGE,
            [],
            () => console.log('Table created successfully')
        );
    });
};

export const createTableBtn = async () => {
    await db.transaction((tx: SQLite.Transaction) => {
        tx.executeSql(CREATE_TABLE_BTN_MENU,
            [],
            () => console.log('Table created successfully')
        );
    });
};

// message
export const insertMessage = async (idChat: string, message: string, typeMessage: TypeMessageTextEnum, keyboardInline: Array<CoreModelsInterface.BtnDataInlineBtn>[], data: string, send: TypeMessageEnum) => {
    return new Promise<void>((resolve, reject) => {
        db.transaction((tx: SQLite.Transaction) => {
            tx.executeSql(INSERT_MESSAGE_BY_ID_CHAT,
                [idChat, message, typeMessage, keyboardInline, data, send],
                () => {
                    // console.log('Data inserted successfully');
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

export const fetchDataMessageByIDChat = (idChat: string): Promise<any[]> => {
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

export const deleteMessagesByChatId = (idChat: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: SQLite.Transaction) => {
            tx.executeSql(
                DROP_All_MESSAGE_BY_ID_CHAT,
                [idChat],
                () => resolve(),
                (tx: SQLite.Transaction, error) => {
                    console.error('SQL error:', error);
                    reject(error);
                }
            );
        });
    });
};

// btn
export const insertBtnMenu = async (idChat: string, keyboardMenu: string, data: string) => {
    const res = await getBtnMenuByIdChat(idChat);
    if (res.length) {
      return await updateBtnData(idChat, keyboardMenu);
    }
    await db.transaction((tx: SQLite.Transaction) => {
        tx.executeSql(INSERT_BTN_MENU,
            [idChat, keyboardMenu, data],
            (_, result) => console.log('Inserted successfully', result),
            (_, error) => {
                console.error('Insert error:', error);
                return false;
            }
        );
    });
};

export const updateBtnData = async (idChat: string, keyboardMenu: string): Promise<any | null> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: SQLite.Transaction) => {
            tx.executeSql(
                UPDATE_BTN_MENU,
                [keyboardMenu, idChat],
                (_, result) => {
                    if (result.rowsAffected > 0) {
                        tx.executeSql(
                            GET_BTN_MENU_BY_CHAT_ID, [idChat],
                            (_, selectResult) => {
                                if (selectResult.rows.length > 0) {
                                    resolve(selectResult.rows.item(0));
                                } else {
                                    resolve(null);
                                }
                            },
                            (_, selectError) => {
                                console.error('Select error:', selectError);
                                reject(selectError);
                                return false;
                            }
                        );
                    } else {
                        console.warn('No record found for idChat:', idChat);
                        resolve(null);
                    }
                },
                (_, error) => {
                    console.error('Update error:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const getBtnMenuByIdChat = async (idChat: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx: SQLite.Transaction) => {
            tx.executeSql(GET_BTN_MENU_BY_CHAT_ID,
                [idChat],
                (_, resultSet) => {
                    const rows = resultSet.rows;
                    const btnMenu = [];
                    for (let i = 0; i < rows.length; i++) {
                        btnMenu.push(rows.item(i));
                    }
                    resolve(btnMenu);
                },
                (_, error) => {
                    console.error('Error fetching btnMenu by idChat:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const removeTableMessage = async () => {
    return new Promise<void>((resolve, reject) => {
        db.transaction((tx: SQLite.Transaction) => {
            tx.executeSql(DROP_TABLE_MESSAGE, [],
                () => {
                    // console.log('Table removed successfully');
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
export const removeTableBtnMenu = async () => {
    return new Promise<void>((resolve, reject) => {
        db.transaction((tx: SQLite.Transaction) => {
            tx.executeSql(DROP_TABLE_BTN_MENU, [],
                () => {
                    // console.log('Table removed successfully');
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
