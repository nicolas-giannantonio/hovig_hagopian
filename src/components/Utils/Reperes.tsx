"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { EASE } from "@/utils/Ease";

const bz = EASE["o6"];

export default function Reperes() {
  const isOpen = useRef(false);
  const repereRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "G") {
        toggleReperes();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleReperes = () => {
    const currentCol = repereRef.current?.children;
    if (!currentCol) return;

    if (isOpen.current) {
      close(currentCol);
    } else {
      open(currentCol);
    }
  };

  const open = (currentCol: HTMLCollection) => {
    isOpen.current = true;
    gsap.to(currentCol, {
      scaleY: 1,
      stagger: 0.032,
      duration: 1.15,
      ease: (t) => bz(t),
    });
  };

  const close = (currentCol: HTMLCollection) => {
    isOpen.current = false;
    gsap.to(currentCol, {
      scaleY: 0,
      stagger: 0.032,
      duration: 1.15,
      ease: (t) => bz(t),
    });
  };

  return (
    <div ref={repereRef} id="reperes">
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
    </div>
  );
}
