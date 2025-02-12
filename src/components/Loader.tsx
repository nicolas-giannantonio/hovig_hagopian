"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import BezierEasing from "bezier-easing";
import { EASE } from "@/utils/Ease";

export default function Loader() {
  const loaderLineRef = useRef<HTMLDivElement | null>(null);
  const loaderLineUnderRef = useRef<HTMLDivElement | null>(null);
  const loaderNumberRef = useRef<HTMLParagraphElement | null>(null);
  const containerLoaderNumberRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const imgs = document.querySelectorAll("img");
    let loaded = 0;
    const total = imgs.length;

    for (let i = 0; i < total; i++) {
      const img = new Image();
      img.src = imgs[i].getAttribute("src") || "";
      img.onload = () => {
        loaded++;
        const progress = Math.floor((loaded / total) * 100);
        loaderLineRef.current!.style.transform = `scaleX(${progress / 100})`;
        loaderNumberRef.current!.textContent = `${progress}%`;
        containerLoaderNumberRef.current!.style.left = `${progress}%`;

        if (progress === 100) LoaderOut();
      };
    }

    if (total === 0) {
      loaderNumberRef.current!.textContent = "100%";
      gsap.to(containerLoaderNumberRef.current, {
        left: "100%",
        duration: 1.25,
        ease: (t) => BezierEasing(0.6, 0.2, 0.1, 1.0)(t),
      });

      setTimeout(LoaderOut, 1250);

      gsap.to(loaderLineRef.current, {
        scaleX: 1,
        duration: 1.25,
        ease: (t) => BezierEasing(0.6, 0.2, 0.1, 1.0)(t),
      });
    }
  }, []);

  const LoaderOut = () => {
    if (!loaderLineRef.current) return;
    loaderLineRef.current.style.transition = "none";
    loaderLineRef.current.style.transformOrigin = "right";
    gsap.to(loaderLineRef.current, {
      scaleX: 0,
      delay: 0.15,
      duration: 1.75 + 0.5,
      ease: (t) => BezierEasing(0.6, 0.2, 0.1, 1.0)(t),
    });

    gsap.to(loaderLineUnderRef.current, {
      scaleX: 0,
      delay: 0.15,
      duration: 1.75,
      ease: (t) => BezierEasing(0.95, 0.2, 0.1, 1.0)(t),
    });

    gsap.to(".loader_overlay", {
      opacity: 0,
      duration: 0.5,
      delay: 1.25,
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
        }, 50);
      },
    });

    gsap.to(loaderNumberRef.current, {
      transform: "translateX(100%)",
      delay: 0.25,
      duration: 1.5,
      ease: (t) => BezierEasing(0.65, 0.2, 0.1, 1.0)(t),
    });
  };

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
        <div ref={containerLoaderNumberRef} className="loader__number">
          <p ref={loaderNumberRef}>0%</p>
        </div>
      </div>
    </div>
  );
}
