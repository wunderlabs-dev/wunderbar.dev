import Head from "next/head";

import copy from "@/copy/en-EN.json";

import { HomeToolbar } from "@/components/HomeToolbar";

const Home = () => {
  return (
    <>
      <Head>
        <title>{copy.metadata.title}</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <h1>Home</h1>
        </main>

        <HomeToolbar />
      </div>
    </>
  );
};

export default Home;
