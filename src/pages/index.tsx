import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import hnSlice, { selectHnItems } from '@/store/hnSlice';

export default function Home() {
  const dispatch = useDispatch();
  const hnItems = useSelector(selectHnItems);
  const { test } = hnSlice.actions;

  useEffect(() => {
    dispatch(test());
  }, [dispatch, test]);

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
