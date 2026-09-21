import { profile } from "../../data/profile";

export function Introduction() {
  return (
    <section className="connect-section connect-intro" aria-labelledby="connect-intro-heading">
      <h2 id="connect-intro-heading">Introduction</h2>
      <p>{profile.introduction}</p>
    </section>
  );
}
