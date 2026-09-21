import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { track } from "../../lib/analytics";

export function PortfolioCTA({ source }) {
  return (
    <section className="connect-section" data-connect="section">
      <span className="connect-section-rule" aria-hidden="true" />
      <Link
        to="/"
        className="connect-text-link"
        data-connect="cta"
        data-connect-magnetic
        onClick={() => track("portfolio_click", { source })}
      >
        View Full Portfolio
        <ArrowRight size={16} aria-hidden="true" data-connect="cta-arrow" />
      </Link>
    </section>
  );
}
