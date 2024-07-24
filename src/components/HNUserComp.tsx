import clsx from 'clsx';
import { Parser } from 'html-to-react';
import React from 'react';
import TimeAgo from 'react-timeago';

import type { HNUser } from '@/types/hn';

type HNUserCompProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  hnUser: HNUser;
};

export default function HNUserComp({ className = '', hnUser }: HNUserCompProps) {
  const about = hnUser.about ? Parser().parse(hnUser.about) : '';

  return (
    <dl className={clsx(className, 'tw-flex tw-flex-wrap')}>
      <dt className="tw-w-1/6 tw-text-neutral-400">user:</dt>
      <dd className="tw-w-5/6">{hnUser.id}</dd>
      <dt className="tw-w-1/6 tw-text-neutral-400">created:</dt>
      <dd className="tw-w-5/6">
        <TimeAgo date={hnUser.created * 1000} />
      </dd>
      <dt className="tw-w-1/6 tw-text-neutral-400">karma:</dt>
      <dd className="tw-w-5/6">{hnUser.karma}</dd>
      <dt className="tw-w-1/6 tw-text-neutral-400">about:</dt>
      <dd className="tw-w-5/6">{about}</dd>
    </dl>
  );
}
