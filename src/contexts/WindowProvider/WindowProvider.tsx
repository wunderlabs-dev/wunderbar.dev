// ABOUTME: Window state management context
// ABOUTME: Provides window state and actions
"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type WindowState = "OPEN" | "CLOSED";
type WindowSize = "DEFAULT" | "ENLARGED";

type WindowContextType = {
  size: WindowSize;
  state: WindowState;
  setSize: (size: WindowSize) => void;
  setState: (state: WindowState) => void;
};

const WindowContext = createContext<WindowContextType>({
  state: "OPEN",
  size: "DEFAULT",
  setSize: () => {},
  setState: () => {},
});

type WindowProviderProps = {
  children: ReactNode;
};

export const WindowProvider = ({ children }: WindowProviderProps) => {
  const [size, setSize] = useState<WindowSize>("DEFAULT");
  const [state, setState] = useState<WindowState>("OPEN");

  return (
    <WindowContext.Provider
      value={{
        state,
        size,
        setState,
        setSize,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowState = () => {
  return useContext(WindowContext);
};
