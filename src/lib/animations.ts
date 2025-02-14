import gsap from "gsap";
import { EASE } from "@/utils/Ease";

export async function animationTransitionIn() {
  return new Promise((resolve) => {
    gsap.to("#App", {
      opacity: 0,
      duration: 0.25,
      ease: (t) => EASE["o1"](t),
      onComplete: resolve,
    });
  });
}
