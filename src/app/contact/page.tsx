import { Fragment } from "react";
import ContactInformations from "@/components/Contact/ContactInformations";

export default function Page() {
  return (
    <Fragment>
      <div id="contact">
        <ContactInformations />
      </div>
      <div className="w__contact_mention">
        <a
          href={"https://nicolas-giannantonio.fr"}
          target={"_blank"}
          className={"contact_mention_t"}
        >
          Development and Design by Nicolas Giannantonio
        </a>
      </div>
      <div className="w_h"></div>
    </Fragment>
  );
}
