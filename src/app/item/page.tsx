import React from 'react';

import ItemPage from './item-page';

const { Suspense } = React;

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE,
}

export default function Page() {
  return(
    <Suspense>
      <ItemPage></ItemPage>
    </Suspense>
  );
}
