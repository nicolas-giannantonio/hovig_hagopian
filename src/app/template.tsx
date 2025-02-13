"use client";
import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { EASE } from "@/utils/Ease";

export default function Template({
  children,
}: Readonly<{ children: ReactNode }>) {
  useEffect(() => {
    gsap.to("#App", {
      opacity: 1,
      duration: 0.35,
      ease: (t) => EASE["o2"](t),
    });
  }, []);

  return <>{children}</>;
}
