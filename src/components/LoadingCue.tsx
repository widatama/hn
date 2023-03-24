import clsx from 'clsx';
import React from 'react';

type LoadingCueProps = {
  className?: string;
};

export default function LoadingCue({ className = '' }: LoadingCueProps) {
  return (
    <div className={clsx(className, 'tw-animate-pulse')}>
      Loading
    </div>
  );
}

LoadingCue.defaultProps = {
  className: '',
};
