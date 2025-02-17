"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { EASE } from "@/utils/Ease";
import gsap from "gsap";
import { useLoaded } from "@/lib/useLoader";

export default function AllProjects({
  selected,
}: {
  selected: {
    title: string;
    coverImageUrl: string;
    slug: {
      current: string;
    };
  }[];
}) {
  const [currentSrc, setCurrentSrc] = useState(selected[0].coverImageUrl);
  const w__all__projectsRef = useRef<HTMLDivElement | null>(null);
  const loaded = useLoaded();

  useGSAP(
    () => {
      if (!loaded) return;
      gsap.to(".all__project_t", {
        y: 0,
        duration: 1.5,
        ease: (t) => EASE["o3"](t),
        stagger: {
          from: "end",
          amount: 0.35,
        },
      });
    },
    {
      scope: w__all__projectsRef,
      dependencies: [loaded],
    },
  );

  return (
    <div ref={w__all__projectsRef} className="w__all__projects">
      <div className="all__projects">
        {selected.map((project, index) => (
          <Link
            href={`/film/${project.slug.current}`}
            className="all__project"
            key={index}
            onMouseEnter={() => {
              setCurrentSrc(project.coverImageUrl);
            }}
          >
            <div className="__oh">
              <p className="all__project_t">{project.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="w__all__projects__image">
        <Image
          className={`all__projects__image`}
          src={currentSrc}
          fill
          alt=""
          priority
        />
        <div className="w__all__projects__image__overlay" />
      </div>
    </div>
  );
}
