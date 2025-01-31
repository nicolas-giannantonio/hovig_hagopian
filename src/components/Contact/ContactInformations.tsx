"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { EASE } from "@/utils/Ease";
import { useLoaded } from "@/lib/useLoader";

export default function ContactInformations() {
  const contactInformationRef = useRef<HTMLDivElement | null>(null);
  const loaded = useLoaded();

  useGSAP(
    () => {
      if (!loaded) return;
      gsap.to(".contact_information_title_t", {
        duration: 1.25,
        ease: (t) => EASE["o6"](t),
        y: 0,
        delay: 0.1,
      });

      gsap.to(".fc .contact_inline_t", {
        duration: 1.25,
        ease: (t) => EASE["o6"](t),
        y: 0,
        stagger: 0.1,
      });

      gsap.to(".sc .contact_inline_t", {
        duration: 1.25,
        ease: (t) => EASE["o6"](t),
        y: 0,
        stagger: 0.1,
      });

      gsap.to(".fc .contact_inline_content_t", {
        duration: 1.25,
        ease: (t) => EASE["o6"](t),
        y: 0,
        delay: 0.2,
        stagger: 0.1,
      });

      gsap.to(".sc .contact_inline_content_t", {
        duration: 1.25,
        ease: (t) => EASE["o6"](t),
        y: 0,
        delay: 0.2,
        stagger: 0.1,
      });

      gsap.to(".contact_hovig_t", {
        duration: 1.25,
        ease: (t) => EASE["o6"](t),
        y: 0,
        delay: 0.15,
        stagger: 0.1,
      });
    },
    {
      scope: contactInformationRef,
      dependencies: [loaded],
    },
  );

  return (
    <div ref={contactInformationRef} className="w__contact_information">
      <div className="w__contact_information_title">
        <p className={"contact_information_title_t"}>
          Représenté par Kinou Cinematographer Agency
        </p>
      </div>
      <div className="w__contact_inline">
        <div className="contact_inline">
          <div className="w__contact_inline_t fc">
            <p className={"contact_inline_t"}>MUSIC VIDEO</p>
          </div>
          <div className="w__contact_inline_content fc">
            <div className="__oh">
              <a href="#" className="contact_inline_content_t">
                john@kinou.fr
              </a>
            </div>
            <div className="__oh">
              <a href="#" className="contact_inline_content_t">
                +33(0)781473484
              </a>
            </div>
          </div>
        </div>
        <div className="contact_inline">
          <div className="w__contact_inline_t sc">
            <p className={"contact_inline_t"}>NARRATIVE</p>
          </div>
          <div className="w__contact_inline_content sc">
            <div className="__oh">
              <a href="#" className="contact_inline_content_t">
                john@kinou.fr
              </a>
            </div>
            <div className="__oh">
              <a href="#" className="contact_inline_content_t">
                +33(0)781473484
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w__contact_hovig">
        <div className="__oh">
          <a className="contact_hovig_t" href="#">
            hagopian.hovig@gmail.com
          </a>
        </div>
        <div className="__oh">
          <a className="contact_hovig_t" href="#">
            +33(0)781473484
          </a>
        </div>
      </div>
    </div>
  );
}
