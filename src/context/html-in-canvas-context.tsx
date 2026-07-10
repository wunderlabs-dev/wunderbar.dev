"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { isFunction, isNil, isUndefined } from "es-toolkit";

import type { DrawElementImageContext, ElementImageWebGL2Context, LayoutSubtreeCanvas } from "@/utils/html-in-canvas";

const detectHtmlInCanvas = (): boolean | null => {
  if (isUndefined(globalThis.document)) {
    return null;
  }

  const canvas2d = document.createElement("canvas") as LayoutSubtreeCanvas;
  const webGlCanvas = document.createElement("canvas") as LayoutSubtreeCanvas;
  const supportsLayoutSubtree = "layoutSubtree" in canvas2d;

  if (supportsLayoutSubtree) {
    canvas2d.layoutSubtree = supportsLayoutSubtree;
    webGlCanvas.layoutSubtree = supportsLayoutSubtree;
  }

  const context2d = canvas2d.getContext("2d") as DrawElementImageContext | null;
  const supportsElementDrawing = isFunction(context2d?.drawElementImage) || isFunction(context2d?.drawElement);
  const webGl = webGlCanvas.getContext("webgl2") as ElementImageWebGL2Context | null;
  const supportsElementTexture = isFunction(webGl?.texElementImage2D) || isFunction(webGl?.texElement2D);

  return supportsLayoutSubtree && supportsElementDrawing && supportsElementTexture;
};

const subscribe = () => () => {};
const getServerSnapshot = () => null;

type HtmlInCanvasSupportContextValue = {
  supported: boolean | null;
};

const HtmlInCanvasSupportContext = createContext<HtmlInCanvasSupportContextValue | null>(null);

type HtmlInCanvasSupportProviderProps = {
  children: ReactNode;
};

const HtmlInCanvasSupportProvider = ({ children }: HtmlInCanvasSupportProviderProps) => {
  const supported = useSyncExternalStore(subscribe, detectHtmlInCanvas, getServerSnapshot);

  const value = useMemo(() => ({ supported }), [supported]);

  return <HtmlInCanvasSupportContext.Provider value={value}>{children}</HtmlInCanvasSupportContext.Provider>;
};

const useHtmlInCanvasSupport = (): HtmlInCanvasSupportContextValue => {
  const context = useContext(HtmlInCanvasSupportContext);

  if (isNil(context)) {
    throw new Error("useHtmlInCanvasSupport must be used within HtmlInCanvasSupportProvider.");
  }

  return context;
};

export { HtmlInCanvasSupportProvider, useHtmlInCanvasSupport };
export type { HtmlInCanvasSupportContextValue };
