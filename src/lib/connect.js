export function normalizeSource(value) {
  if (value === "nfc" || value === "qr") return value;
  return "direct";
}

export function getArrivalTimings(source, reducedMotion) {
  if (reducedMotion) {
    return { revealMs: 0, readyMs: 0, pulse: false };
  }
  if (source === "nfc") {
    return { revealMs: 720, readyMs: 980, pulse: true };
  }
  if (source === "qr") {
    return { revealMs: 520, readyMs: 740, pulse: true };
  }
  return { revealMs: 140, readyMs: 260, pulse: false };
}
