// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ar">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri&display=swap"
          rel="stylesheet"
        />
        <meta name="google" content="notranslate" />
        <meta httpEquiv="Content-Language" content="en" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
