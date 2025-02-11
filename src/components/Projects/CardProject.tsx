import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import FocusCardProject from "@/components/Projects/FocusCardProject";
import { useRef, useState } from "react";

export default function CardProject({
  link,
  image,
  hoverVideo,
  isAnimationEnd,
}: {
  link: string;
  image: string;
  hoverVideo: string;
  isAnimationEnd: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <TransitionLink
      href={link}
      className="w__cardProject"
      onMouseEnter={() => {
        if (!isAnimationEnd) return;
        setLoadVideo(true);
        if (videoRef.current && imageRef.current) {
          videoRef.current.style.visibility = "visible";
          videoRef.current.style.opacity = "1";
          imageRef.current.style.opacity = "0";

          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
        setHovered(true);
      }}
      onMouseLeave={() => {
        if (!isAnimationEnd) return;
        if (videoRef.current && imageRef.current) {
          videoRef.current.style.visibility = "hidden";

          videoRef.current.style.opacity = "0";
          imageRef.current.style.opacity = "1";

          videoRef.current.pause();
        }
        setHovered(false);
      }}
    >
      <div className="w__cardProject__video">
        <video
          loop
          muted
          autoPlay
          playsInline
          className="cardProject_video"
          poster={image}
          src={loadVideo ? hoverVideo : undefined}
          ref={videoRef}
        />
      </div>
      <div className="cardProject">
        <Image
          width={1000}
          height={1000}
          className="cardProject_i"
          src={image}
          alt=""
          ref={imageRef}
        />
      </div>
      <FocusCardProject hovered={hovered} />
    </TransitionLink>
  );
}
