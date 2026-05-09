'use client'

import { Parser } from 'html-to-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import HNCommentList from '@/components/HNCommentList';
import HNItemComp from '@/components/HNItemComp';
import LoadingCue from '@/components/LoadingCue';
import { useGetItemQuery } from '@/store/api/hn';
import type { HNItem } from '@/types/hn';

export default function Item() {
  const searchParams = useSearchParams();

  const {
    data: hnItem = {} as HNItem,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetItemQuery(searchParams.get('id') || '');

  useEffect(() => {
    document.title = hnItem?.title
      ? `${hnItem.title} | ${process.env.NEXT_PUBLIC_APP_TITLE}`
      : process.env.NEXT_PUBLIC_APP_TITLE ?? '';
  }, [hnItem?.title]);

  if (!(searchParams.get('id'))) {
    return (
      <div>No such item</div>
    );
  }

  let content: React.ReactNode;

  if (isLoading) {
    content = <LoadingCue />;
  } else if (isSuccess && hnItem) {
    content = (
      <>
        <HNItemComp hnItem={hnItem} />
        {hnItem.text
          ? <div className="tw:mt-4 tw:mb-16 tw:text-neutral-300 hn-item-text">{Parser().parse(hnItem.text)}</div>
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
      {content}
      <HNCommentList className="tw:my-16" hnCommentIds={hnItem.kids || []} />
    </>
  );
}

