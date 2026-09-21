function payload(event, props) {
  return {
    event,
    ...props,
    path: typeof window !== "undefined" ? window.location.pathname : "",
    t: Date.now(),
  };
}

export function track(event, props = {}) {
  try {
    if (typeof window === "undefined") return;

    const data = payload(event, props);

    if (typeof window.gtag === "function") {
      window.gtag("event", event, props);
    }

    if (typeof window.plausible === "function") {
      window.plausible(event, { props });
    }

    const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    if (!endpoint) return;

    const body = JSON.stringify(data);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
      return;
    }

    fetch(endpoint, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics must never affect the page.
  }
}
