import Head from 'next/head';
import React from 'react';

import Hello from '@/components/Hello';

export default function Home() {
  return (
    <>
      <Head>
        <title>HN</title>
      </Head>
      <main className="tw-bg-neutral-800 tw-text-white tw-h-screen tw-p-4">
        <Hello name="Next.js" />
      </main>
    </>
  );
}
