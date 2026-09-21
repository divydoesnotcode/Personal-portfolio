import { useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../../data/profile";
import { track } from "../../lib/analytics";

export function SavePdfButton({ source }) {
  const [failed, setFailed] = useState(false);

  const handleClick = async () => {
    track("save_pdf_click", { source });
    try {
      const response = await fetch(profile.pdf.href);
      if (!response.ok) throw new Error("pdf");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = profile.pdf.filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <p className="connect-status is-error" role="alert">
        Couldn&apos;t prepare the PDF.{" "}
        <Link to="/" onClick={() => track("portfolio_click", { source, from: "pdf_error" })}>
          View Portfolio
        </Link>
      </p>
    );
  }

  return (
    <button
      type="button"
      className="connect-btn connect-btn-secondary"
      data-connect="save-pdf"
      data-connect-magnetic
      onClick={handleClick}
    >
      Save PDF
    </button>
  );
}
