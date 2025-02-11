import type { Metadata } from "next";
import "../styles/main.scss";

import Navigation from "@/components/Navigation";
import { ReactLenis } from "lenis/react";
import Footer from "@/components/Footer";
import Reperes from "@/components/Utils/Reperes";
import { META_QUERY, TITLE_QUERY } from "@/lib/queries";
import { client } from "@/lib/sanity/client";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  title: "Hovig Hagopian",
  description: "Hovig Hagopian Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const meta = await client.fetch(META_QUERY);

  metadata.title = meta[0].title;
  metadata.description = meta[0].description;

  const navTitles = await client.fetch(TITLE_QUERY);

  return (
    <html lang="en">
      <body>
        <Loader />
        <Reperes />
        <Navigation navTitles={navTitles} />
        <ReactLenis
          root
          options={{
            lerp: 0.3,
          }}
        >
          <div id="App">
            <main>{children}</main>
            <Footer />
          </div>
        </ReactLenis>
      </body>
    </html>
  );
}
