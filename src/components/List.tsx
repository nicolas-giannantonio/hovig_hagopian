import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EASE } from "@/utils/Ease";
import { Lerp } from "@/utils/Math";
import { useTempus } from "tempus/react";
import TransitionLink from "@/components/TransitionLink";
import useMobileDetect from "@/lib/DetectScreen";
import Image from "next/image";
import { imageLoader } from "@/components/Utils/ImageTransform";

const Round = (value: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

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
  const coverRefs = useRef<HTMLImageElement[]>([]);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rotate = useRef(0);

  const { isMobile } = useMobileDetect();
  const [mobile, setMobile] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoCanPlay, setCanPlay] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, [isMobile]);

  useGSAP(() => {
    gsap.to(".list_project_p", {
      y: 0,
      duration: 1.5,
      ease: (t) => EASE["o2"](t),
      stagger: 0.0275,
    });
  }, {});

  useTempus(() => {
    if (containerRef.current) {
      const oldY = position.current.y;
      position.current.x = Lerp(position.current.x, target.current.x, 0.075);
      position.current.y = Lerp(position.current.y, target.current.y, 0.075);
      containerRef.current.style.left = `${position.current.x * 1.1}px`;
      containerRef.current.style.top = `${position.current.y}px`;
      const targetRotate = position.current.y - oldY;
      rotate.current = Round(Lerp(rotate.current, targetRotate, 0.075), 3);

      containerRef.current.style.rotate = `${-rotate.current}deg`;
    }
  }, {});

  useEffect(() => {
    if (!mobile) {
      const mouse = (e: MouseEvent) => {
        target.current.x = e.clientX;
        target.current.y = e.clientY;
      };
      window.addEventListener("mousemove", mouse, { passive: true });
      return () => window.removeEventListener("mousemove", mouse);
    }
  }, [mobile]);

  useEffect(() => {
    if (mobile) {
      let currentIndexActive = 0;
      let accumulatedDelta = 0;
      let startY = 0;

      const initialVideo = videoRefs.current[0];

      if (initialVideo) {
        initialVideo.play();
        initialVideo.style.visibility = "visible";
      }

      // if (!videoCanPlay) {
      //   coverRefs.current[0].style.opacity = "1";
      //   coverRefs.current[0].style.scale = "1";
      // }

      const handleTouchStart = (event: TouchEvent) => {
        startY = event.touches[0].clientY;
      };

      const handleTouchMove = (event: TouchEvent) => {
        const currentY = event.touches[0].clientY;
        const delta = startY - currentY;
        accumulatedDelta += delta;
        startY = currentY;

        const total = data.length;
        const newIndexRaw = Math.floor(
          (accumulatedDelta / window.innerHeight) * total,
        );
        const newIndex = ((newIndexRaw % total) + total) % total;

        if (currentIndexActive !== newIndex) {
          const previousVideo = videoRefs.current[currentIndexActive];
          if (previousVideo && videoCanPlay) {
            previousVideo.style.visibility = "hidden";
            previousVideo.pause();
          }

          // if (!videoCanPlay) {
          //   coverRefs.current[currentIndexActive].style.opacity = "0";
          //   coverRefs.current[currentIndexActive].style.scale = "1.15";
          // }

          currentIndexActive = newIndex;
          setCurrentIndex(currentIndexActive);

          const newVideo = videoRefs.current[newIndex];
          if (newVideo) {
            newVideo.style.visibility = "visible";
            newVideo.play();
          }

          // const currentCover = coverRefs.current[newIndex];
          // const beforeCover = coverRefs.current[currentIndexActive];
          // if (!videoCanPlay) {
          //   currentCover.style.opacity = "1";
          //   beforeCover.style.scale = "1";
          // } else {
          //   beforeCover.style.opacity = "0";
          //   currentCover.style.opacity = "0";
          //
          // }
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
  }, [data, mobile, videoCanPlay]);

  const handleMouseEnterProject = (index: number) => {
    if (!mobile && videoCanPlay) {
      const video = videoRefs.current[index];
      if (video) {
        const cover = coverRefs.current[index];
        cover.style.opacity = "0";
        video.style.opacity = "1";
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    } else if (!mobile) {
      const cover = coverRefs.current[index];
      cover.style.opacity = "1";
    }
  };

  const handleMouseLeaveProject = (index: number) => {
    if (!mobile && videoCanPlay) {
      const video = videoRefs.current[index];
      if (!video) return;
      video.style.opacity = "0";
      video.pause();
    } else if (!mobile) {
      const cover = coverRefs.current[index];
      cover.style.opacity = "0";
    }
  };

  return (
    <>
      <div ref={containerRef} className="w__videoCursor">
        {data.map((dataVideo, index) => (
          <div key={index}>
            <Image
              loader={imageLoader}
              fill
              sizes="(max-width: 768px) 100vw, 20vw"
              className={"videoCursor__poster"}
              src={dataVideo.project.coverImageUrl}
              alt={""}
              ref={(el) => {
                if (el) coverRefs.current[index] = el;
              }}
            />
            <video
              key={index}
              ref={(el) => {
                if (el) videoRefs.current[index] = el;
              }}
              muted
              playsInline
              loop
              className="videoCursor"
              onCanPlayThrough={() => {
                if (index === videoRefs.current.length - 1) {
                  setCanPlay(true);
                }
              }}
            >
              <source src={dataVideo.project.hover_video} type="video/mp4" />
            </video>
          </div>
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
                mobile ? (mobile && index === currentIndex ? 1 : 0.5) : 1
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
