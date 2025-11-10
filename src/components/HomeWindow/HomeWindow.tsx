/*
 * ABOUTME: Desktop window component
 * ABOUTME: Represents a window on the desktop
 */
"use client";

import { useTranslations } from "next-intl";
import { useDraggable, DragOverlay } from "@dnd-kit/core";

import { drop } from "@/utils/keyframes";
import { cssToUnit } from "@/utils/helpers";

import { HomeWindowContent } from "@/components/HomeWindowContent";
import { HomeWindowToolbar } from "@/components/HomeWindowToolbar";

export type HomeWindowProps = {
  position: { x: number; y: number };
};

const HomeWindow = ({ position }: HomeWindowProps) => {
  const t = useTranslations();

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: t("desktop.window.title"),
  });

  return (
    <>
      <div
        ref={setNodeRef}
        style={{
          top: cssToUnit(position.y),
          left: cssToUnit(position.x),
        }}
        className="absolute bg-beige-100 outline outline-blue-400"
      >
        <div className="bg-beige-100 outline outline-blue-400">
          <HomeWindowToolbar listeners={listeners} attributes={attributes} />
          <HomeWindowContent />
        </div>
      </div>

      <DragOverlay dropAnimation={drop}>
        <div className="border border-blue-400 w-window h-window" />
      </DragOverlay>
    </>
  );
};

export default HomeWindow;
