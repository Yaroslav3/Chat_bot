import {get, post} from './config-http.tsx';
import {HTTP, SERVER_IP} from '../socket/socketApi.tsx';
import {CoreModelsInterface} from '../../../interface/core-models-interface.tsx';
import {getAllMessageByIDChatDB} from '../../../database/repository/message.tsx';

export const SEND_MESSAGE_API = '/api/v1/';

const headers = {
  headers: {
    'X-USER': '380661059604',
  },
};

export const sendMessageApi = async (chatId: string, data: CoreModelsInterface.MessageApi) => {
  try {
    data.phone = headers.headers['X-USER'];
    return await post(
        `${HTTP}${SERVER_IP}${SEND_MESSAGE_API}chat/${chatId}/send-message`,
        data,
        headers.headers,
    );
  } catch (e) {
    console.log('sendMessageApi', e);
    return [];
  }
};

export const getAllChats = async () => {
  try {
    const res = await get(`${HTTP}${SERVER_IP}${SEND_MESSAGE_API}chat/all`, headers.headers);
    if (!res) {
      return [];
    }

    return Promise.all(
        res.data.map(async (m: any) => {
          const messages = await getAllMessageByIDChatDB(m.id);
          const msr = messages[messages?.length - 1]?.message ? messages[messages?.length - 1]?.message : '';

          return {
            id: m.id,
            name: m.name,
            username: m.name,
            image: '',
            countMessage: 0,
            lastMessage: msr,
            data: new Date().toISOString(),
            message: {
              messageText: '',
            },
          } as CoreModelsInterface.Bot;
        })
    );
  } catch (e) {
    return [];
  }
};
