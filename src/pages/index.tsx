import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectHnItems } from '@/store/hnSlice';

export default function Home() {
  const hnItems = useSelector(selectHnItems);
  return (
    <>
      <Head>
        <title>HN</title>
      </Head>
      <main className="tw-bg-neutral-800 tw-text-white tw-h-screen tw-p-4">
        {hnItems.map((hnItem) => (
          <div key={hnItem.id}>{hnItem.title}</div>
        ))}
      </main>
    </>
  );
}
