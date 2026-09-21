import { ArrowRight } from "lucide-react";
import { profile } from "../../data/profile";
import { track } from "../../lib/analytics";

export function WorkWithMeCTA({ source }) {
  return (
    <section className="connect-section" data-connect="section">
      <span className="connect-section-rule" aria-hidden="true" />
      <p className="connect-cta-copy">Have something to build?</p>
      <a
        href={`mailto:${profile.contact.email}`}
        className="connect-text-link"
        data-connect="cta"
        data-connect-magnetic
        onClick={() => track("work_with_me_click", { source })}
      >
        Let&apos;s Work Together
        <ArrowRight size={16} aria-hidden="true" data-connect="cta-arrow" />
      </a>
    </section>
  );
}
