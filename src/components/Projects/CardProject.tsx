import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import FocusCardProject from "@/components/Projects/FocusCardProject";
import { useState } from "react";

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
  return (
    <TransitionLink
      href={link}
      className="w__cardProject"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="cardProject">
        <Image
          width={1000}
          height={1000}
          className="cardProject_i"
          src={image}
          alt=""
        />
      </div>
      <FocusCardProject hovered={hovered} />
    </TransitionLink>
  );
}
