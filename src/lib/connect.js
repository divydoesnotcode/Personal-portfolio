export function normalizeSource(value) {
  if (value === "nfc" || value === "qr") return value;
  return "direct";
}

export function getArrivalTimings(source, reducedMotion) {
  if (reducedMotion) {
    return { timeScale: 1, pulse: false, skip: true };
  }
  if (source === "nfc") {
    return { timeScale: 1, pulse: true, skip: false };
  }
  if (source === "qr") {
    return { timeScale: 1.16, pulse: true, skip: false };
  }
  return { timeScale: 1.32, pulse: true, skip: false };
}
