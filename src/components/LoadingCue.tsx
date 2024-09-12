import clsx from 'clsx';
import React from 'react';

type LoadingCueProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function LoadingCue({ className = '', children }: LoadingCueProps) {
  return (
    <div className={clsx(className, 'tw-animate-pulse')}>
      {children ? children : 'Loading'}
    </div>
  );
}
