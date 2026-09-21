import { useState } from "react";
import { profile } from "../../data/profile";
import { track } from "../../lib/analytics";
import { buildVCard, downloadTextFile } from "../../lib/contact-card";

export function SaveContactButton({ source }) {
  const [status, setStatus] = useState("idle");

  const handleClick = () => {
    try {
      track("save_contact_click", { source });
      const origin = window.location.origin;
      const vcf = buildVCard(profile, origin);
      downloadTextFile(profile.vcfFilename, vcf);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <button type="button" className="connect-btn connect-btn-primary" onClick={handleClick}>
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
