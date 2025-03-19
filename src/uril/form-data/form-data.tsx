import {CoreModelsInterface} from '../../interface/core-models-interface.tsx';
import * as yup from 'yup';
import {InferType} from 'yup';

export const schemaFieldSearch = yup
  .object({
    name: yup.string().required('Введіть назву'),
  })
  .required();

export const fieldsChats: Array<CoreModelsInterface.DataFiled> = [
  {name: 'name', type: 'text', label: '', placeholder: 'Пошук'},
];

export const schemaMessage = yup
  .object({
    message: yup.string().required('текст'),
  })
  .required();

export const fieldsMessage: Array<CoreModelsInterface.DataFiled> = [
  {
    name: 'message',
    type: 'textarea',
    label: '',
    placeholder: 'Написаи повідомлення...',
  },
];
export const chatsList: Array<CoreModelsInterface.Chat> = [
  {
    id: 1,
    name: 'AP Assistant',
    countMessage: 0,
    lastMessage: '❗️ Наразі немає жодних заявок, що потребують погодження.',
    image: null,
    data: new Date().toISOString(),
    message: {messageText: ''},
  },
  {
    id: 2,
    name: 'AP Elevator ',
    countMessage: 2,
    lastMessage:
      'Ви обрали відпустку по компанії "АГРОПРОСПЕРІС, ТОВ" Вкажіть дату початку відпустки у форматі ДД.ММ.РРРР . Наприклад: 13.03.2025 👇',
    image: null,
    data: new Date().toISOString(),
    message: {messageText: ''},
  },
  {
    id: 3,
    name: 'AP Logistic ',
    countMessage: 1,
    lastMessage:
      'Ласкаво просимо у головне меню АП Помічник Бажаємо приємного користування! ☀️',
    image: null,
    data: new Date().toISOString(),
    message: {messageText: ''},
  },
];

type fieldSearch = InferType<typeof schemaFieldSearch>;
type fieldMessages = InferType<typeof schemaMessage>;
