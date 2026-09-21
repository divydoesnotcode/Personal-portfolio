import { profile } from "../../data/profile";
import { SplitChars, SplitWords } from "./SplitText";

export function IdentityCard() {
  return (
    <div className="connect-copy" data-connect="identity">
      <h1 className="connect-name">
        <SplitChars text={profile.givenName} className="connect-name-line" />
        <SplitChars text={profile.familyName} className="connect-name-line" />
      </h1>
      <p className="connect-role" aria-label={profile.role}>
        <SplitWords text={profile.role} />
      </p>
      <p className="connect-positioning" data-connect="positioning">
        {profile.positioning}
      </p>
    </div>
  );
}
