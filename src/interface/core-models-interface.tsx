import {Control} from 'react-hook-form';

export namespace CoreModelsInterface {
  export interface IFormFoundName {
    name: string;
  }

  export interface IFormMessage {
    message: string;
  }

  export interface DataFiled {
    control?: Control<any>;
    name: string;
    label: string;
    placeholder: string;
    type: 'text' | 'select' | 'textarea';
    pattern?: {
      value: RegExp;
      message: string;
    };
    optionsSelect?: {label: string; value: string}[];
  }

  export interface Chat {
    id: number;
    name: string;
    image: string | null;
    countMessage: number;
    lastMessage: string;
    data: string,
    message: Message
  }

  export interface Message {
    messageText: string
  }

  export interface MessageChat {
    id: number;
    message: string;
    data: string;
  }

  export interface BtnDataMenu {
    text: string
  }
}
