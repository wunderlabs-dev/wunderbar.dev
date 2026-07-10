import type { ReactNode } from "react";

import { HtmlInCanvasSupportProvider } from "@/context/html-in-canvas-context";

import { HomePageLogoConsole } from "@/components/home-page-logo-console";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <HtmlInCanvasSupportProvider>
      {children}
      <HomePageLogoConsole />
    </HtmlInCanvasSupportProvider>
  );
};

export default SiteLayout;
