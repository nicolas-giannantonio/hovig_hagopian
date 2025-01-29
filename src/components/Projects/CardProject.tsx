import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";

export default function CardProject({
  link,
  image,
}: {
  link: string;
  image: string;
}) {
  return (
    <div className="w__cardProject">
      <TransitionLink className="cardProject" href={link}>
        <Image
          width={300}
          height={300}
          className={"cardProject_i"}
          src={image}
          alt={""}
        />
      </TransitionLink>
    </div>
  );
}
