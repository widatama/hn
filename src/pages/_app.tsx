import { AppProps } from 'next/app';
import Link from 'next/link';
import React from 'react';
import { Provider } from 'react-redux';

import { wrapper } from '@/store';
import '@/stylesheets/main.css';

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Provider store={store}>
      <div className="tw-min-w-[60vh] tw-w-[75%] tw-mx-auto tw-overflow-y-auto">
        <header className="tw-mt-4 tw-mb-6">
          <h1 className="tw-font-bold tw-text-2xl">
            <Link href="/">
              Hacker News Reader
            </Link>
          </h1>
        </header>
        <Component {...props.pageProps} />
      </div>
    </Provider>
  );
  /* eslint-enable */
}
