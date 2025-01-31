"use client";
import gsap from "gsap";
import { EASE } from "@/utils/Ease";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useIntersectionObserver } from "hamo";
import { useLoaded } from "@/lib/useLoader";

export default function ResumeSection({
  title,
  content,
}: {
  title: string;
  content: {
    title: string;
    subtitle: string;
  }[];
}) {
  const resumeSectionRef = useRef<HTMLDivElement | null>(null);
  const [setElement, entry] = useIntersectionObserver({
    once: true,
    rootMargin: "-150px",
  });

  const loaded = useLoaded();

  useGSAP(
    () => {
      if (!loaded) return;
      if (entry?.isIntersecting) {
        gsap.to(".resumeSection_t", {
          duration: 1.55,
          ease: (t) => EASE["o6"](t),
          y: 0,
          stagger: 0.095,
          delay: 0.1,
        });
        gsap.to(".resumeSectionContent_t", {
          duration: 1.55,
          ease: (t) => EASE["o6"](t),
          y: 0,
          stagger: 0.09,
          delay: 0.1,
        });
        gsap.to(".resumeSectionContent_info", {
          duration: 1.55,
          ease: (t) => EASE["o6"](t),
          y: 0,
          stagger: 0.095,
          delay: 0.1,
        });
      }
    },
    {
      scope: resumeSectionRef,
      dependencies: [entry, loaded],
    },
  );

  return (
    <div
      ref={(el) => {
        setElement(el);
        resumeSectionRef.current = el;
      }}
      className="resumeSection"
    >
      <div className="w__title">
        <p className={"resumeSection_t"}>{title}</p>
      </div>

      <div className="w__resumeSectionContent">
        {content.map((item, index) => (
          <div key={index} className="resumeSectionContent">
            <div className="w__resumeSectionContent_t">
              <p className="resumeSectionContent_t">{item.title}</p>
            </div>
            <div className="w__resumeSectionContent_info">
              <p className="resumeSectionContent_info">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
