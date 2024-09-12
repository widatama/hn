import React from 'react';

import HomePage from './home-page';

const { Suspense } = React

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE,
}

export default function Page() {
  return(
    <Suspense>
      <HomePage></HomePage>
    </Suspense>
  );
}
