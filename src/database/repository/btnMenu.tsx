import {Platform} from 'react-native';
import {getBtnMenuByIdChatIndexDB, insertBtnMenuIndexDB, updateBtnDataIndexDB} from '../IndexedDB/repository/table.tsx';
import {getBtnMenuByIdChat, insertBtnMenu, updateBtnData} from '../SQLite/repository/table.tsx';
import {CoreModelsInterface} from '../../interface/core-models-interface.tsx';

export const addedBtnMenuDB = async (idChat: string, btnMenu:  Array<CoreModelsInterface.BtnDataMenu>[], data: string) => {
    const btn = JSON.stringify(btnMenu);
    try {
        if (Platform.OS === 'web') {
            return await insertBtnMenuIndexDB(idChat, btn, data);
        }
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            return await insertBtnMenu(idChat, btn, data);
        }
        return [];
    }catch (error){
        console.error('Error insert messages addedBtnMenuDB:', error);
        return [];
    }
};


export const updateBtnMenuDB = async (idChat: string, btnMenu: []) => {
    const btn = JSON.stringify(btnMenu);
    try {
        if (Platform.OS === 'web') {
            return await updateBtnDataIndexDB(idChat, btn);
        }
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            return await updateBtnData(idChat, btn);
        }
        return [];
    }catch (error){
        console.error('Error insert messages updateBtnMenuDB:', error);
        return [];
    }
};

export const getBtnMenuDB = async (idChat: string) => {
    try {
        if (Platform.OS === 'web') {
            return await getBtnMenuByIdChatIndexDB(idChat);
        }
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            return await getBtnMenuByIdChat(idChat);
        }
        return [];
    }catch (error){
        console.error('Error insert messages updateBtnMenuDB:', error);
        return [];
    }
};
