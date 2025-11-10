/*
 * ABOUTME: Window frame component
 * ABOUTME: Displays dialup connection interface with progressive loading animation
 */
"use client";

import { motion } from "framer-motion";

import { frameFadeIn, frameClipPath } from "@/utils/keyframes";

import { SvgIconFrame } from "@/components/SvgIcon";

const HomeWindowFrame = () => {
  return (
    <motion.div
      className="mt-1"
      initial="hidden"
      whileInView="visible"
      viewport={frameFadeIn.viewport}
    >
      <motion.div
        variants={frameFadeIn.variants}
        transition={frameFadeIn.transition}
        className="h-32 w-52 border border-blue-200 px-2 py-2"
      >
        <SvgIconFrame size="medium" />
      </motion.div>

      <motion.div
        variants={frameClipPath.variants}
        className="bg-dialup h-32 w-52 bg-contain bg-no-repeat bg-blend-multiply"
      />
    </motion.div>
  );
};

export default HomeWindowFrame;
