import { configureStore } from '@reduxjs/toolkit';
import stateChat from '../store/state/state.reducer.tsx';
import stateDevise from '../store/state/devise-system.tsx';

export const store = configureStore({
    reducer: {
        dataChats: stateChat,
        devise: stateDevise,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
