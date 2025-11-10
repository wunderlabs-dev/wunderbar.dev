import { Html, Head, Main, NextScript } from "next/document";

import copy from "@/copy/en-EN.json";

const Document = () => {
  return (
    <Html lang="en" className="overscroll-none">
      <Head>
        <meta name="description" content={copy.metadata.description} />
        <meta name="twitter:title" content={copy.metadata.title} />
        <meta name="twitter:description" content={copy.metadata.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og-image.png" />
        <meta property="og:title" content={copy.metadata.title} />
        <meta property="og:description" content={copy.metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://wunderlabs.dev/" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
      </Head>

      <body className="bg-beige-100 bg-dither bg-blend-overlay bg-cover bg-center bg-no-repeat antialiased select-none overscroll-none">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
