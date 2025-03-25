import {CoreModelsInterface} from '../../interface/core-models-interface.tsx';
import {sendMessageApi} from '../api/https/api-send-message.service.tsx';

export const sendMessageService = async (value: CoreModelsInterface.MessageApi) => {
  await sendMessageApi(value.idChat, value);
};
