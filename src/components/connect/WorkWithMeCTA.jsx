import { ArrowRight } from "lucide-react";
import { profile } from "../../data/profile";
import { track } from "../../lib/analytics";

export function WorkWithMeCTA({ source }) {
  return (
    <section className="connect-section">
      <p className="connect-cta-copy">Have something to build?</p>
      <a
        href={`mailto:${profile.contact.email}`}
        className="connect-text-link"
        onClick={() => track("work_with_me_click", { source })}
      >
        Let&apos;s Work Together
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
