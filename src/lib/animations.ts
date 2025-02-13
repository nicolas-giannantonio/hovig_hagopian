import gsap from "gsap";
import { EASE } from "@/utils/Ease";

export async function animationTransitionIn() {
  return new Promise((resolve) => {
    gsap.to("#App", {
      opacity: 0,
      duration: 0.35,
      ease: (t) => EASE["o2"](t),
      onComplete: resolve,
    });
  });
}
