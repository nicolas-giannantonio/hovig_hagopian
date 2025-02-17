import { useRef, useState } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import FocusCardProject from "@/components/Projects/FocusCardProject";
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
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current
            .play()
            .then(() => {
              if (imageRef.current) imageRef.current.style.opacity = "0";
              if (videoRef.current) videoRef.current.style.opacity = "1";
            })
            .catch(() => {
              if (imageRef.current) imageRef.current.style.opacity = "1";
            });
        }
        setHovered(true);
      }}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.style.opacity = "0";
          if (imageRef.current) imageRef.current.style.opacity = "1";
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
          preload={"none"}
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
