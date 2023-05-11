import Head from 'next/head';
import { useRouter } from 'next/router';

import HNItemList from '@/components/HNItemList';

function isNumeric(inp: unknown) {
  if (typeof inp !== 'string') return false;

  return !Number.isNaN(inp) && !Number.isNaN(parseFloat(inp));
}

export default function Home() {
  const router = useRouter();
  let currentPage = 1;

  if (typeof router.query.p === 'string' && isNumeric(router.query.p)) {
    currentPage = parseInt(router.query.p, 10);
  }

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TITLE}</title>
      </Head>
      <HNItemList page={currentPage} />
    </>
  );
}
