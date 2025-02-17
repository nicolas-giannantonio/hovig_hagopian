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
      if (!loaderLineRef.current) return;
      loaderLineRef.current.style.transition = "none";

      gsap.to(loaderLineRef.current, {
        xPercent: 0,
        duration: 0.75,
        ease: (t) => BezierEasing(0.19, 0.81, 0.26, 1)(t),
      });

      gsap.to(loaderLineRef.current, {
        xPercent: 200,
        delay: 0.75,
        duration: 1.5,
        ease: (t) => BezierEasing(0.65, 0.25, 0.18, 1.0)(t),
      });

      gsap.to(loaderLineUnderRef.current, {
        xPercent: 100,
        duration: 1,
        delay: 0.5,
        ease: (t) => BezierEasing(0.19, 0.81, 0.26, 1)(t),
      });

      gsap.to(loaderLineUnderRef.current, {
        xPercent: 200,
        delay: 1.25,
        duration: 1,
        ease: (t) => BezierEasing(0.65, 0.25, 0.18, 1.0)(t),
      });

      gsap.to(".loader_overlay", {
        opacity: 0,
        duration: 0.75,
        delay: 2.25,
        ease: (t) => EASE["o1"](t),
        onComplete: () => {
          loaderRef.current?.remove();
        },
        onStart: () => {
          setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error

            window.appLoaded = true;
            window.dispatchEvent(new Event("app-loaded"));
          }, 250);
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
