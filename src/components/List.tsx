import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EASE } from "@/utils/Ease";
import { Lerp } from "@/utils/Math";
import { useTempus } from "tempus/react";
import DetectScreen from "@/lib/DetectScreen";
import TransitionLink from "@/components/TransitionLink";

type ListProject = {
  project: {
    src: string;
    slug: { current: string };
    title: string;
    informations: [{ information: { information_value: string } }];
  };
};

export default function List({ data }: { data: ListProject[] }) {
  const listProjectsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSrc, setCurrentSrc] = useState(data[0].project.src);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useGSAP(
    () => {
      gsap.to(".list_line", {
        duration: 1.5,
        ease: (t) => EASE["o3"](t),
        opacity: 0.15,
        stagger: 0.05,
      });
      gsap.to(".list_project_p", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: (t) => EASE["o3"](t),
        stagger: 0.035,
      });
    },
    { scope: listProjectsRef },
  );

  useTempus(() => {
    if (containerRef.current) {
      position.current.x = Lerp(position.current.x, target.current.x, 0.085);
      position.current.y = Lerp(position.current.y, target.current.y, 0.085);
      containerRef.current.style.left = `${position.current.x}px`;
      containerRef.current.style.top = `${position.current.y}px`;
    }
  }, {});

  useEffect(() => {
    if (!DetectScreen.isMobile(window)) {
      const mouse = (e: MouseEvent) => {
        target.current.x = e.clientX;
        target.current.y = e.clientY;
      };
      window.addEventListener("mousemove", mouse, { passive: true });
      return () => window.removeEventListener("mousemove", mouse);
    }
  }, []);

  useEffect(() => {
    if (DetectScreen.isMobile(window)) {
      const scrollEvent = () => {
        const scroll = window.scrollY / window.innerHeight;
        const currentIndex = Math.floor(scroll * data.length);
        const src = data[currentIndex]?.project.src || data[0].project.src;
        if (src !== currentSrc) {
          gsap.to(videoRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => setCurrentSrc(src),
          });
        }
      };
      window.addEventListener("scroll", scrollEvent, { passive: true });
      return () => window.removeEventListener("scroll", scrollEvent);
    }
  }, [data, currentSrc]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentSrc]);

  const handleMouseEnterProject = (src: string) => {
    if (src === currentSrc) return;
    setCurrentSrc(src);
  };

  return (
    <>
      <div ref={containerRef} className="w__videoCursor">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          className="videoCursor"
          style={{ position: "absolute", top: 0, left: 0, opacity: 1 }}
        >
          <source src={currentSrc} type="video/mp4" />
        </video>
      </div>
      <div className="w__list__projects" ref={listProjectsRef}>
        {data.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnterProject(item.project.src)}
          >
            <ListProject
              title={item.project.title}
              author={
                item.project.informations[0].information.information_value
              }
              href={item.project.slug.current || "/"}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function ListProject({
  title,
  author,
  href,
}: {
  title: string;
  author: string;
  href: string;
}) {
  return (
    <TransitionLink href={`/film/${href || "/"}`} className="list_project">
      <div className="w__list_project_p">
        <p className="list_project_p">
          <span className="list_title">{title}</span>
          <span className="list_separation">-</span>
          <span className="list_author">{author}</span>
        </p>
      </div>
    </TransitionLink>
  );
}
