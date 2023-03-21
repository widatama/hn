import Head from 'next/head';

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
        <title>Hacker News Reader</title>
      </Head>
      {content}
    </>
  );
}
