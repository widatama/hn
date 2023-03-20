import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import hnSlice from './hnSlice';

function makeStore() {
  return configureStore({
    reducer: {
      [hnSlice.name]: hnSlice.reducer,
    },
    devTools: true,
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
