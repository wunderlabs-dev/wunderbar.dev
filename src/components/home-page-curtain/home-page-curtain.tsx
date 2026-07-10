"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isNil, negate } from "es-toolkit";

import type { LayoutSubtreeCanvas } from "@/utils/html-in-canvas";
import { cn } from "@/utils/helpers";
import { startWebGlCurtain } from "@/utils/home-page-curtain";

import { HomePageCurtainContextProvider } from "@/context/home-page-curtain-context";
import { useHtmlInCanvasSupport } from "@/context/html-in-canvas-context";

import { HomePageCurtainStates, type HomePageCurtainProps, type HomePageCurtainState } from "./types";

const DEFAULT_CLICK_POSITION_RATIO = 0.5;
const MAX_DEVICE_PIXEL_RATIO = 2;
const PROGRAMMATIC_TAB_INDEX = -1;

const INITIAL_CAPTURE = {
  clickX: 0,
  scrollOffset: 0,
};

const CANVAS_ATTRIBUTES = {
  layoutsubtree: "",
} as const;

const FOCUS_OPTIONS = {
  preventScroll: true,
} as const;

const not = negate((value: boolean) => value);

const removeIdsFromClone = (element: HTMLElement) => {
  element.removeAttribute("id");

  for (const child of element.querySelectorAll<HTMLElement>("[id]")) {
    child.removeAttribute("id");
  }
};

const resolveClickX = (clickX: number | undefined, viewportWidth: number) => {
  const defaultClickPosition = viewportWidth * DEFAULT_CLICK_POSITION_RATIO;
  const clickPosition = Number.isFinite(clickX) ? (clickX ?? defaultClickPosition) : defaultClickPosition;

  return Math.min(Math.max(clickPosition, INITIAL_CAPTURE.clickX), viewportWidth);
};

const createViewportCapture = (site: HTMLElement, width: number, height: number, scrollOffset: number): HTMLElement => {
  const source = document.createElement("div");
  const siteClone = site.cloneNode(true) as HTMLElement;

  source.className = "pointer-events-none absolute inset-0 overflow-hidden bg-cream-50 [contain:layout_paint]";
  source.setAttribute("aria-hidden", "true");
  source.setAttribute("inert", "");
  source.style.width = `${width}px`;
  source.style.height = `${height}px`;

  siteClone.className = cn(siteClone.className, "absolute left-0 min-h-dvh");
  siteClone.style.top = `${-scrollOffset}px`;
  siteClone.style.width = `${width}px`;
  removeIdsFromClone(siteClone);
  source.append(siteClone);

  return source;
};

const HomePageCurtain = ({ children, underlay }: HomePageCurtainProps) => {
  const { supported: isHtmlInCanvasSupported } = useHtmlInCanvasSupport();
  const [curtainState, setCurtainState] = useState<HomePageCurtainState>(HomePageCurtainStates.closed);
  const [isSiteHidden, setIsSiteHidden] = useState(false);
  const captureRef = useRef(INITIAL_CAPTURE);
  const siteRef = useRef<HTMLDivElement>(null);
  const underlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isCanvasActive = curtainState === HomePageCurtainStates.canvas;
  const isClosed = curtainState === HomePageCurtainStates.closed;
  const isRevealed = curtainState === HomePageCurtainStates.revealed;
  const hasRevealStarted = not(isClosed);
  const isUnderlayHidden = not(isRevealed);

  const completeReveal = useCallback(() => {
    setIsSiteHidden(true);
    setCurtainState(HomePageCurtainStates.revealed);
  }, []);

  const revealAgents = useCallback(
    (clickX?: number) => {
      if (hasRevealStarted) {
        return;
      }

      const viewportWidth = window.innerWidth;
      captureRef.current = {
        clickX: resolveClickX(clickX, viewportWidth),
        scrollOffset: window.scrollY,
      };
      document.documentElement.classList.add("overflow-hidden");

      if (isHtmlInCanvasSupported) {
        setCurtainState(HomePageCurtainStates.canvas);
        return;
      }

      completeReveal();
    },
    [completeReveal, hasRevealStarted, isHtmlInCanvasSupported],
  );

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    if (not(isCanvasActive)) {
      return;
    }

    const canvas = canvasRef.current as LayoutSubtreeCanvas | null;
    const site = siteRef.current;

    if (isNil(canvas) || isNil(site)) {
      completeReveal();
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const devicePixelRatio = Math.min(window.devicePixelRatio, MAX_DEVICE_PIXEL_RATIO);
    const source = createViewportCapture(site, width, height, captureRef.current.scrollOffset);

    canvas.width = Math.round(width * devicePixelRatio);
    canvas.height = Math.round(height * devicePixelRatio);
    canvas.layoutSubtree = true;
    canvas.append(source);

    const dispose = startWebGlCurtain({
      canvas,
      clickX: captureRef.current.clickX,
      height,
      onComplete: completeReveal,
      onFailure: completeReveal,
      onReady: () => setIsSiteHidden(true),
      source,
      width,
    });

    return () => {
      dispose();
      canvas.replaceChildren();
    };
  }, [completeReveal, isCanvasActive]);

  useEffect(() => {
    if (isUnderlayHidden) {
      return;
    }

    const focusFrame = requestAnimationFrame(() => underlayRef.current?.focus(FOCUS_OPTIONS));

    return () => cancelAnimationFrame(focusFrame);
  }, [isUnderlayHidden]);

  return (
    <HomePageCurtainContextProvider revealAgents={revealAgents}>
      <div className="relative isolate min-h-dvh" aria-busy={isCanvasActive}>
        <div
          ref={underlayRef}
          className="fixed inset-0 z-0 overflow-hidden bg-gray-400 outline-none"
          aria-hidden={isUnderlayHidden}
          inert={isUnderlayHidden}
          tabIndex={PROGRAMMATIC_TAB_INDEX}
        >
          {underlay}
        </div>

        {isCanvasActive ? (
          <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-20 block h-dvh w-screen overflow-hidden"
            aria-hidden="true"
            inert
            {...CANVAS_ATTRIBUTES}
          />
        ) : null}

        <div
          ref={siteRef}
          className={cn("relative z-10 min-h-dvh bg-cream-50", isSiteHidden ? "invisible" : undefined)}
          aria-hidden={hasRevealStarted}
          inert={hasRevealStarted}
        >
          {children}
        </div>
      </div>
    </HomePageCurtainContextProvider>
  );
};

export default HomePageCurtain;
