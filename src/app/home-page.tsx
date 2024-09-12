'use client'

import { useSearchParams } from 'next/navigation';
import React from 'react';

import HNItemList from '@/components/HNItemList';

function isNumeric(inp: unknown) {
  if (typeof inp !== 'string') return false;

  return !Number.isNaN(inp) && !Number.isNaN(parseFloat(inp));
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('p');
  let currentPage = 1;

  if (typeof pageParam === 'string' && isNumeric(pageParam)) {
    currentPage = parseInt(pageParam, 10);
  }

  return(
    <>
      <HNItemList page={currentPage} />
    </>
  );
}
