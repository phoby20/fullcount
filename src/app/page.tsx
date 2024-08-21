import Head from "next/head";
import Main from "./Main/page";

export default function Home() {
  return (
    <main>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <Main />
    </main>
  );
}
