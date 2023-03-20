import clsx from 'clsx';
import React from 'react';

import type { HNItem } from '@/types/hn';
import HNItemComp from '@/components/HNItemComp';

type HNItemListProps = {
  className?: string;
  hnItems: HNItem[];
};

export default function HNItemList({ className = '', hnItems }: HNItemListProps) {
  return (
    <div className={clsx(className, 'tw-overflow-y-auto tw-mb-4')}>
      {hnItems.map((hnItem) => (
        <HNItemComp className="tw-mb-3" hnItem={hnItem} key={hnItem.id} />
      ))}
    </div>
  );
}

HNItemList.defaultProps = {
  className: '',
};
