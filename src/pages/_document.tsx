import {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
