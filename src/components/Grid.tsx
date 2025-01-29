"use client";
import CardProject from "@/components/Projects/CardProject";
import gsap from "gsap";
import BezierEasing from "bezier-easing";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Grid() {
  const gridProjectsRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".cardProject", {
        duration: 1.65,
        opacity: 1,
        ease: (t) => BezierEasing(0.28, 0.8, 0.2, 1.0)(t),
        // ease: (t) => BezierEasing(0.48, 0.5, 0.1, 1.0)(t),
        stagger: {
          amount: 0.4,
          from: "start",
        },
        y: 0,
      });
    },
    {
      scope: gridProjectsRef,
    },
  );

  return (
    <div className={"w__grid__projects"} ref={gridProjectsRef}>
      <CardProject image={"/assets/test.png"} link={"/test"} />
      <CardProject
        image={
          "https://freight.cargo.site/w/1500/q/75/i/1eb50ffe3739927618f201ddae11dc6ec2b6f46900500361e815826301f7f982/STILLS_MRK_1.1.21.jpg"
        }
        link={"/test"}
      />
      <CardProject
        image={
          "https://freight.cargo.site/w/1500/q/75/i/a1eee6c035a398b8b59ba1a19cecb43b95d7a8ec4c00bfc4ba6d1427a515a04a/VINTED_1.2.1.JPG"
        }
        link={"/test"}
      />
      <CardProject
        image={
          "https://freight.cargo.site/w/1500/q/75/i/ededb24c305c1c5a1f42e929a1c96c9e4cab3279ee0f3dafb967790d7b4795da/SCH_STILLS_DEF_1.10.1.jpg"
        }
        link={"/test"}
      />
      <CardProject
        image={
          "https://freight.cargo.site/w/1500/q/75/i/67c0c83882e9019c85472ed1b825d27f5f7e2dbfee17db9a1731fb88c25a267a/MENTISSA_1.4.43.JPG"
        }
        link={"/test"}
      />
      <CardProject
        image={
          "https://freight.cargo.site/w/1500/q/75/i/043c3d0e859d891c1d503ce9ce55a6fa403a3b9e105668e9616ab214b4113ae9/ISABEL-MARANT-_1.1.1.jpg"
        }
        link={"/test"}
      />
      <CardProject
        image={
          "https://freight.cargo.site/w/1920/q/75/i/5cdbf360e7be0dde7f2905ac5fca98e5305a06f0fe85c3b5fe8ce58f8310787c/Untitled_1.1.1retouche3.jpg"
        }
        link={"/test"}
      />
      <CardProject
        image={
          "https://freight.cargo.site/w/1500/q/75/i/498d0ac7e927ba92fa8cc3ab5872bda7126662eb9897cb1a4917f7f2ac8118ab/Untitled_1.2.7.jpg"
        }
        link={"/test"}
      />
      <CardProject
        image={
          "https://freight.cargo.site/w/1500/q/75/i/3fcd73b58b3ed1adff090f30b05525a6cf59ca640076db7008a333d736e8507c/IMG_5081.jpg"
        }
        link={"/test"}
      />
      <CardProject image={"/assets/test.png"} link={"/test"} />
      <CardProject image={"/assets/test.png"} link={"/test"} />
      <CardProject image={"/assets/test.png"} link={"/test"} />
    </div>
  );
}
