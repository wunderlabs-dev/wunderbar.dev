/*
 * ABOUTME: Desktop window component
 * ABOUTME: Represents a window on the desktop
 */
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useDraggable, DragOverlay } from "@dnd-kit/core";

import { drop, windowClipPath } from "@/utils/keyframes";
import { cn, cssToUnit } from "@/utils/helpers";
import { useWindowState } from "@/contexts/WindowProvider";

import { HomeWindowContent } from "@/components/HomeWindowContent";
import { HomeWindowToolbar } from "@/components/HomeWindowToolbar";

export type HomeWindowProps = {
  position: { x: number; y: number };
};

const HomeWindow = ({ position }: HomeWindowProps) => {
  const t = useTranslations();

  const { size } = useWindowState();

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: t("desktop.window.title"),
  });

  return (
    <>
      <motion.div
        ref={setNodeRef}
        style={{
          top: cssToUnit(position.y),
          left: cssToUnit(position.x),
        }}
        initial={windowClipPath.initial}
        animate={windowClipPath.animate}
        exit={windowClipPath.exit}
        className="absolute bg-beige-100 border border-blue-400"
      >
        <div className={cn("bg-beige-100 w-window flex flex-col", size === "ENLARGED" ? "h-window-2xl" : "h-window")}>
          <HomeWindowToolbar listeners={listeners} attributes={attributes} />
          <HomeWindowContent />
        </div>
      </motion.div>

      <DragOverlay dropAnimation={drop}>
        <div className={cn("border border-blue-400 w-window", size === "ENLARGED" ? "h-window-2xl" : "h-window")} />
      </DragOverlay>
    </>
  );
};

export default HomeWindow;
