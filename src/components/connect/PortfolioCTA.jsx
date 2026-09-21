import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { track } from "../../lib/analytics";

export function PortfolioCTA({ source }) {
  return (
    <section className="connect-section">
      <Link
        to="/"
        className="connect-text-link"
        onClick={() => track("portfolio_click", { source })}
      >
        View Full Portfolio
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </section>
  );
}
