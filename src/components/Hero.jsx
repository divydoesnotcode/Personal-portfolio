import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const slideUp = {
    hidden: { y: "110%", opacity: 0 },
    show: (i = 0) => ({
        y: 0, opacity: 1,
        transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.13 },
    }),
};

const fade = {
    hidden: { opacity: 0, y: 14 },
    show: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease: "easeOut", delay: 0.75 + i * 0.1 },
    }),
};

// Doubled list so seamless loop works at any screen width
const MARQUEE_ITEMS = [
    "Full Stack Developer", "React · Next.js · Node.js", "Open to Work",
    "UI / UX Enthusiast", "TypeScript · PostgreSQL", "Building Cool Stuff",
    "AI Engineer", "Python · FastAPI", "Discovering New Things",
];

function Marquee() {
    return (
        <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", whiteSpace: "nowrap", animation: "marquee-scroll 32s linear infinite", willChange: "transform" }}>
                {MARQUEE_ITEMS.map((item, i) => (
                    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "20px", padding: "13px 24px", fontSize: "10px", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-body)", flexShrink: 0 }}>
                        {item}
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(59,130,246,0.6)", flexShrink: 0 }} />
                    </span>
                ))}
            </div>
        </div>
    );
}

export function Hero() {
    const sectionRef = useRef(null);
    const { scrollY } = useScroll();
    // Disable parallax on small screens — too aggressive on mobile
    const nameY = useTransform(scrollY, [0, 700], [0, -70]);

    return (
        <section ref={sectionRef} id="home" style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", background: "#080808", overflow: "hidden" }}>

            {/* Ambient glow */}
            <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "90vw", height: "50vh", background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 68%)", pointerEvents: "none", zIndex: 0 }} />

            {/* ── Top bar ── */}
            <motion.div variants={fade} initial="hidden" animate="show" custom={0}
                style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(14px,3vw,26px) clamp(16px,5vw,48px)" }}>
                <span style={{ fontSize: "12px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-body)" }}>
                    Portfolio · 2026
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(74,222,128,0.85)", fontFamily: "var(--font-body)" }}>
                    <span className="hero-status-dot" />
                    Available for work
                </span>
            </motion.div>

            {/* ── Central content ── */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 5, padding: "clamp(24px,5vw,60px) clamp(16px,5vw,40px)", textAlign: "center" }}>

                {/* Giant name — parallax on desktop only */}
                <motion.div style={{ y: nameY }}>
                    {/* DIVY — solid */}
                    <div style={{ overflow: "hidden", lineHeight: 0.86 }}>
                        <motion.h1 variants={slideUp} initial="hidden" animate="show" custom={1}
                            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4.2rem,20vw,16rem)", fontWeight: 800, lineHeight: 0.86, letterSpacing: "-0.035em", color: "#ffffff", margin: 0, display: "block" }}>
                            DIVY
                        </motion.h1>
                    </div>
                    {/* BAROT. — outline */}
                    <div style={{ overflow: "hidden", lineHeight: 0.86, marginTop: "clamp(3px,0.5vw,8px)" }}>
                        <motion.h1 variants={slideUp} initial="hidden" animate="show" custom={2}
                            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4.2rem,20vw,16rem)", fontWeight: 800, lineHeight: 0.86, letterSpacing: "-0.035em", WebkitTextStroke: "clamp(1.5px,0.2vw,3.5px) rgba(255,255,255,0.38)", color: "transparent", margin: 0, display: "block" }}>
                            BAROT.
                        </motion.h1>
                    </div>
                </motion.div>

                {/* Role line */}
                <div style={{ overflow: "hidden", marginTop: "clamp(20px,3.5vw,36px)" }}>
                    <motion.p variants={slideUp} initial="hidden" animate="show" custom={3}
                        style={{ fontFamily: "var(--font-body)", fontSize: "clamp(12px,1.6vw,17px)", fontWeight: 300, color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em", margin: 0, lineHeight: 1.6 }}>
                        AI Engineer · Full Stack Developer
                    </motion.p>
                </div>

                {/* CTAs — stack on mobile */}
                <motion.div variants={fade} initial="hidden" animate="show" custom={2}
                    style={{ display: "flex", gap: "clamp(8px,2vw,14px)", marginTop: "clamp(36px,6vw,56px)", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
                    <a href="#projects" className="hero-cta-primary">View Work</a>
                    <a href="mailto:workwithdivy@gmail.com" className="hero-cta-secondary">Get in Touch</a>
                </motion.div>
            </div>

            {/* ── Marquee ── */}
            <motion.div variants={fade} initial="hidden" animate="show" custom={5}>
                <Marquee />
            </motion.div>

            {/* ── Scoped styles ── */}
            <style>{`
        .hero-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,0.6);
          display: inline-block;
          flex-shrink: 0;
          animation: heroDotPulse 2.2s ease-in-out infinite;
        }
        .hero-scroll-line {
          width: 1px; height: 30px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.25), transparent);
          animation: heroScrollPulse 2.4s ease-in-out infinite;
        }

        /* Primary CTA */
        .hero-cta-primary {
          padding: clamp(12px,1.8vw,15px) clamp(24px,4vw,40px);
          background: #ffffff; color: #080808;
          border-radius: 100px; font-size: clamp(12px,1.2vw,14px);
          font-weight: 700; font-family: var(--font-display);
          letter-spacing: 0.06em; text-decoration: none;
          display: inline-flex; align-items: center; justify-content: center;
          transition: transform 0.22s ease, box-shadow 0.3s ease;
          white-space: nowrap;
          /* 44px min touch target */
          min-height: 44px;
        }
        .hero-cta-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 0 44px rgba(59,130,246,0.3);
        }
        .hero-cta-primary:active { transform: scale(0.97); }

        /* Secondary CTA */
        .hero-cta-secondary {
          padding: clamp(12px,1.8vw,15px) clamp(24px,4vw,40px);
          background: transparent; color: rgba(255,255,255,0.52);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 100px; font-size: clamp(12px,1.2vw,14px);
          font-weight: 500; font-family: var(--font-display);
          letter-spacing: 0.04em; text-decoration: none;
          display: inline-flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
          white-space: nowrap;
          min-height: 44px;
        }
        .hero-cta-secondary:hover { border-color: rgba(255,255,255,0.3); color: #fff; transform: scale(1.04); }
        .hero-cta-secondary:active { transform: scale(0.97); }

        /* Hire link */
        .hero-hire-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.16); font-family: var(--font-body);
          text-decoration: none; transition: color 0.22s ease;
          white-space: nowrap; min-height: 44px;
        }
        .hero-hire-link:hover { color: rgba(255,255,255,0.5); }

        /* Mobile overrides */
        @media (max-width: 480px) {
          .hero-cta-primary, .hero-cta-secondary {
            width: 100%; max-width: 280px;
          }
        }

        @keyframes heroDotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes heroScrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50%       { opacity: 0.8; transform: scaleY(1.12); }
        }
      `}</style>
        </section>
    );
}