import { Platform } from 'react-native';
import { initSocketWeb, subscribeToChatWeb } from './socketWeb.tsx';
import {initSocketMob} from './socketMob.tsx';

// const HOST = 'cf77-95-67-90-118.ngrok-free.app';
const HOST = 'localhost:8082';
export const SERVER_IP = `${HOST}`;
export const HTTP  = 'http://';
export const WS  = 'ws://';

export const initSocket = () => {
  if (Platform.OS === 'web') {
    initSocketWeb();
  } else {
    initSocketMob();
  }
};

// 📡 Виклик підписки
export const subscribeToChat = (chatID: string, onMessage: (msg: any) => string) => {
  if (Platform.OS === 'web') {
    return subscribeToChatWeb(chatID, onMessage);
  } else {
    return '';
    // subscribeToChatMob(chatID, onMessage);
  }
};
