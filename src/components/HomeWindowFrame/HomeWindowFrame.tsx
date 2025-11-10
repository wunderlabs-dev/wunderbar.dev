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
    <motion.div className="mt-1" initial="hidden" whileInView="visible" viewport={frameFadeIn.viewport}>
      <motion.div
        variants={frameFadeIn.variants}
        transition={frameFadeIn.transition}
        className="w-52 h-32 px-2 py-2 border border-blue-200"
      >
        <SvgIconFrame size="medium" />
      </motion.div>

      <motion.div
        variants={frameClipPath.variants}
        transition={frameClipPath.transition}
        className="w-52 h-32 bg-dialup bg-contain bg-no-repeat bg-blend-multiply"
      />
    </motion.div>
  );
};

export default HomeWindowFrame;
