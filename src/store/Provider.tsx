'use client'

import React from 'react';
import { Provider } from 'react-redux';

import { AppStore, makeStore } from '@/store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = React.useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
}
