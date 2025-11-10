import Head from "next/head";
import type { GetStaticProps } from "next";

import copy from "@/copy/en-EN.json";

import { HomeDesktop } from "@/components/HomeDesktop";
import { HomeToolbar } from "@/components/HomeToolbar";

const Home = () => {
  return (
    <>
      <Head>
        <title>{copy.metadata.title}</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <HomeDesktop />
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
