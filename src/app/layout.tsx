import Link from 'next/link';
import React from 'react';

import StoreProvider from '@/store/Provider';
import '@/stylesheets/main.css';

export const metadata = {
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH}/favicon.png`,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="tw-min-w-[40vh] md:tw-min-w-[60vh] tw-w-[75%] tw-mx-auto tw-overflow-y-auto">
          <header className="tw-mt-4 tw-mb-6">
            <h1 className="tw-font-bold tw-text-2xl">
              <Link href="/">
                {process.env.NEXT_PUBLIC_APP_TITLE}
              </Link>
            </h1>
          </header>
          <StoreProvider>
            {children}
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
