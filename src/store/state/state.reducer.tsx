import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CoreModelsInterface} from '../../interface/core-models-interface.tsx';

export const ActionTypes = {
  SHOW_DATA: '[SHOW_DATA] SHOW_DATA',
};

export interface State {
  dataChats: Array<CoreModelsInterface.ListChats>;
}

const initialState: State = {
  dataChats: [],
};

export const stateData = createSlice({
  name: ActionTypes.SHOW_DATA,
  initialState,
  reducers: {
    addChats: (state, action: PayloadAction<Array<CoreModelsInterface.ListChats>>) => {
      state.dataChats = action.payload;
    },
  },
});

export const {addChats} = stateData.actions;
export default stateData.reducer;
