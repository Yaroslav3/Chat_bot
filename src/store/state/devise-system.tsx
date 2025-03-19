import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum TypeTheme {
  WHITE = 'WHITE',
  BLACK = 'BLACK',
}

export const ActionTypes = {
    SHOW_DEVISE: '[SHOW_DEVISE] SHOW_DEVISE',
};

export interface StateDevise {
    dataDevise: {
        theme: string
    };
}

const initialState: StateDevise = {
    dataDevise: {
        theme: TypeTheme.WHITE,
    },
};

export const stateDevise = createSlice({
    name: ActionTypes.SHOW_DEVISE,
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.dataDevise.theme = action.payload;
        },
    },
});

export const {setTheme} = stateDevise.actions;
export default stateDevise.reducer;
