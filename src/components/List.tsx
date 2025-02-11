import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EASE } from "@/utils/Ease";
import { Lerp } from "@/utils/Math";
import { useTempus } from "tempus/react";
import TransitionLink from "@/components/TransitionLink";
import { isMobile } from "react-device-detect";

type ListProject = {
  project: {
    src: string;
    slug: { current: string };
    title: string;
    informations: [{ information: { information_value: string } }];
    hover_video: string;
    coverImageUrl: string;
  };
};

export default function List({ data }: { data: ListProject[] }) {
  const listProjectsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useGSAP(
    () => {
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
    if (!isMobile) {
      const mouse = (e: MouseEvent) => {
        target.current.x = e.clientX;
        target.current.y = e.clientY;
      };
      window.addEventListener("mousemove", mouse, { passive: true });
      return () => window.removeEventListener("mousemove", mouse);
    }
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isMobile) {
      const scrollEvent = () => {
        const scroll = (window.scrollY / window.innerHeight) * 2;
        const currentIndex = Math.floor(scroll * data.length);
        videoRefs.current.forEach((video, index) => {
          if (video) {
            if (index === currentIndex) {
              setCurrentIndex(index);
              video.currentTime = 0;
              video.style.opacity = "1";
              video.play();
            } else {
              video.style.opacity = "0";
              video.pause();
            }
          }
        });
      };
      window.addEventListener("scroll", scrollEvent, { passive: true });
      return () => window.removeEventListener("scroll", scrollEvent);
    }
  }, [data]);

  const handleMouseEnterProject = (index: number) => {
    if (isMobile) return;
    const video = videoRefs.current[index];
    if (!video) return;
    video.currentTime = 0;
    video.style.opacity = "1";
    video.play().catch((error) => {
      if (error.name === "AbortError") return;
      console.error("Error during video play:", error);
    });
  };

  const handleMouseLeaveProject = (index: number) => {
    if (isMobile) return;
    const video = videoRefs.current[index];
    if (!video) return;
    video.style.opacity = "0";
    video.pause();
  };

  return (
    <>
      <div ref={containerRef} className="w__videoCursor">
        {data.map((dataVideo, index) => (
          <video
            key={index}
            ref={(el) => {
              if (el) videoRefs.current[index] = el;
            }}
            preload="auto"
            muted
            loop
            playsInline
            poster={dataVideo.project.coverImageUrl}
            className="videoCursor"
          >
            <source src={dataVideo.project.hover_video} type="video/mp4" />
          </video>
        ))}
      </div>
      <div className="w__list__projects" ref={listProjectsRef}>
        {data.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnterProject(index)}
            onMouseLeave={() => handleMouseLeaveProject(index)}
          >
            <ListProject
              title={item.project.title}
              author={
                item.project.informations[0].information.information_value
              }
              href={item.project.slug.current || "/"}
              opacity={
                isMobile ? (isMobile && index === currentIndex ? 1 : 0.5) : 1
              }
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
  opacity,
}: {
  title: string;
  author: string;
  href: string;
  opacity?: number;
}) {
  return (
    <TransitionLink
      href={`/film/${href || "/"}`}
      className="list_project"
      style={{
        opacity: opacity || 0,
      }}
    >
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
