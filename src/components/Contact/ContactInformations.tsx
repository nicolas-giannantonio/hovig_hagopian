"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { EASE } from "@/utils/Ease";
import { useLoaded } from "@/lib/useLoader";
import Link from "next/link";

export default function ContactInformations({
  data,
}: {
  data: {
    description: string;
    contact_representation: {
      representation: {
        representation_name: string;
        representation_email: string;
        representation_tel: string;
      };
    }[];
    contact_hovig: {
      contact_hovig_email: string;
      contact_hovig_tel: string;
    };
    social_media: {
      social_media_name: string;
      social_media_link: string;
    }[];
  };
}) {
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
        duration: 1.5,
        ease: (t) => EASE["o6"](t),
        y: 0,
        delay: 0.2,
        stagger: 0.1,
      });

      gsap.to(".sc .contact_inline_content_t", {
        duration: 1.5,
        ease: (t) => EASE["o6"](t),
        y: 0,
        delay: 0.1,
        stagger: 0.05,
      });

      gsap.to(".contact_hovig_t", {
        duration: 1.5,
        ease: (t) => EASE["o6"](t),
        y: 0,
        delay: 0.19,
        stagger: 0.035,
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
        <p className={"contact_information_title_t"}>{data.description}</p>
      </div>
      <div className="w__contact_inline">
        {data.contact_representation.map((contact, index) => (
          <div className="contact_inline" key={index}>
            <div className="w__contact_inline_t sc">
              <p className={"contact_inline_t"}>
                {contact.representation.representation_name}
              </p>
            </div>
            <div className="w__contact_inline_content sc">
              <div className="__oh">
                <Link
                  href={"mailto:" + contact.representation.representation_email}
                  className="contact_inline_content_t"
                >
                  {contact.representation.representation_email}
                </Link>
              </div>
              <div className="__oh">
                <Link
                  href={"tel:" + contact.representation.representation_tel}
                  className="contact_inline_content_t"
                >
                  {contact.representation.representation_tel}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w__contact_hovig">
        <div className="__oh">
          <Link
            className="contact_hovig_t"
            href={"mailto:" + data.contact_hovig.contact_hovig_email}
          >
            {data.contact_hovig.contact_hovig_email}
          </Link>
        </div>
        <div className="__oh">
          <Link
            className="contact_hovig_t"
            href={"tel:" + data.contact_hovig.contact_hovig_tel}
          >
            {data.contact_hovig.contact_hovig_tel}
          </Link>
        </div>
        {data.social_media &&
          data.social_media.map((social, index) => (
            <div className="__oh" key={index}>
              <Link
                target={"_blank"}
                className="contact_hovig_t"
                href={social.social_media_link}
              >
                {social.social_media_name}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
