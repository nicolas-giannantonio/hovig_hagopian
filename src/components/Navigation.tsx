"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { EASE } from "@/utils/Ease";
import TransitionLink from "@/components/TransitionLink";
import useMobileDetect from "@/lib/DetectScreen";
import Link from "next/link";

export default function Navigation({
  navTitles,
}: {
  navTitles: { title: string }[];
}) {
  const path = usePathname();

  const isPathActive = (p: string) => {
    if (p === path) return true;
  };

  const { isMobile } = useMobileDetect();

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, [isMobile]);

  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    gsap.killTweensOf([
      ".nv_list_text",
      ".nv_contact_text",
      ".nv__overlay",
      "#o",
      "#c",
    ]);
    setMenuOpen(true);
    gsap.set(".mb_link", {
      pointerEvents: "all",
    });
    gsap.to(".nv__overlay", {
      duration: 0.35,
      opacity: 1,
      ease: "power3.out",
    });

    gsap.to(".nv_list_text", {
      duration: 1.5,
      y: 0,
      delay: 0.1,
      opacity: 1,
      ease: (t) => EASE["o6"](t),
      stagger: 0.05,
    });

    gsap.to(".nv_contact_text", {
      duration: 1.5,
      y: 0,
      opacity: 1,
      ease: (t) => EASE["o6"](t),
      stagger: 0.05,
      delay: 0.25,
    });

    gsap.to("#o", {
      duration: 0.75,
      transform: "translateY(-100%)",
      ease: (t) => EASE["o5"](t),
      onComplete: () => {
        gsap.set("#o", {
          transform: "translateY(100%)",
        });
      },
    });

    gsap.to("#c", {
      duration: 0.75,
      delay: 0.15,
      y: 0,
      ease: (t) => EASE["o4"](t),
    });
  };
  const closeMenu = () => {
    gsap.killTweensOf([
      ".nv_list_text",
      ".nv_contact_text",
      ".nv__overlay",
      "#o",
      "#c",
    ]);
    setMenuOpen(false);
    gsap.set(".mb_link", {
      pointerEvents: "none",
    });

    gsap.to(".nv_list_text", {
      duration: 0.75,
      transform: "translateY(-100%)",
      pointerEvents: "all",
      ease: (t) => EASE["o6"](t),
    });

    gsap.to(".nv_contact_text", {
      duration: 0.75,
      transform: "translateY(-100%)",
      opacity: 1,
      ease: (t) => EASE["o6"](t),
    });

    gsap.to(".nv__overlay", {
      duration: 1,
      opacity: 0,
      delay: 0.2,
      ease: (t) => EASE["o4"](t),
    });

    gsap.to("#c", {
      duration: 0.75,
      transform: "translateY(-100%)",
      ease: (t) => EASE["o4"](t),
      onComplete: () => {
        gsap.set("#c", {
          transform: "translateY(100%)",
        });
      },
    });
    gsap.to("#o", {
      duration: 0.75,
      delay: 0.2,
      y: 0,
      ease: (t) => EASE["o4"](t),
    });
  };

  return (
    <div>
      {!mobile ? (
        <nav id={"nv"}>
          <TransitionLink className="nv__name" href={"/"}>
            Hovig Hagopian{" "}
            <span className={"nv__name__sub"}>Cinematographer</span>
          </TransitionLink>

          <div className="nv__pages_links nv__mid">
            <TransitionLink
              className={`nv_link ${isPathActive("/music-video") ? "nv_link_active" : ""}`}
              href={"/music-video"}
            >
              {navTitles[1].title || "Music Video"}
            </TransitionLink>
            <TransitionLink
              className={`nv_link ${isPathActive("/fiction") ? "nv_link_active" : ""}`}
              href={"/fiction"}
            >
              {navTitles[0].title || "Fiction"}
            </TransitionLink>
            <TransitionLink
              className={`nv_link ${isPathActive("/pub") ? "nv_link_active" : ""}`}
              href={"/pub"}
            >
              {navTitles[2].title || "Pub"}
            </TransitionLink>
          </div>

          <div className="nv__pages_links">
            <TransitionLink
              className={`nv_link ${isPathActive("/resume") ? "nv_link_active" : ""}`}
              href={"/resume"}
            >
              Resume
            </TransitionLink>
            <TransitionLink
              className={`nv_link ${isPathActive("/contact") ? "nv_link_active" : ""}`}
              href={"/contact"}
            >
              Contact
            </TransitionLink>
          </div>
        </nav>
      ) : (
        <nav id={"mobNv"}>
          <div className="nv__overlay"></div>

          <div className="mobNv__header">
            <TransitionLink
              onClick={menuOpen ? closeMenu : () => 0}
              className="nv__name mb_link"
              href={"/"}
            >
              Hovig Hagopian{" "}
              <span className={"nv__name__sub"}>Cinematographer</span>
            </TransitionLink>
            <div className="nv__toggle">
              <p onClick={openMenu} id={"o"} className="nv__toggle_text">
                Menu
              </p>
              <p onClick={closeMenu} id={"c"} className="nv__toggle_text">
                Close
              </p>
            </div>
          </div>

          <div className="mobNv__list">
            <div className="mobNv__list__group">
              <div className="__oh">
                <TransitionLink
                  onClick={closeMenu}
                  href={"/fiction"}
                  className="nv_list_text mb_link"
                >
                  {navTitles[0].title || "Fiction"}
                </TransitionLink>
              </div>
              <div className="__oh">
                <TransitionLink
                  onClick={closeMenu}
                  href={"/music-video"}
                  className="nv_list_text mb_link"
                >
                  {navTitles[1].title || "Music Video"}
                </TransitionLink>
              </div>

              <div className="__oh">
                <TransitionLink
                  onClick={closeMenu}
                  href={"/pub"}
                  className="nv_list_text mb_link"
                >
                  {navTitles[2].title || "Pub"}
                </TransitionLink>
              </div>
            </div>
            <div className="mobNv__list__group">
              <div className="__oh">
                <TransitionLink
                  onClick={closeMenu}
                  href={"/resume"}
                  className="nv_list_text mb_link"
                >
                  Resume
                </TransitionLink>
              </div>
              <div className="__oh">
                <TransitionLink
                  onClick={closeMenu}
                  href={"/contact"}
                  className="nv_list_text mb_link"
                >
                  Contact
                </TransitionLink>
              </div>
            </div>
          </div>

          <div className="mobNv__contact">
            <div className="__oh">
              <Link className="nv_contact_text mb_link" href="#">
                hagopian.hovig@gmail.com
              </Link>
            </div>
            <div className="__oh">
              <Link className="nv_contact_text mb_link" href="#">
                +33(0)781473484
              </Link>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
