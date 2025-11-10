/*
 * ABOUTME: Desktop selection component
 * ABOUTME: Displays a selection rectangle when dragging on the desktop
 */
"use client";

import { useState, useCallback } from "react";
import { useEventListener, useBoolean } from "usehooks-ts";

import { cssToUnit } from "@/utils/helpers";

const HomeSelection = () => {
  const isSelecting = useBoolean(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: MouseEvent) => {
    // Only start selection on left click on the desktop background
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("[data-no-select]")) return;

    isSelecting.setTrue();
    setStartPos({ x: e.clientX, y: e.clientY });
    setCurrentPos({ x: e.clientX, y: e.clientY });
  }, [isSelecting]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isSelecting.value) return;
      setCurrentPos({ x: e.clientX, y: e.clientY });
    },
    [isSelecting.value],
  );

  const handleMouseUp = useCallback(() => {
    isSelecting.setFalse();
  }, [isSelecting]);

  useEventListener("mousedown", handleMouseDown);
  useEventListener("mousemove", handleMouseMove);
  useEventListener("mouseup", handleMouseUp);

  if (!isSelecting.value) return null;

  const left = Math.min(startPos.x, currentPos.x);
  const top = Math.min(startPos.y, currentPos.y);
  const width = Math.abs(currentPos.x - startPos.x);
  const height = Math.abs(currentPos.y - startPos.y);

  return (
    <div
      className="fixed pointer-events-none border border-blue-400 bg-blue-400/20"
      style={{
        left: cssToUnit(left),
        top: cssToUnit(top),
        width: cssToUnit(width),
        height: cssToUnit(height),
      }}
    />
  );
};

export default HomeSelection;
