import { configureStore } from '@reduxjs/toolkit';

import hnApi from '@/store/api/hn';

export function makeStore() {
  return configureStore({
    devTools: process.env.NODE_ENV === 'development',
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(hnApi.middleware);
    },
    reducer: {
      [hnApi.reducerPath]: hnApi.reducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
