import Head from "next/head";

import copy from "@/copy/en-EN.json";

const Home = () => {
  return (
    <>
      <Head>
        <title>{copy.metadata.title}</title>
      </Head>

      <div className="min-h-screen">
        <main>
          <h1>Home</h1>
        </main>
      </div>
    </>
  );
};

export default Home;
