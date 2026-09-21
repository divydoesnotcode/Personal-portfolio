import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSearchParams } from "react-router-dom";

gsap.registerPlugin(useGSAP);
import { profile, SITE_URL } from "../../data/profile";
import { track } from "../../lib/analytics";
import { getArrivalTimings, normalizeSource } from "../../lib/connect";
import { playConnectMotion } from "../../lib/connect-motion";
import { ArrivalMark } from "./ArrivalMark";
import { ContactActions } from "./ContactActions";
import { IdentityCard } from "./IdentityCard";
import { Introduction } from "./Introduction";
import { PortfolioCTA } from "./PortfolioCTA";
import { SelectedWork } from "./SelectedWork";
import { Services } from "./Services";
import { WorkWithMeCTA } from "./WorkWithMeCTA";
import "./connect.css";

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function useConnectMeta() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = profile.seo.title;

    const ensureMeta = (selector, attrs) => {
      let node = document.head.querySelector(selector);
      if (!node) {
        node = document.createElement("meta");
        document.head.appendChild(node);
      }
      Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
      return node;
    };

    const canonicalHref = `${window.location.origin}/connect`;
    let canonical = document.head.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href") || "";
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalHref);

    const description = ensureMeta('meta[name="description"]', {
      name: "description",
      content: profile.seo.description,
    });
    const ogTitle = ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: profile.seo.title,
    });
    const ogDescription = ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: profile.seo.description,
    });
    const ogUrl = ensureMeta('meta[property="og:url"]', {
      property: "og:url",
      content: `${SITE_URL}/connect`,
    });
    const twitterTitle = ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: profile.seo.title,
    });
    const twitterDescription = ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: profile.seo.description,
    });

    return () => {
      document.title = previousTitle;
      if (previousCanonical) canonical.setAttribute("href", previousCanonical);
      description.setAttribute("content", description.getAttribute("content") || profile.seo.description);
      ogTitle.setAttribute("content", "Divy Barot | AI Engineer | Full Stack Engineer");
      ogDescription.setAttribute(
        "content",
        "AI Engineer and Full Stack Engineer building intelligent web applications using React, Next.js, Node.js, TypeScript, and LLMs."
      );
      ogUrl.setAttribute("content", SITE_URL);
      twitterTitle.setAttribute("content", "Divy Barot | AI Engineer | Full Stack Engineer");
      twitterDescription.setAttribute(
        "content",
        "AI Engineer and Full Stack Engineer specializing in LLMs, React, Next.js, Node.js and scalable AI systems."
      );
    };
  }, []);
}

export default function ConnectPage() {
  const [params] = useSearchParams();
  const source = normalizeSource(params.get("source"));
  const reducedMotion = useReducedMotion();
  const timings = useMemo(
    () => getArrivalTimings(source, reducedMotion),
    [source, reducedMotion]
  );
  const [stage, setStage] = useState(reducedMotion ? "ready" : "arrival");
  const rootRef = useRef(null);

  useConnectMeta();

  useEffect(() => {
    document.documentElement.classList.add("is-connect");
    return () => document.documentElement.classList.remove("is-connect");
  }, []);

  useEffect(() => {
    track("connect_page_view", { source });
    if (source === "nfc") track("connect_source_nfc");
    if (source === "qr") track("connect_source_qr");
  }, [source]);

  useGSAP(
    () => {
      if (!rootRef.current) return undefined;
      return playConnectMotion(rootRef.current, {
        reducedMotion,
        timeScale: timings.timeScale,
        pulse: timings.pulse,
        onReady: () => setStage("ready"),
      });
    },
    { scope: rootRef, dependencies: [reducedMotion, timings, source] }
  );

  return (
    <div
      ref={rootRef}
      className={`connect-page is-${stage}${reducedMotion ? " is-reduced" : " is-motion"}`}
    >
      <a className="connect-skip" href="#connect-actions">
        Skip to actions
      </a>
      <div className="connect-glow" data-connect="glow" aria-hidden="true" />
      <div className="connect-shell">
        <section className="connect-hero" aria-label="Digital contact card">
          <ArrivalMark />
          <div className="connect-kicker-stack" aria-live="polite">
            <p className="connect-kicker" data-connect="kicker-connected">
              Connected.
            </p>
            <p className="connect-kicker" data-connect="kicker-meet">
              Nice to meet you.
            </p>
          </div>
          <IdentityCard />
          <p className="connect-kicker connect-kicker-card" data-connect="kicker-card">
            Digital contact card
          </p>
          <ContactActions source={source} />
        </section>

        <Introduction />
        <SelectedWork source={source} />
        <Services />
        <PortfolioCTA source={source} />
        <WorkWithMeCTA source={source} />
        <footer className="connect-footer" data-connect="footer">
          © {new Date().getFullYear()} Divy Barot
        </footer>
      </div>
    </div>
  );
}
