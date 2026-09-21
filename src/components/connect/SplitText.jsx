export function SplitChars({ text, className }) {
  return (
    <span className={className} aria-label={text}>
      {Array.from(text).map((char, index) => (
        <span className="connect-char-clip" key={`${char}-${index}`} aria-hidden="true"><span className="connect-char">{char === " " ? "\u00A0" : char}</span></span>
      ))}
    </span>
  );
}

export function SplitWords({ text, className }) {
  return (
    <span className={className} aria-hidden="true">
      {text.split(" ").map((word, index) => (
        <span className="connect-char-clip" key={`${word}-${index}`} aria-hidden="true"><span className="connect-word">{word}</span></span>
      ))}
    </span>
  );
}
