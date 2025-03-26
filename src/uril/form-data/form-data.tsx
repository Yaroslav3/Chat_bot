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
    placeholder: 'Написати повідомлення...',
  },
];
type fieldSearch = InferType<typeof schemaFieldSearch>;
type fieldMessages = InferType<typeof schemaMessage>;
