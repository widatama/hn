import clsx from 'clsx';
import React from 'react';

type LoadingCueProps = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

export default function LoadingCue({ className = '' }: LoadingCueProps) {
  return (
    <div className={clsx(className, 'tw-animate-pulse')}>
      Loading
    </div>
  );
}
