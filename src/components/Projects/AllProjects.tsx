"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { EASE } from "@/utils/Ease";
import gsap from "gsap";
import { useLoaded } from "@/lib/useLoader";
import Link from "next/link";

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
  const w__all__projectsRef = useRef<HTMLDivElement | null>(null);
  const loaded = useLoaded();
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Vérification si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Ajustez ce seuil selon vos besoins
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

      // Initialisation des images
      gsap.set(".all__projects__image", { opacity: 0 });
      gsap.set(".all__projects__image:first-child", { opacity: 1 });
    },
    {
      scope: w__all__projectsRef,
      dependencies: [loaded],
    },
  );

  // Gestion des événements tactiles pour mobile
  useEffect(() => {
    if (isMobile) {
      let currentIndexActive = 0;
      let accumulatedDelta = 0;
      let startY = 0;

      const handleTouchStart = (event: TouchEvent) => {
        startY = event.touches[0].clientY;
      };

      const handleTouchMove = (event: TouchEvent) => {
        const currentY = event.touches[0].clientY;
        const delta = startY - currentY;
        accumulatedDelta += delta;
        startY = currentY;

        const total = selected.length;
        const newIndexRaw = Math.floor(
          (accumulatedDelta / window.innerHeight) * total,
        );
        const newIndex = ((newIndexRaw % total) + total) % total;

        if (currentIndexActive !== newIndex) {
          currentIndexActive = newIndex;
          setCurrent(currentIndexActive);
        }
      };

      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });

      return () => {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [isMobile, selected]);

  const handleHover = (index: number) => {
    if (!isMobile) {
      setCurrent(index);
    }
  };

  return (
    <div ref={w__all__projectsRef} className="w__all__projects">
      <div className="all__projects">
        {selected.map((project, index) => (
          <div key={index}>
            <Link
              href={`/films/${project.slug.current || "/"}`}
              className="all__project"
              onMouseEnter={() => handleHover(index)}
            >
              <div className="__oh">
                <p
                  style={{
                    opacity: current === index ? 0.25 : 1,
                  }}
                  className="all__project_t"
                >
                  {project.title}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="w__all__projects__image">
        {selected.map((project, index) => (
          <Image
            key={index}
            className="all__projects__image"
            src={project.coverImageUrl}
            fill
            alt=""
            style={{
              opacity: current === index ? 1 : 0,
            }}
          />
        ))}
        <div className="w__all__projects__image__overlay" />
      </div>
    </div>
  );
}
