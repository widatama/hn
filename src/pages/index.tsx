import Head from 'next/head';
import { useRouter } from 'next/router';

import HNItemList from '@/components/HNItemList';
import LoadingCue from '@/components/LoadingCue';
import { useGetTopItemsQuery } from '@/store/api/hn';

export default function Home() {
  const router = useRouter();

  const {
    data: hnItems = [],
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetTopItemsQuery({ limit: 30, page: router.query.p || 1 });

  let content: React.ReactNode;

  if (isLoading) {
    content = <LoadingCue />;
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
