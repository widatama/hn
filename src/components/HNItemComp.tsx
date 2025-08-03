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
  let hostnameBlock = null;
  if (hnItem.itemHostname) {
    hostnameBlock = (
      <span className="tw:text-xs">
        {` (${hnItem.itemHostname})`}
      </span>
    );
  }

  let scoreBlock = null;
  if ('score' in hnItem) {
    scoreBlock = (
      <span>
        {`${hnItem.score} points `}
      </span>
    );
  }

  let commentBlock = null;
  if ('descendants' in hnItem) {
    commentBlock = (
      <span>
        {' • '}
        <Link href={hnItem.itemUrl}>
          {`${hnItem.descendants} comments`}
        </Link>
      </span>
    );
  }

  let upstreamLinkBlock = null;
  if ('itemUpstreamUrl' in hnItem && typeof hnItem.itemUpstreamUrl === 'string') {
    upstreamLinkBlock = (
      <span className="tw:ml-3">
        <Link href={hnItem.itemUpstreamUrl} title="Open in original HN">
          ☍
        </Link>
      </span>
    )
  }

  return (
    <div className={clsx(className)}>
      <div>
        <h2 className="tw:inline-block">
          <Link href={hnItem.url || hnItem.itemUrl}>
            {hnItem.title}
          </Link>
        </h2>
        {hostnameBlock}
      </div>
      <div className="tw:text-xs tw:text-neutral-400">
        {scoreBlock}
        <span>
          {'by '}
          <Link href={hnItem.creatorUrl}>
            {`${hnItem.by}`}
          </Link>
        </span>
        <span>
          {' • '}
          <Link href={hnItem.itemUrl}>
            <TimeAgo date={hnItem.time * 1000} />
          </Link>
        </span>
        {commentBlock}
        {upstreamLinkBlock}
      </div>
    </div>
  );
}
