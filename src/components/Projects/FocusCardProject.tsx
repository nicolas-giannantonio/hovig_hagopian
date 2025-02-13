"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/utils/Ease";

export default function FocusCardProject({ hovered }: { hovered: boolean }) {
  const svgRef = useRef<HTMLDivElement | null>(null);
  const [elements, setElements] = useState<{
    cls1: NodeListOf<Element> | null;
    cls2: NodeListOf<Element> | null;
  }>({ cls1: null, cls2: null });

  useEffect(() => {
    if (svgRef.current) {
      const cls1 = svgRef.current.querySelectorAll(".cls-1");
      const cls2 = svgRef.current.querySelectorAll(".cls-2");
      setElements({ cls1, cls2 });
    }
  }, []);

  useEffect(() => {
    if (hovered) {
      mouseIn();
    } else {
      mouseOut();
    }
  }, [hovered]);

  const mouseIn = () => {
    if (!elements.cls1 || !elements.cls2) return;
    gsap.to(elements.cls1, {
      attr: {
        points:
          "23.83 85.96 14.04 85.96 14.04 50 14.04 14.04 23.83 14.04 23.83 85.96",
      },
      delay: elements.cls1.length * 0.015,
      duration: 0.75,
      ease: (t) => EASE["o3"](t),
    });
    gsap.to(elements.cls2, {
      attr: {
        points:
          "14.04 85.96 14.04 76.17 50 76.17 85.96 76.17 85.96 85.96 14.04 85.9",
      },
      duration: 0.75,
      ease: (t) => EASE["o3"](t),
    });
  };

  const mouseOut = () => {
    if (!elements.cls1 || !elements.cls2) return;
    gsap.to(elements.cls1, {
      attr: {
        points:
          "23.83 85.96 14.04 85.96 14.04 85.96 14.04 85.96 23.83 85.96 23.83 85.96",
      },
      duration: 0.75,
      delay: elements.cls1.length * 0.015,
      ease: (t) => EASE["o3"](t),
    });
    gsap.to(elements.cls2, {
      attr: {
        points:
          "14.04 85.96 14.04 76.17 14.04 76.17 14.04 76.17 14.04 85.96 14.04 85.966",
      },
      duration: 0.75,
      ease: (t) => EASE["o3"](t),
    });
  };

  return (
    <div className="w__cardProjectFocus" ref={svgRef}>
      <svg
        className="cardProjectFocusSvg svg_bl"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <polygon
          className="cls-1"
          points="23.83 85.96 14.04 85.96 14.04 85.96 14.04 85.96 23.83 85.96 23.83 85.96"
        />
        <polygon
          className="cls-2"
          points="14.04 85.96 14.04 76.17 14.04 76.17 14.04 76.17 14.04 85.96 14.04 85.966"
        />
      </svg>

      <svg
        className="cardProjectFocusSvg svg_tl"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <polygon
          className="cls-1"
          points="23.83 85.96 14.04 85.96 14.04 85.96 14.04 85.96 23.83 85.96 23.83 85.96"
        />
        <polygon
          className="cls-2"
          points="14.04 85.96 14.04 76.17 14.04 76.17 14.04 76.17 14.04 85.96 14.04 85.966"
        />
      </svg>

      <svg
        className="cardProjectFocusSvg svg_tr"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <polygon
          className="cls-1"
          points="23.83 85.96 14.04 85.96 14.04 85.96 14.04 85.96 23.83 85.96 23.83 85.96"
        />
        <polygon
          className="cls-2"
          points="14.04 85.96 14.04 76.17 14.04 76.17 14.04 76.17 14.04 85.96 14.04 85.966"
        />
      </svg>
      <svg
        className="cardProjectFocusSvg svg_br"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <polygon
          className="cls-1"
          points="23.83 85.96 14.04 85.96 14.04 85.96 14.04 85.96 23.83 85.96 23.83 85.96"
        />
        <polygon
          className="cls-2"
          points="14.04 85.96 14.04 76.17 14.04 76.17 14.04 76.17 14.04 85.96 14.04 85.966"
        />
      </svg>
    </div>
  );
}
