import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wunderlabs",
  description: "Building the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
