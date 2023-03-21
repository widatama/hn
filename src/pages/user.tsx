import Head from 'next/head';
import { useRouter } from 'next/router';

export default function User() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>HN user</title>
      </Head>
      {`${router.pathname} ${JSON.stringify(router.query)}`}
    </>
  );
}
