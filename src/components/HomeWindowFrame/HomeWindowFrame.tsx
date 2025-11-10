/*
 * ABOUTME: Window frame component
 * ABOUTME: Displays dialup connection interface with progressive loading animation
 */
"use client";

import { motion } from "framer-motion";

import { frame, clipPath } from "@/utils/keyframes";

import { SvgIconFrame } from "@/components/SvgIcon";

const HomeWindowFrame = () => {
  return (
    <div className="mt-1">
      <motion.div {...frame} className="w-52 h-32 px-2 py-2 border border-blue-200">
        <SvgIconFrame size="medium" />
      </motion.div>

      <motion.div {...clipPath} className="w-52 h-32 bg-dialup bg-contain bg-no-repeat bg-blend-multiply" />
    </div>
  );
};

export default HomeWindowFrame;
