import React from 'react';

import UserPage from './user-page';

const { Suspense } = React;

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE,
}

export default function Page() {
  return(
    <Suspense>
      <UserPage></UserPage>
    </Suspense>
  );
}
