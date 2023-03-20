import { AppProps } from 'next/app';
import React from 'react';

import '@/stylesheets/main.css';

export default function App({
  Component,
  pageProps,
}: AppProps) {
  /* eslint-disable */
  return (
    <Component {...pageProps} />
  );
  /* eslint-enable */
}
