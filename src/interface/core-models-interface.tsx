import {Control} from 'react-hook-form';
import {TypeApiMessageEnum} from "../enum/type-api-message.enum.tsx";
import {TypeMessageEnum, TypeMessageTextEnum} from "../enum/type-message.enum.tsx";

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

  export interface Bot {
    id: string;
    name: string;
    username: string
    image: string | null;
    countMessage: number;
    lastMessage: string;
    data: string,
    message: Message
    newMessage?: MessageChat
  }

  export interface Message {
    messageText: string
  }

  export interface MessageChat {
    id: number;
    message: string;
    data: string;
    keyboardInline: Array<BtnDataInlineBtn>[];
    isServer: boolean,
    typeMessage: TypeMessageTextEnum;
    send: TypeMessageEnum
  }

  export interface BtnDataMenu {
    text: string
    callback_data?: any;
  }

  export interface BtnDataInlineBtn {
    text: string;
    callback_data?: any;
  }

  export interface MessageApi {
    nameBot: string,
    idChat: string,
    type: TypeApiMessageEnum,
    targetText: string
    phone?: string,
    data?: any
  }
  export interface MessageApiUI extends MessageApi {
    keyboardMenu: Array<BtnDataMenu>[];
    keyboardInline: Array<BtnDataInlineBtn>[];
    typeMessage: TypeMessageEnum;
    isBot?: boolean,
  }
}
