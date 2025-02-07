import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import FocusCardProject from "@/components/Projects/FocusCardProject";

export default function CardProject({
  link,
  image,
}: {
  link: string;
  image: string;
}) {
  return (
    <TransitionLink href={link} className="w__cardProject">
      <FocusCardProject />
      <div className="cardProject">
        <Image
          width={2000}
          height={2000}
          className={"cardProject_i"}
          src={image}
          alt={""}
        />
      </div>
    </TransitionLink>
  );
}
