"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useIntersectionObserver } from "hamo";
export default function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [setElement, entry] = useIntersectionObserver({
    once: false,
  });

  useGSAP(
    () => {
      console.log("executing");
      if (entry?.isIntersecting) {
        gsap.to(".fo_t", {
          duration: 1.5,
          ease: "power4.out",
          y: 0,
          stagger: 0.15,
          opacity: 1,
        });
      }
    },
    {
      scope: footerRef,
      dependencies: [entry],
    },
  );

  return (
    <div
      ref={(el) => {
        footerRef.current = el;
        setElement(el);
      }}
      id="fo"
    >
      <div className="__oh">
        <p className={"fo_t"}>copyright ©2025</p>
      </div>
      <div className="__oh">
        <p className={"fo_t"}>Hovig Hagopian</p>
      </div>
    </div>
  );
}
