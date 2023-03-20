import clsx from 'clsx';
import React from 'react';
import TimeAgo from 'react-timeago';

import type { HNItem } from '@/types/hn';

type HNItemCompProps = {
  className?: string;
  hnItem: HNItem;
};

export default function HNItemComp({ className = '', hnItem }: HNItemCompProps) {
  const defaultClassNames = 'tw-text-neutral-100';
  return (
    <div className={clsx(className, defaultClassNames)}>
      <h2 className="tw-text-lg">{hnItem.title}</h2>
      <div className="tw-text-xs tw-text-neutral-400">
        <span>
          {`${hnItem.score} points`}
        </span>
        <span>
          {` by ${hnItem.by}`}
        </span>
        <span>
          {' '}
          <TimeAgo date={hnItem.time * 1000} />
        </span>
        <span>
          {` | ${hnItem.kids ? hnItem.kids.length : 0} top level comments`}
        </span>
      </div>
    </div>
  );
}

HNItemComp.defaultProps = {
  className: '',
};
