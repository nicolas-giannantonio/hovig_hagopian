import type { Metadata } from "next";
import "../styles/main.scss";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Reperes from "@/components/Utils/Reperes";
import { META_QUERY, TITLE_QUERY } from "@/lib/queries";
import { client } from "@/lib/sanity/client";
import Loader from "@/components/Loader";
import { ReactLenis } from "lenis/react";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await client.fetch(META_QUERY);
  console.log(meta);
  return {
    title: meta[0].title,
    description: meta[0].description,
    openGraph: {
      type: "website",
      url: meta[0].url,
      title: meta[0].title,
      description: meta[0].description,
      images: [
        {
          url: meta[0].meta_image.asset.url,
          alt: meta[0].title,
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            duration: 0.4,
            syncTouch: true,
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
