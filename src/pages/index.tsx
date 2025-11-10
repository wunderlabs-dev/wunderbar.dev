import Head from "next/head";
import type { GetStaticProps } from "next";

import copy from "@/copy/en-EN.json";

import { HomeFolder } from "@/components/HomeFolder";
import { HomeWindow } from "@/components/HomeWindow";
import { HomeToolbar } from "@/components/HomeToolbar";

const Home = () => {

  return (
    <>
      <Head>
        <title>{copy.metadata.title}</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <main className="flex flex-1 items-end justify-start gap-4 px-12 py-12">
          <HomeFolder />
          <HomeWindow />
        </main>
        <HomeToolbar />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      messages: copy,
    },
  };
};

export default Home;
