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
    slug: {
      current: string;
    };
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

export default function List({ data }: { data: ListProject[] }) {
  const listProjectsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const [videoSrc, setVideoSrc] = useState<string>(data[0].project.src);

  useGSAP(
    () => {
      gsap.to(".list_line", {
        duration: 1.5,
        // ease: (t) => BezierEasing(0.15, 0.46, 0.1, 1.0)(t),
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
    {
      scope: listProjectsRef,
    },
  );

  const mouse = (e: MouseEvent) => {
    target.current.x = e.clientX;
    target.current.y = e.clientY;
  };

  const mouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.style.opacity = "1";
      videoRef.current.style.scale = "1";
    }
  };

  const mouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.style.opacity = "0";
      videoRef.current.style.scale = "1.15";
    }
  };

  useTempus(() => {
    if (containerRef.current) {
      position.current.x = Lerp(position.current.x, target.current.x, 0.085);
      position.current.y = Lerp(position.current.y, target.current.y, 0.085);

      containerRef.current.style.left = `${position.current.x}px`;
      containerRef.current.style.top = `${position.current.y}px`;
    }
  }, {});

  useEffect(() => {
    if (DetectScreen.isMobile(window)) return;
    const listElement = listProjectsRef.current;

    if (listElement) {
      window.addEventListener("mousemove", mouse);
      listElement.addEventListener("mouseenter", mouseEnter);
      listElement.addEventListener("mouseleave", mouseLeave);
    }

    return () => {
      if (listElement) {
        window.removeEventListener("mousemove", mouse);
        listElement.removeEventListener("mouseenter", mouseEnter);
        listElement.removeEventListener("mouseleave", mouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (!DetectScreen.isMobile(window)) return;

    const scrollEvent = () => {
      const scroll = window.scrollY / window.innerHeight;
      const currentLine = Math.floor(scroll * data.length);
      const currentVideo = data[currentLine];
      setVideoSrc(currentVideo.project.src);
    };

    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  const handleMouseEnterProject = (src: string) => {
    if (!videoRef.current) return;
    videoRef.current.style.opacity = "0";
    setVideoSrc(src);
    videoRef.current.style.opacity = "1";
  };

  return (
    <>
      <div ref={containerRef} className="w__videoCursor">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          autoPlay
          playsInline
          className={"videoCursor"}
        ></video>
      </div>

      <div className={"w__list__projects"} ref={listProjectsRef}>
        {data.map((data, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnterProject(data.project.src)}
          >
            <div className="list_line" />
            <ListProject
              key={index}
              title={data.project.title}
              author={
                data.project.informations[0].information.information_value
              }
              href={data.project.slug.current || "/"}
            />
          </div>
        ))}
        <div className="list_line" />
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
  console.log(author);
  return (
    <TransitionLink href={`/film/${href || "/"}`} className="list_project">
      <div className="w__list_project_p">
        <p className={"list_project_p"}>
          <span className="list_title">{title}</span>
          <span className="list_separation">-</span>
          <span className="list_author">{author}</span>
        </p>
      </div>
    </TransitionLink>
  );
}
