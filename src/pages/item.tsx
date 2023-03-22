import { Parser } from 'html-to-react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import HNItemComp from '@/components/HNItemComp';
import HNCommentList from '@/components/HNCommentList';
import { useGetItemQuery } from '@/store/api/hn';
import type { HNItem } from '@/types/hn';

export default function Item() {
  const router = useRouter();

  const {
    data: hnItem = {} as HNItem,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetItemQuery(router.query.id || '');

  if (!('id' in router.query)) {
    return (
      <div>No such item</div>
    );
  }

  let content: React.ReactNode;

  if (isLoading) {
    content = <div>Loading</div>;
  } else if (isSuccess && hnItem) {
    content = (
      <>
        <HNItemComp hnItem={hnItem} />
        {hnItem.text
          ? <div className="tw-mt-4 tw-mb-16 tw-text-neutral-300 hn-item-text">{Parser().parse(hnItem.text)}</div>
          : null}
      </>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else {
    content = <div>No such item</div>;
  }

  return (
    <>
      <Head>
        <title>{`${hnItem.title} | Hacker News Reader`}</title>
      </Head>
      {content}
      <HNCommentList className="tw-mt-16" hnCommentIds={hnItem.kids || []} />
    </>
  );
}
