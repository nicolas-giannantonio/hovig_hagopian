"use client";
import { useEffect, useRef, useState } from "react";
import List from "@/components/List";
import Grid from "@/components/Grid";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EASE } from "@/utils/Ease";
import useMobileDetect from "@/lib/DetectScreen";

export type ProjectMode = "grid" | "list";

type ProjectType = {
  project: {
    src: string;
    coverImageUrl: string;
    slug: {
      current: string;
    };
    hover_video: string;
    title: string;
    informations: [
      {
        information: {
          information_value: string;
        };
      },
    ];
  };
};

export default function Projects({
  name,
  data,
}: {
  name: string;
  data: ProjectType[];
}) {
  const { isMobile } = useMobileDetect();

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, [isMobile]);

  const [type, setType] = useState<ProjectMode>(mobile ? "list" : "grid");
  const [targetType, setTargetType] = useState<ProjectMode>(
    mobile ? "list" : "grid",
  );
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
        gsap.to(".w__grid__projects", {
          duration: 0.35,
          opacity: 0,
          // yPercent: -1,
          ease: (t) => EASE["o2"](t),
          onStart: () => {
            setTimeout(() => setType("list"), 185);
          },
        });
      } else if (type === "list" && targetType === "grid") {
        // Transition List -> Grid
        gsap.to(".list_project_p", {
          transform: "translateY(-100%)",
          ease: (t) => EASE["o3"](t),
          duration: 0.65,
          onStart: () => {
            setTimeout(() => setType("grid"), 250);
          },
        });

        gsap.to(".w__list__projects", {
          // yPercent: -1.5,
          ease: (t) => EASE["o2"](t),
          duration: 1.5,
        });

        gsap.to(".w__videoCursor", {
          opacity: 0,
          ease: (t) => EASE["io1"](t),
          duration: 0.2,
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
        {type === "grid" ? <Grid data={data} /> : <List data={data} />}
      </div>
    </div>
  );
}
