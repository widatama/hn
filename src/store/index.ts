import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';

import hnApi from '@/store/api/hn';

function makeStore() {
  return configureStore({
    devTools: true,
    middleware: [...getDefaultMiddleware(), hnApi.middleware, logger],
    reducer: {
      [hnApi.reducerPath]: hnApi.reducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
