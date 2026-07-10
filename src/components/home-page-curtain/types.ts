import type { ReactNode } from "react";

export const HomePageCurtainStates = {
  canvas: "canvas",
  closed: "closed",
  revealed: "revealed",
} as const;

export type HomePageCurtainState = (typeof HomePageCurtainStates)[keyof typeof HomePageCurtainStates];

export type HomePageCurtainProps = {
  children: ReactNode;
  underlay: ReactNode;
};
