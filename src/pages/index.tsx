import Head from 'next/head';

import { useGetTopItemsQuery } from '@/store/api/hn';
import type { HNItem } from '@/types/hn';

export default function Home() {
  const {
    data: hnItems = [],
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetTopItemsQuery({ limit: 30 });

  let content: React.ReactNode;

  if (isLoading) {
    content = <div>Loading</div>;
  } else if (isSuccess) {
    content = hnItems.map((hnItem: HNItem) => <div key={hnItem.id}>{hnItem.title}</div>);
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <Head>
        <title>HN</title>
      </Head>
      <main className="tw-bg-neutral-800 tw-text-white tw-h-screen tw-p-4">
        {content}
      </main>
    </>
  );
}
