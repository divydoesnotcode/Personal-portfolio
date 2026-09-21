import { profile } from "../../data/profile";

export function Services() {
  return (
    <section className="connect-section" data-connect="section" aria-labelledby="connect-services-heading">
      <span className="connect-section-rule" aria-hidden="true" />
      <h2 id="connect-services-heading">Services</h2>
      <div className="connect-services">
        {profile.services.map((service) => (
          <span key={service} className="connect-chip" data-connect="chip">
            {service}
          </span>
        ))}
      </div>
    </section>
  );
}
