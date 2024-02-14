import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import hnApi from '@/store/api/hn';

const middleware = [...getDefaultMiddleware(), hnApi.middleware];

function makeStore() {
  return configureStore({
    devTools: true,
    middleware,
    reducer: {
      [hnApi.reducerPath]: hnApi.reducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
