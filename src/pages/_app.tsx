import "@/static/css/tailwind.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Handjet, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

import { cn } from "@/utils/helpers";

const handjet = Handjet({
  subsets: ["latin"],
  variable: "--font-handjet",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <NextIntlClientProvider locale={router.locale ?? "en-EN"} messages={pageProps.messages}>
      <div className={cn(handjet.variable, spaceGrotesk.variable, "font-space-grotesk text-blue-900")}>
        <Component {...pageProps} />
      </div>
    </NextIntlClientProvider>
  );
};

export default App;
