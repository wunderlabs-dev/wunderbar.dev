import Head from "next/head";

import copy from "@/copy/en-EN.json";

const Home = () => {
  return (
    <>
      <Head>
        <title>{copy.metadata.title}</title>
      </Head>

      <main>
        <h1>Home</h1>
      </main>
    </>
  );
};

export default Home;
