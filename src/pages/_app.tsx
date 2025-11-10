import "@/static/css/tailwind.css";

import type { AppProps } from "next/app";
import { Handjet, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

import { cn } from "@/utils/helpers";

import { WindowProvider } from "@/contexts/WindowProvider";

const handjet = Handjet({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-handjet",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <NextIntlClientProvider locale="en-EN" messages={pageProps.messages}>
      <WindowProvider>
        <div className={cn(handjet.variable, spaceGrotesk.variable, "font-space-grotesk text-blue-900")}>
          <Component {...pageProps} />
        </div>
      </WindowProvider>
    </NextIntlClientProvider>
  );
};

export default App;
