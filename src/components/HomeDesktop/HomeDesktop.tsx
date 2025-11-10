/*
 * ABOUTME: Desktop layout for the home page
 * ABOUTME: Contains the main content area
 */

import { HomeDesktopFolder, HomeDesktopWindow } from "@/components/HomeDesktop";

const HomeDesktop = () => {
  return (
    <main className="flex flex-1 items-end justify-start px-12 py-12 gap-4">
      <HomeDesktopFolder />
      <HomeDesktopWindow />
    </main>
  );
};

export default HomeDesktop;
