import type { ReactNode } from "react";

export const HomePageCurtainStates = {
  capturing: "capturing",
  closed: "closed",
  falling: "falling",
  revealed: "revealed",
} as const;

export type HomePageCurtainState = (typeof HomePageCurtainStates)[keyof typeof HomePageCurtainStates];

export type HomePageCurtainProps = {
  children: ReactNode;
  underlay: ReactNode;
};
