'use client';

import React, { useState } from 'react';

type HelloProps = {
  name: string;
};

export default function Hello({ name }: HelloProps) {
  const [count, setCount] = useState(0);

  return (
    <div>
      Hello&nbsp;
      {name}
      <div className="tw-mt-4">
        <button
          type="button"
          className="tw-border tw-border-neutral-400 tw-py-1 tw-px-2 tw-mr-2"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <span>{count}</span>
        <button
          type="button"
          className="tw-border tw-border-neutral-400 tw-py-1 tw-px-2 tw-ml-2"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
