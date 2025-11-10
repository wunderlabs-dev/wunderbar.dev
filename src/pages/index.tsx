"use client";

import Head from "next/head";
import type { GetStaticProps } from "next";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import copy from "@/copy/en-EN.json";

import { useWindowState } from "@/contexts/WindowProvider";
import { INITIAL_WINDOW_POSITION_X, INITIAL_WINDOW_POSITION_Y, DROP_ANIMATION_DURATION } from "@/utils/const";

import { HomeFolder } from "@/components/HomeFolder";
import { HomeWindow } from "@/components/HomeWindow";
import { HomeToolbar } from "@/components/HomeToolbar";

const Home = () => {
  const { state } = useWindowState();

  const [position, setPosition] = useState({
    x: INITIAL_WINDOW_POSITION_X,
    y: INITIAL_WINDOW_POSITION_Y,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    setTimeout(() => {
      setPosition({
        x: position.x + event.delta.x,
        y: position.y + event.delta.y,
      });
    }, DROP_ANIMATION_DURATION);
  };

  return (
    <>
      <Head>
        <title>{copy.metadata.title}</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <DndContext onDragEnd={handleDragEnd}>
          <main className="flex flex-1 items-end justify-start gap-4 px-12 py-12">
            <HomeFolder />
            <AnimatePresence>{state === "OPEN" ? <HomeWindow position={position} /> : null}</AnimatePresence>
          </main>
        </DndContext>

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
