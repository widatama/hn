import clsx from 'clsx';
import React from 'react';

// eslint-disable-next-line import/no-cycle
import HNCommentComp from '@/components/HNCommentComp';
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
    return (<div className={clsx(className, baseClassName)}>Loading</div>);
  }

  if (isSuccess) {
    return (
      <div className={clsx(className, baseClassName)}>
        {hnComments.map((hnComment, idx) => (
          <HNCommentComp
            className={clsx({ 'tw-mb-6': idx < hnComments.length - 1 })}
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
