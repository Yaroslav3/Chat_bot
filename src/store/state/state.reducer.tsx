import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CoreModelsInterface} from '../../interface/core-models-interface.tsx';

export const ActionTypes = {
  SHOW_DATA: '[SHOW_DATA] SHOW_DATA',
};

export interface State {
  dataChats: Array<CoreModelsInterface.Bot>;
  selectChat: CoreModelsInterface.Bot | null
}

const initialState: State = {
  dataChats: [],
  selectChat: null,
};

export const stateData = createSlice({
  name: ActionTypes.SHOW_DATA,
  initialState,
  reducers: {
    addChats: (
      state,
      action: PayloadAction<Array<CoreModelsInterface.Bot>>,
    ) => {
      state.dataChats = action.payload;
    },
    selectChat: (state, action: PayloadAction<CoreModelsInterface.Bot>) => {
      state.selectChat = action.payload;
    },
    clearChat: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.selectChat = null;
      }
    },
    setMessageInput: (state, action: PayloadAction<{chat: CoreModelsInterface.Bot, message: string}>) => {
      const chat = state.dataChats.find(x => x.id === action.payload.chat.id);
      if (chat) {
        chat.message.messageText = action.payload.message;
      }
    },
    setLastMessage: (state, action: PayloadAction<{chat: CoreModelsInterface.Bot, message: string}>) => {
      const chat = state.dataChats.find(x => x.id === action.payload.chat.id);
      if (chat) {
        chat.lastMessage = action.payload.message;
      }
    },
    newMessageInSocket: (state, action: PayloadAction<{chatId: string, key: boolean, newMessage: CoreModelsInterface.MessageChat}>) => {
      if (state.selectChat?.id === action.payload?.chatId) {
        state.selectChat!.newMessage = action.payload.newMessage;
      } else {
        const chat = state.dataChats.find(x => x?.id === action.payload?.chatId);
        if (chat) {
          chat.countMessage += chat.countMessage + 1
        }
      }
    },

    countMessage: (state, action: PayloadAction<{chatId: string}>) => {
      const chat = state.dataChats.find(x => x?.id === action?.payload?.chatId);
      if(chat){
        chat.countMessage = 0;
      }
    },
    updateChat: (state, action: PayloadAction<{chatId: string}>) => {}
  },
});

export const {addChats, selectChat, clearChat, setMessageInput, setLastMessage, newMessageInSocket, countMessage, updateChat} = stateData.actions;
export default stateData.reducer;
