import { useRef, useState } from "react";
import { profile } from "../../data/profile";
import { track } from "../../lib/analytics";
import { buildVCard, downloadTextFile } from "../../lib/contact-card";
import { pulseSave } from "../../lib/connect-motion";

export function SaveContactButton({ source }) {
  const [status, setStatus] = useState("idle");
  const buttonRef = useRef(null);

  const handleClick = () => {
    try {
      track("save_contact_click", { source });
      const origin = window.location.origin;
      const vcf = buildVCard(profile, origin);
      downloadTextFile(profile.vcfFilename, vcf);
      pulseSave(buttonRef.current);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="connect-btn connect-btn-primary"
        data-connect="save-contact"
        data-connect-magnetic="strong"
        onClick={handleClick}
      >
        <span className="connect-btn-pulse" data-connect="save-pulse" aria-hidden="true" />
        Save Contact
      </button>
      {status === "ready" && <p className="connect-status">Contact Card Ready</p>}
      {status === "error" && (
        <p className="connect-status is-error" role="alert">
          Couldn&apos;t prepare the contact card. Try again.
        </p>
      )}
    </>
  );
}
