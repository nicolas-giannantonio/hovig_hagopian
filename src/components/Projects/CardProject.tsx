import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import FocusCardProject from "@/components/Projects/FocusCardProject";
import { useRef, useState } from "react";
import { imageLoader } from "@/components/Utils/ImageTransform";

export default function CardProject({
  link,
  image,
  hoverVideo,
}: {
  link: string;
  image: string;
  hoverVideo: string;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <TransitionLink
      href={link}
      className="w__cardProject"
      onMouseEnter={() => {
        if (videoRef.current && imageRef.current) {
          videoRef.current.style.opacity = "1";
          imageRef.current.style.opacity = "0";
          videoRef.current.currentTime = 0;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        }
        setHovered(true);
      }}
      onMouseLeave={() => {
        if (videoRef.current && imageRef.current) {
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
          playsInline
          className="cardProject_video"
          ref={videoRef}
        >
          <source src={hoverVideo} type="video/mp4" />
        </video>
      </div>
      <div className="cardProject">
        <Image
          fill
          loader={imageLoader}
          sizes="(max-width: 768px) 40vw, 27vw"
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
