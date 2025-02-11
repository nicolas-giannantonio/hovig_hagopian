"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { EASE } from "@/utils/Ease";
import TransitionLink from "@/components/TransitionLink";
import Link from "next/link";
import useMobileDetect from "@/lib/DetectScreen";

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
    setMenuOpen(true);
    gsap.set(".mobNv__list", {
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
      duration: 1,
      transform: "translateY(-100%)",
      ease: (t) => EASE["o5"](t),
      onComplete: () => {
        gsap.set("#o", {
          transform: "translateY(100%)",
        });
      },
    });

    gsap.to("#c", {
      duration: 1,
      delay: 0.15,
      y: 0,
      ease: (t) => EASE["o4"](t),
    });
  };
  const closeMenu = () => {
    setMenuOpen(false);
    gsap.set(".mobNv__list", {
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
      duration: 1,
      transform: "translateY(-100%)",
      ease: (t) => EASE["o4"](t),
      onComplete: () => {
        gsap.set("#c", {
          transform: "translateY(100%)",
        });
      },
    });
    gsap.to("#o", {
      duration: 1,
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
            <Link
              onClick={menuOpen ? closeMenu : () => 0}
              className="nv__name"
              href={"/"}
            >
              Hovig Hagopian{" "}
              <span className={"nv__name__sub"}>Cinematographer</span>
            </Link>
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
                <Link
                  onClick={closeMenu}
                  href={"/fiction"}
                  className="nv_list_text"
                >
                  {navTitles[0].title || "Fiction"}
                </Link>
              </div>
              <div className="__oh">
                <Link
                  onClick={closeMenu}
                  href={"/music-video"}
                  className="nv_list_text"
                >
                  {navTitles[1].title || "Music Video"}
                </Link>
              </div>

              <div className="__oh">
                <Link
                  onClick={closeMenu}
                  href={"/pub"}
                  className="nv_list_text"
                >
                  {navTitles[2].title || "Pub"}
                </Link>
              </div>
            </div>
            <div className="mobNv__list__group">
              <div className="__oh">
                <Link
                  onClick={closeMenu}
                  href={"/resume"}
                  className="nv_list_text"
                >
                  Resume
                </Link>
              </div>
              <div className="__oh">
                <Link
                  onClick={closeMenu}
                  href={"/contact"}
                  className="nv_list_text"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className="mobNv__contact">
            <div className="__oh">
              <a className="nv_contact_text" href="#">
                hagopian.hovig@gmail.com
              </a>
            </div>
            <div className="__oh">
              <a className="nv_contact_text" href="#">
                +33(0)781473484
              </a>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
