'use client'

import { useSearchParams } from 'next/navigation';
import React from 'react';

import HNUserComp from '@/components/HNUserComp';
import LoadingCue from '@/components/LoadingCue';
import { useGetUserQuery } from '@/store/api/hn';

export default function UserPage() {
  const searchParams = useSearchParams();

  const {
    data: hnUser = {},
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetUserQuery(searchParams.get('id') || '');

  if (!(searchParams.get('id'))) {
    return (
      <div>No such user</div>
    );
  }

  let content: React.ReactNode;

  if (isLoading) {
    content = <LoadingCue />;
  } else if (isSuccess && hnUser) {
    content = <HNUserComp hnUser={hnUser} />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else {
    content = <div>No such user</div>;
  }

  return (
    <>
      <title>{`Profile: ${searchParams.get('id')} | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      {content}
    </>
  );
}
