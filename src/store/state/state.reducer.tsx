import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CoreModelsInterface} from '../../interface/core-models-interface.tsx';

export const ActionTypes = {
  SHOW_DATA: '[SHOW_DATA] SHOW_DATA',
};

export interface State {
  dataChats: Array<CoreModelsInterface.Chat>;
  selectChat: CoreModelsInterface.Chat | null
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
      action: PayloadAction<Array<CoreModelsInterface.Chat>>,
    ) => {
      state.dataChats = action.payload;
    },
    selectChat: (state, action: PayloadAction<CoreModelsInterface.Chat>) => {
      state.selectChat = action.payload;
    },
    clearChat: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.selectChat = null;
      }
    },
    setMessageInput: (state, action: PayloadAction<{chat: CoreModelsInterface.Chat, message: string}>) => {
      const chat = state.dataChats.find(x => x.id === action.payload.chat.id);
      if (chat) {
        chat.message.messageText = action.payload.message;
      }
    },
  },
});

export const {addChats, selectChat, clearChat, setMessageInput} = stateData.actions;
export default stateData.reducer;
