"use client";
import { ReactNode, useRef } from "react";
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
      ease: (t) => EASE["o1"](t),
    });
  }, [
    {
      scope: "#App",
    },
  ]);

  return <>{children}</>;
}
