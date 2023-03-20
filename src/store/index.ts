import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';

import hnSlice from './hnSlice';

function makeStore() {
  return configureStore({
    devTools: true,
    middleware: [...getDefaultMiddleware(), logger],
    reducer: {
      [hnSlice.name]: hnSlice.reducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
