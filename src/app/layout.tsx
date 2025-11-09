import "@/static/css/tailwind.css";

import type { Metadata } from "next";

import copy from "@/copy/en-EN.json";

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  openGraph: {
    title: copy.metadata.title,
    description: copy.metadata.description,
    type: "website",
    locale: "en_US",
    url: "https://wunderlabs.dev/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.metadata.title,
    description: copy.metadata.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
