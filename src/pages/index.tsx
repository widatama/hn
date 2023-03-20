import Head from 'next/head';
import Link from 'next/link';

import HNItemList from '@/components/HNItemList';
import { useGetTopItemsQuery } from '@/store/api/hn';

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
    content = <HNItemList hnItems={hnItems} />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <Head>
        <title>HN</title>
      </Head>
      <div className="tw-min-w-[60vh] tw-w-[75%] tw-mx-auto tw-overflow-y-auto">
        <header className="tw-mt-4 tw-mb-6">
          <Link href="/">
            <h1 className="tw-font-bold tw-text-2xl">Hacker News Reader</h1>
          </Link>
        </header>
        {content}
      </div>
    </>
  );
}
