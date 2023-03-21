import clsx from 'clsx';
import { Parser } from 'html-to-react';
import Link from 'next/link';
import React, { useState } from 'react';
import TimeAgo from 'react-timeago';

import type { HNItem } from '@/types/hn';

type HNCommentCompProps = {
  className?: string;
  hnComment: HNItem;
};

export default function HNCommentComp({ className = '', hnComment }: HNCommentCompProps) {
  const content = hnComment.text ? Parser().parse(hnComment.text) : '';
  const [collapsed, setCollapsed] = useState(false);

  const contentBlock = collapsed ? null : (
    <div className="hn-item-text">
      {content}
    </div>
  );

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
          {' '}
        </span>
        <button type="button" onClick={() => setCollapsed(!collapsed)}>
          {`[${collapsed ? '+' : '-'}]`}
        </button>
      </div>
      {contentBlock}
    </div>
  );
}

HNCommentComp.defaultProps = {
  className: '',
};
