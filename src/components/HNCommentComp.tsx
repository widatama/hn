import clsx from 'clsx';
import { Parser } from 'html-to-react';
import Link from 'next/link';
import React, { useState } from 'react';
import TimeAgo from 'react-timeago';

// eslint-disable-next-line import/no-cycle
import HNCommentList from '@/components/HNCommentList';
import type { HNItem } from '@/types/hn';

type HNCommentCompProps = {
  className?: string;
  hnComment: HNItem;
};

export default function HNCommentComp({ className = '', hnComment }: HNCommentCompProps) {
  const content = hnComment.text ? Parser().parse(hnComment.text) : '';
  const [collapsed, setCollapsed] = useState(false);
  const [childrenCollapsed, setChildrenCollapsed] = useState(true);

  if (hnComment.deleted) return null;

  let childrenBlock = null;

  if (hnComment.kids && hnComment.kids.length > 0) {
    if (childrenCollapsed) {
      childrenBlock = (
        <button
          type="button"
          className="tw-text-xs"
          onClick={() => setChildrenCollapsed(false)}
        >
          [+]
        </button>
      );
    } else {
      childrenBlock = (
        <>
          <button
            type="button"
            className="tw-text-xs"
            onClick={() => setChildrenCollapsed(true)}
          >
            [-]
          </button>
          <HNCommentList className="tw-mt-2 tw-ml-1 tw-pl-5 tw-border-dotted tw-border-l tw-border-neutral-500" hnCommentIds={hnComment.kids} />
        </>
      );
    }
  }

  const contentBlock = collapsed ? null : (
    <>
      <div className="hn-item-text tw-overflow-auto">
        {content}
      </div>
      {childrenBlock}
    </>
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
