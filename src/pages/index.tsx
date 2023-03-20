import Head from 'next/head';

import HNItemComp from '@/components/HNItemComp';
import { useGetTopItemsQuery } from '@/store/api/hn';
import type { HNItem } from '@/types/hn';

export default function Home() {
  const {
    data: hnItems = [],
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetTopItemsQuery({ limit: 30, page: 1 });

  let content: React.ReactNode;

  if (isLoading) {
    content = <div>Loading</div>;
  } else if (isSuccess) {
    content = hnItems.map((hnItem: HNItem) => (
      <HNItemComp
        className="tw-mb-3"
        key={hnItem.id}
        hnItem={hnItem}
      />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <Head>
        <title>HN</title>
      </Head>
      <main className="tw-bg-neutral-800 tw-text-white tw-h-full tw-p-4">
        {content}
      </main>
    </>
  );
}
