import type { Metadata } from "next";
import "../styles/main.scss";
import "lenis/dist/lenis.css";

import Navigation from "@/components/Navigation";
import { ReactLenis } from "lenis/react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hovig Hagopian",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <ReactLenis
          root
          options={{
            lerp: 0.25,
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
