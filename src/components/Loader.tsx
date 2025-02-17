"use client";

import { useRef } from "react";
import gsap from "gsap";
import BezierEasing from "bezier-easing";
import { EASE } from "@/utils/Ease";
import { useGSAP } from "@gsap/react";

export default function Loader() {
  const loaderLineRef = useRef<HTMLDivElement | null>(null);
  const loaderLineUnderRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!loaderLineRef.current || !loaderLineUnderRef.current) return;
      loaderLineRef.current.style.transition = "none";

      gsap.to(loaderLineRef.current, {
        xPercent: 201,
        duration: 2,
        ease: (t) => BezierEasing(0.7, 0.25, 0.18, 1.0)(t),
      });

      gsap.to(loaderLineUnderRef.current, {
        scaleX: 1,
        duration: 1,
        onComplete: () => {
          if (loaderLineUnderRef.current)
            loaderLineUnderRef.current.style.transformOrigin = "right";
        },
        ease: (t) => BezierEasing(0.65, 0.25, 0.18, 1.0)(t),
      });

      gsap.to(loaderLineUnderRef.current, {
        scaleX: 0,
        delay: 1,
        duration: 1,
        ease: (t) => BezierEasing(0.15, 0.5, 0.18, 1.0)(t),
      });

      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error

        window.appLoaded = true;
        window.dispatchEvent(new Event("app-loaded"));
      }, 1800);

      gsap.to(".loader_overlay", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.75,
        delay: 1.8,
        // ease: (t) => BezierEasing(0.72, 0.15, 0.15, 1.0)(t),
        ease: (t) => BezierEasing(0.24, 0.8, 0.1, 1.0)(t),
        onComplete: () => {
          loaderRef.current?.remove();
        },
      });
    },
    {
      scope: loaderRef,
    },
  );

  return (
    <div ref={loaderRef} id="Loader">
      <div className="loader_overlay"></div>
      <div className="w__loader__info">
        <div className="w__loader__lines">
          <div ref={loaderLineRef} className="loader__line line_prog"></div>
          <div
            ref={loaderLineUnderRef}
            className="loader__line line_under"
          ></div>
        </div>
      </div>
    </div>
  );
}
