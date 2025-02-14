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
      duration: 0.5,
      ease: (t) => EASE["o2"](t),
    });
  }, []);

  return <>{children}</>;
}
