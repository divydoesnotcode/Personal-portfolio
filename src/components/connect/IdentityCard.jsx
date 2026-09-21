import { profile } from "../../data/profile";

export function IdentityCard() {
  return (
    <div className="connect-copy">
      <h1 className="connect-name">
        <span>{profile.givenName}</span>
        <span>{profile.familyName}</span>
      </h1>
      <p className="connect-role">{profile.role}</p>
      <p className="connect-positioning">{profile.positioning}</p>
    </div>
  );
}
