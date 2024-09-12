'use client'

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import LoadingCue from '@/components/LoadingCue';
import { useGetTopItemsQuery } from '@/store/api/hn';
import HNItemComp from '@/components/HNItemComp';

type HNItemListProps = {
   
  className?: string;
  page: number;
};

export default function HNItemList({ className = '', page }: HNItemListProps) {
  const {
    data: hnItems = [],
    error,
    isError,
    isFetching,
    isSuccess,
  } = useGetTopItemsQuery({ limit: 30, page }, { refetchOnMountOrArgChange: true });

  if (isFetching) {
    return <LoadingCue className={clsx(className, 'tw-mb-4')} />;
  }

  if (isSuccess) {
    return (
      <div className={clsx(className, 'tw-overflow-y-auto tw-mb-4')}>
        {hnItems.map((hnItem) => (
          <HNItemComp className="tw-mb-3" hnItem={hnItem} key={hnItem.id} />
        ))}
        <Link className="tw-my-6 tw-inline-block" href={{ query: { p: page + 1 } }}>More</Link>
      </div>
    );
  }

  if (isError) {
    return <div className={clsx(className, 'tw-mb-4')}>{error.toString()}</div>;
  }

  return null;
}
