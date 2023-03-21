import clsx from 'clsx';
import { Parser } from 'html-to-react';
import Link from 'next/link';
import React from 'react';
import TimeAgo from 'react-timeago';

import type { HNItem } from '@/types/hn';

type HNCommentCompProps = {
  className?: string;
  hnComment: HNItem;
};

export default function HNCommentComp({ className = '', hnComment }: HNCommentCompProps) {
  const content = hnComment.text ? Parser().parse(hnComment.text) : '';

  return (
    <div className={clsx(className)}>
      <div className="tw-text-xs tw-text-neutral-400 tw-mb-1">
        <span>
          <Link href={hnComment.creatorUrl}>
            {hnComment.by}
          </Link>
        </span>
        <span>
          {' '}
          <TimeAgo date={hnComment.time * 1000} />
        </span>
      </div>
      <div className="hn-item-text">
        {content}
      </div>
    </div>
  );
}

HNCommentComp.defaultProps = {
  className: '',
};
