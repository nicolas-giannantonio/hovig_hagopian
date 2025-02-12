"use client";
import CardProject from "@/components/Projects/CardProject";
import gsap from "gsap";
import BezierEasing from "bezier-easing";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useLoaded } from "@/lib/useLoader";

type ProjectProp = {
  project: {
    src: string;
    coverImageUrl: string;
    slug: {
      current: string;
    };
    title: string;
    hover_video: string;
    informations: [
      {
        information: {
          information_value: string;
        };
      },
    ];
  };
};

type GridProps = {
  data: ProjectProp[];
};

export default function Grid({ data }: GridProps) {
  const gridProjectsRef = useRef<HTMLDivElement>(null);
  const loaded = useLoaded();

  useGSAP(
    () => {
      if (!loaded || !gridProjectsRef.current) return;
      gsap.to(gridProjectsRef.current.children, {
        duration: 1.5,
        delay: 0.5,
        opacity: 1,
        ease: (t) => BezierEasing(0.28, 0.8, 0.2, 1.0)(t),
        stagger: {
          amount: 0.4,
          from: "start",
        },
        y: 0,
      });
    },
    {
      scope: gridProjectsRef,
      dependencies: [loaded, gridProjectsRef],
    },
  );

  return (
    <div className={"w__grid__projects"} ref={gridProjectsRef}>
      {data.map(
        (data: ProjectProp, index: number) =>
          data.project?.slug?.current && (
            <CardProject
              key={index}
              image={data.project?.coverImageUrl}
              hoverVideo={data.project?.hover_video}
              link={`/film/${data.project?.slug?.current}`}
            />
          ),
      )}
    </div>
  );
}
