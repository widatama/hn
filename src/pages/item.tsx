import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Item() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>HN item</title>
      </Head>
      {`${router.pathname} ${JSON.stringify(router.query)}`}
    </>
  );
}
