import { profile } from "../../data/profile";

export function Services() {
  return (
    <section className="connect-section" aria-labelledby="connect-services-heading">
      <h2 id="connect-services-heading">Services</h2>
      <div className="connect-services">
        {profile.services.map((service) => (
          <span key={service} className="connect-chip">
            {service}
          </span>
        ))}
      </div>
    </section>
  );
}
