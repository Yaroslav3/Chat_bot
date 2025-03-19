import {Platform} from 'react-native';
import React from 'react';
import {createTableMessage} from './SQLite/repository/table.tsx';
import {openDB} from './IndexedDB/config/configIndexedDB.tsx';

export const initializeDatabase = (setPlatformDb: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (Platform.OS === 'web') {
        if (typeof window !== 'undefined' && window.indexedDB) {
            openDB().then((db) => {
                console.log('db', db);
            });
        } else {
            console.error('IndexedDB not supported');
        }
    } else if (Platform.OS === 'ios' || Platform.OS === 'android') {
        const SQLite = require('react-native-sqlite-storage');
        SQLite.openDatabase({name: 'my.db', location: 'default'}, () => {
            console.log('SQLite Open for mobile platforms');
            createTableMessage();
            setPlatformDb('SQLite');
        });
    }
};
