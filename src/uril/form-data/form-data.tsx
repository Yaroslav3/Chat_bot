import {CoreModelsInterface} from '../../interface/core-models-interface.tsx';
import * as yup from 'yup';
import {InferType} from 'yup';

export const schemaFieldsDelivery = yup
    .object({
        name: yup.string().required('Введіть назву'),
    }).required()

export const fieldsDelivery: Array<CoreModelsInterface.DataFiled> = [
    {name: 'name', type: 'text', label: '', placeholder: ''},
];

export const schemaFieldWithYou = yup
    .object({
        streetShop: yup.string().required('Оберіть ресторан!'),
    }).required()

export const fieldOrderWithYou: Array<CoreModelsInterface.DataFiled> = [
    {name: 'streetShop', type: 'select', label: 'Ресторан', placeholder: 'Ресторан',
        optionsSelect: [
            {label: 'Здановської 14/5', value: 'Смачна піца 1'},
        ]},
];
type delivery = InferType<typeof schemaFieldsDelivery>;
type withYou = InferType<typeof schemaFieldWithYou>;
