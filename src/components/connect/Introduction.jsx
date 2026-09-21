import { profile } from "../../data/profile";

export function Introduction() {
  return (
    <section className="connect-section connect-intro" data-connect="section" aria-labelledby="connect-intro-heading">
      <span className="connect-section-rule" aria-hidden="true" />
      <h2 id="connect-intro-heading">Introduction</h2>
      <p>{profile.introduction}</p>
    </section>
  );
}
