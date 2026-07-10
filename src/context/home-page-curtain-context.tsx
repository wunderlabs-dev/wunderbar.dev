"use client";

import { createContext, useContext, type ReactNode } from "react";
import { isNil } from "es-toolkit";

type HomePageCurtainContextValue = {
  revealAgents: (clickX?: number) => void;
};

const HomePageCurtainContext = createContext<HomePageCurtainContextValue | null>(null);

type HomePageCurtainContextProviderProps = HomePageCurtainContextValue & {
  children: ReactNode;
};

const HomePageCurtainContextProvider = ({ children, revealAgents }: HomePageCurtainContextProviderProps) => {
  return <HomePageCurtainContext.Provider value={{ revealAgents }}>{children}</HomePageCurtainContext.Provider>;
};

const useHomePageCurtain = (): HomePageCurtainContextValue => {
  const context = useContext(HomePageCurtainContext);

  if (isNil(context)) {
    throw new Error("useHomePageCurtain must be used within HomePageCurtain.");
  }

  return context;
};

export { HomePageCurtainContextProvider, useHomePageCurtain };
export type { HomePageCurtainContextValue };
