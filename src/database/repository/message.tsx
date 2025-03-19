import {Platform} from 'react-native';
import {fetchDataMessageByIDChat, insertMessage} from '../SQLite/repository/table.tsx';
import {fetchDataMessageIndexDB, insertMessageIndexDB} from '../IndexedDB/repository/table.tsx';

export const addedMessageDB = async (idChat: number, message: string, data: string) => {
    try {
        if (Platform.OS === 'web') {
            return await insertMessageIndexDB(idChat, message, data);
        }
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            return await insertMessage(idChat, message, data);
        }
        return [];
    }catch (error){
        console.error('Error insert messages:', error);
        return [];
    }
};

export const getAllMessageByIDChatDB = async (idChat: number) => {
    try {
      if (Platform.OS === 'web') {
        return await fetchDataMessageIndexDB(idChat);
      }
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        return await fetchDataMessageByIDChat(idChat);
      }

      return [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
};
