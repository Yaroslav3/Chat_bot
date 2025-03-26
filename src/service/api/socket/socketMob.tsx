
import io from 'socket.io-client';


export const initSocketMob = () => {
  console.log('📱 Запускаємо WebSocket для Mobile');

  const socket = io('wss://3748-95-67-90-118.ngrok-free.app/', {
    transports: ['websocket'],
    secure: true,
    rejectUnauthorized: false,
  });

  socket.on('connect', () => {
    console.log('✅ WebSocket Connected (Web)');
    socket.emit('message', 'Привіт, сервер!');
  });

  socket.on('disconnect', () => {
    console.log('Відключено від сервера');
  });

  socket.on('message', (data) => {
    console.log('Отримано повідомлення:', data);
  });

};
