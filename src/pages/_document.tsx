import {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon.png`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
