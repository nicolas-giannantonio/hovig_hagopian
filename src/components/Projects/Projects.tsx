"use client";
import { useRef, useState } from "react";
import List from "@/components/List";
import Grid from "@/components/Grid";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EASE } from "@/utils/Ease";

type ProjectMode = "grid" | "list";

export default function Projects({ name }: { name: string }) {
  const [type, setType] = useState<ProjectMode>("grid");
  const [targetType, setTargetType] = useState<ProjectMode>("grid");
  const [isFirst, setIsFirst] = useState(true);
  const container = useRef<HTMLDivElement>(null);

  const projectsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (isFirst) {
        gsap.to(".header__text", {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.15,
          ease: (t) => EASE["o4"](t),
          stagger: 0.25,
          onComplete: () => {},
        });
        setIsFirst(false);
        return;
      }

      if (type === "grid" && targetType === "list") {
        // Transition Grid -> List
        gsap.to(".cardProject", {
          duration: 0.5,
          opacity: 0,
          ease: (t) => EASE["o2"](t),
          onComplete: () => setType("list"),
        });
      } else if (type === "list" && targetType === "grid") {
        // Transition List -> Grid
        gsap.to(".list_project_p", {
          y: -10,
          ease: (t) => EASE["o2"](t),
          duration: 0.5,
        });

        gsap.to(".w__list__projects", {
          opacity: 0,
          ease: (t) => EASE["o2"](t),
          duration: 0.5,
          onComplete: () => setType("grid"),
        });

        gsap.to(".videoCursor", {
          opacity: 0,
          ease: (t) => EASE["o2"](t),
          duration: 0.5,
          onComplete: () => setType("grid"),
        });
      }
    },
    { scope: projectsRef, dependencies: [targetType, type] },
  );

  return (
    <div ref={projectsRef} className="projects">
      <div className="header__projects">
        <div className="__oh">
          <p className={"header__text h_title"}>[ {name} ]</p>
        </div>
        <div className="header__type__switch">
          <p className="header__text">
            <span
              className={`header__s ${type === "grid" ? "header__type_active" : ""}`}
              onClick={() => setTargetType("grid")}
            >
              Grid
            </span>
            <span> / </span>
            <span
              className={`header__s ${type === "list" ? "header__type_active" : ""}`}
              onClick={() => setTargetType("list")}
            >
              List
            </span>
          </p>
        </div>
      </div>

      <div ref={container} className="w__projects">
        {type === "grid" ? <Grid /> : <List />}
      </div>
    </div>
  );
}
