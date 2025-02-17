"use client";
import { ReactNode } from "react";
import gsap from "gsap";
import { EASE } from "@/utils/Ease";
import { useGSAP } from "@gsap/react";

export default function Template({
  children,
}: Readonly<{ children: ReactNode }>) {
  useGSAP(() => {
    gsap.to("#App", {
      opacity: 1,
      duration: 0.75,
      ease: (t) => EASE["o3"](t),
    });
  }, [
    {
      scope: "#App",
    },
  ]);

  return <>{children}</>;
}
