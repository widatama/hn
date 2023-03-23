import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import TimeAgo from 'react-timeago';

import type { HNItem } from '@/types/hn';

type HNItemCompProps = {
  className?: string;
  hnItem: HNItem;
};

export default function HNItemComp({ className = '', hnItem }: HNItemCompProps) {
  let hostname = null;
  if (hnItem.itemHostname) {
    hostname = (
      <span className="tw-text-xs">
        {` (${hnItem.itemHostname})`}
      </span>
    );
  }

  return (
    <div className={clsx(className)}>
      <div>
        <h2 className="tw-inline-block">
          <Link href={hnItem.url || hnItem.itemUrl}>
            {hnItem.title}
          </Link>
        </h2>
        {hostname}
      </div>
      <div className="tw-text-xs tw-text-neutral-400">
        <span>
          {`${hnItem.score} points`}
        </span>
        <span>
          <Link href={hnItem.creatorUrl}>
            {` by ${hnItem.by}`}
          </Link>
        </span>
        <span>
          {' '}
          <TimeAgo date={hnItem.time * 1000} />
        </span>
        <span>
          {' | '}
          <Link href={hnItem.itemUrl}>
            {`${hnItem.descendants} comments`}
          </Link>
        </span>
      </div>
    </div>
  );
}

HNItemComp.defaultProps = {
  className: '',
};
