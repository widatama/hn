import clsx from 'clsx';
import React from 'react';

// eslint-disable-next-line import/no-cycle
import HNCommentComp from '@/components/HNCommentComp';
import LoadingCue from '@/components/LoadingCue';
import { useGetItemsQuery } from '@/store/api/hn';

type HNCommentListProps = {
  className?: string;
  hnCommentIds: number[];
};

export default function HNCommentList({ className = '', hnCommentIds = [] }: HNCommentListProps) {
  const {
    data: hnComments = [],
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetItemsQuery(hnCommentIds);

  const baseClassName = 'tw-overflow-y-auto';

  if (isLoading) {
    return (<LoadingCue className={clsx(className, baseClassName)} />);
  }

  if (isSuccess) {
    return (
      <div className={clsx(className, baseClassName)}>
        {hnComments.map((hnComment, idx) => (
          <HNCommentComp
            className={clsx({ 'tw-mt-6': idx > 0 })}
            hnComment={hnComment}
            key={hnComment.id}
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (<div className={clsx(className, baseClassName)}>{error.toString()}</div>);
  }

  return null;
}

HNCommentList.defaultProps = {
  className: '',
};
