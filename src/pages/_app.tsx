import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

import { wrapper } from '@/store';
import '@/stylesheets/main.css';

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
  /* eslint-enable */
}
