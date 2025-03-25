import {Platform} from 'react-native';
import {deleteMessagesByChatId, fetchDataMessageByIDChat, insertMessage} from '../SQLite/repository/table.tsx';
import {
    deleteMessagesByChatIdIndexDB,
    fetchDataMessageIndexDB,
    insertMessageIndexDB
} from '../IndexedDB/repository/table.tsx';
import {CoreModelsInterface} from '../../interface/core-models-interface.tsx';
import {TypeMessageEnum, TypeMessageTextEnum} from '../../enum/type-message.enum.tsx';

export const addedMessageDB = async (idChat: string, message: string, btn: Array<CoreModelsInterface.BtnDataInlineBtn>[], data: string, send: TypeMessageEnum,  typeMessage: TypeMessageTextEnum) => {
    try {
        if (Platform.OS === 'web') {
            return await insertMessageIndexDB(idChat, message, btn, data, typeMessage,send);
        }
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            return await insertMessage(idChat, message, typeMessage, btn, data, send);
        }
        return [];
    }catch (error){
        console.error('Error insert messages addedMessageDB:', error);
        return [];
    }
};
export const removeAllMessageByIDChatDB = async (idChat: string) => {
  if (Platform.OS === 'web') {
    return await deleteMessagesByChatIdIndexDB(idChat);
  }
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return await deleteMessagesByChatId(idChat);
  }
};

export const getAllMessageByIDChatDB = async (idChat: string) => {
    try {
      if (Platform.OS === 'web') {
        return await fetchDataMessageIndexDB(idChat);
      }
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        return await fetchDataMessageByIDChat(idChat);
      }

      return [];
    } catch (error) {
      console.error('Error fetching messages getAllMessageByIDChatDB:', error);
      return [];
    }
};
