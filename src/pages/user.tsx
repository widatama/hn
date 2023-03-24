import Head from 'next/head';
import { useRouter } from 'next/router';

import HNUserComp from '@/components/HNUserComp';
import LoadingCue from '@/components/LoadingCue';
import { useGetUserQuery } from '@/store/api/hn';

export default function User() {
  const router = useRouter();

  const {
    data: hnUser = {},
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetUserQuery(router.query.id || '');

  if (!('id' in router.query)) {
    return (
      <div>No such user</div>
    );
  }

  let content: React.ReactNode;

  if (isLoading) {
    content = <LoadingCue />;
  } else if (isSuccess && hnUser) {
    content = <HNUserComp hnUser={hnUser} />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else {
    content = <div>No such user</div>;
  }

  return (
    <>
      <Head>
        <title>{`Profile: ${router.query.id} | Hacker News Reader`}</title>
      </Head>
      {content}
    </>
  );
}
