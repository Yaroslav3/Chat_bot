import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import {SERVER_IP, WS} from './socketApi.tsx';

export const getWebSocketURL = () => `${WS}${SERVER_IP}/websocket`;

let rxStomp: RxStomp | null = null

export const initSocketWeb = () => {
    if (rxStomp) {
        console.log('⚠️ WebSocket вже ініціалізований (Web)');
        return;
    }

    rxStomp = new RxStomp();
    const rxStompConfig: RxStompConfig = {
        brokerURL: getWebSocketURL(),
        reconnectDelay: 5000,
    };

    rxStomp.configure(rxStompConfig);
    rxStomp.activate();

    rxStomp.connected$.subscribe(() => {
        console.log('✅ WebSocket Connected (Web)');
    });

    rxStomp.stompErrors$.subscribe((error) => {
        console.error('❌ STOMP Error (Web):', error);
    });
};

// 📡 Підписка на чат
export const subscribeToChatWeb = (chatID: string, onMessage: (msg: any) => void) => {
    if (!rxStomp) {
        console.error('❌ WebSocket не підключений. Викликаємо initSocketWeb()');
        initSocketWeb();
        setTimeout(() => subscribeToChatWeb(chatID, onMessage), 1000);
        return;
    }

    console.log(`📡 Підписка (Web) на /chat/${chatID}`);
    rxStomp.watch(`/chat/${chatID}`).subscribe(message => {
        const parsedMessage = JSON.parse(message.body);
        onMessage(parsedMessage);
    });
    return chatID;
};
