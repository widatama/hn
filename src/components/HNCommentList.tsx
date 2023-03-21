import clsx from 'clsx';
import React from 'react';

import type { HNItem } from '@/types/hn';
import HNCommentComp from '@/components/HNCommentComp';

type HNCommentListProps = {
  className?: string;
  hnComments: HNItem[];
};

export default function HNCommentList({ className = '', hnComments }: HNCommentListProps) {
  return (
    <div className={clsx(className, 'tw-overflow-y-auto tw-mb-6')}>
      {hnComments.map((hnComment) => (
        <HNCommentComp className="tw-mb-6" hnComment={hnComment} key={hnComment.id} />
      ))}
    </div>
  );
}

HNCommentList.defaultProps = {
  className: '',
};
