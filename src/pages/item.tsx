import { Parser } from 'html-to-react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import HNItemComp from '@/components/HNItemComp';
import HNCommentList from '@/components/HNCommentList';
import { useGetItemQuery, useGetItemsQuery } from '@/store/api/hn';
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
  const {
    data: hnItemComments = [],
    error: errorComment,
    isError: isCommentError,
    isLoading: isCommentLoading,
    isSuccess: isCommentSuccess,
  } = useGetItemsQuery(hnItem.kids || []);

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

  let comment: React.ReactNode;

  if (isCommentLoading) {
    comment = <div>Loading</div>;
  } else if (isCommentSuccess) {
    comment = <HNCommentList className="tw-mt-16" hnComments={hnItemComments} />;
  } else if (isCommentError) {
    comment = <div>{errorComment.toString()}</div>;
  }

  return (
    <>
      <Head>
        <title>{`${hnItem.title} | Hacker News Reader`}</title>
      </Head>
      {content}
      {comment}
    </>
  );
}
