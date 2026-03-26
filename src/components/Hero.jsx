import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches


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

const MARQUEE_ITEMS = [
    "Full Stack Developer", "React · Next.js · Node.js", "Open to Work",
    "UI / UX Enthusiast", "TypeScript · PostgreSQL", "Building Cool Stuff",
    "AI Engineer", "Python · FastAPI", "Discovering New Things",
    "Full Stack Developer", "React · Next.js · Node.js", "Open to Work",
    "UI / UX Enthusiast", "TypeScript · PostgreSQL", "Building Cool Stuff",
    "AI Engineer", "Python · FastAPI", "Discovering New Things",
];

function Marquee() {
    return (
        <div style={{
            overflow: "hidden",
            borderTop: "1px solid var(--border)",
            flexShrink: 0,
        }}>
            <div style={{
                display: "flex",
                whiteSpace: "nowrap",
                animation: "marquee-scroll 32s linear infinite",
                willChange: "transform",
                transform: "translateZ(0)",
            }}>
                {MARQUEE_ITEMS.map((item, i) => (
                    <span key={i} style={{
                        display: "inline-flex", alignItems: "center", gap: "20px",
                        padding: "13px 24px", fontSize: "10px", letterSpacing: "0.26em",
                        textTransform: "uppercase", color: "var(--fg-muted)",
                        fontFamily: "var(--font-body)", flexShrink: 0, opacity: 0.6,
                    }}>
                        {item}
                        <span style={{
                            width: "4px", height: "4px", borderRadius: "50%",
                            background: "var(--accent)", flexShrink: 0, opacity: 0.5,
                        }} />
                    </span>
                ))}
            </div>
        </div>
    );
}

export function Hero() {
    const sectionRef = useRef(null);
    const { scrollY } = useScroll();
    const nameY = useTransform(scrollY, [0, 700], isMobile ? [0, 0] : [0, -50]);

    const handleScroll = (e, href) => {
        if (!href.startsWith("#")) return;
        e.preventDefault();
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            ref={sectionRef}
            id="home"
            style={{
                position: "relative",
                height: "100svh",
                minHeight: "520px",
                display: "flex",
                flexDirection: "column",
                background: "var(--bg)",
            }}
            aria-label="Introduction"
        >
            {/* Ambient glow */}
            <div style={{
                position: "absolute", top: "20%", left: "50%",
                transform: "translateX(-50%)",
                width: "90vw", height: "50vh",
                background: "radial-gradient(ellipse at center, rgba(180,83,9,0.04) 0%, transparent 68%)",
                pointerEvents: "none", zIndex: 0,
            }} />

            {/* Top bar */}
            <motion.div
                variants={fade} initial="hidden" animate="show" custom={0}
                style={{
                    position: "relative", zIndex: 10, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "clamp(12px,2.5vw,22px) clamp(16px,5vw,48px)",
                }}
            >
                <span style={{
                    fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "var(--fg-muted)", fontFamily: "var(--font-body)", opacity: 0.7,
                }}>
                    Portfolio · 2026
                </span>
                <span style={{
                    display: "flex", alignItems: "center", gap: "7px",
                    fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#16a34a", fontFamily: "var(--font-body)",
                }}>
                    <span className="hero-status-dot" />
                    Available for work
                </span>
            </motion.div>

            {/*
              Central content:
              flex:1 + minHeight:0 = fills space between top-bar & marquee, can shrink.
              Font formula: clamp(3.4rem, min(20vw, 22vh), 17rem)
                - 20vw keeps it big relative to viewport width
                - 22vh caps it so 2 lines + role + buttons + marquee always fit
                  at 1080px tall: 22vh = ~237px per line  ✓
                  at 800px tall:  22vh = ~176px per line  ✓
                  at 600px tall:  22vh = ~132px per line  ✓
            */}
            <div style={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 5,
                padding: "0 clamp(16px,5vw,40px) clamp(60px,12vh,120px)",
                textAlign: "center",
                gap: "clamp(10px,2vh,28px)",
            }}>

                {/* Giant name */}
                <motion.div style={{ y: nameY }}>
                    <div style={{ overflow: "hidden", lineHeight: 0.88 }}>
                        <motion.h1
                            variants={slideUp} initial="hidden" animate="show" custom={1}
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(2.5rem, min(20vw, 22vh), 16rem)",
                                fontWeight: 700,
                                lineHeight: 0.88,
                                letterSpacing: "-0.025em",
                                color: "var(--fg)",
                                margin: 0,
                                display: "block",
                            }}
                        >
                            DIVY
                        </motion.h1>
                    </div>
                    <div style={{ overflow: "hidden", lineHeight: 0.88, marginTop: "clamp(2px,0.5vw,8px)" }}>
                        <motion.h1
                            variants={slideUp} initial="hidden" animate="show" custom={2}
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(2.5rem, min(20vw, 22vh), 16rem)",
                                fontWeight: 700,
                                lineHeight: 0.88,
                                letterSpacing: "-0.025em",
                                WebkitTextStroke: "clamp(1.2px,0.18vw,3px) rgba(26,22,16,0.3)",
                                color: "transparent",
                                margin: 0,
                                display: "block",
                            }}
                        >
                            BAROT.
                        </motion.h1>
                    </div>
                </motion.div>

                {/* Role line */}
                <div style={{ overflow: "hidden" }}>
                    <motion.p
                        variants={slideUp} initial="hidden" animate="show" custom={3}
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "clamp(11px, 1.4vw, 16px)",
                            fontWeight: 300,
                            color: "var(--fg-muted)",
                            letterSpacing: "0.04em",
                            margin: 0,
                            lineHeight: 1.6,
                        }}
                    >
                        AI Engineer · Full Stack Developer
                    </motion.p>
                </div>

                {/* CTAs */}
                <motion.div
                    variants={fade} initial="hidden" animate="show" custom={2}
                    style={{
                        display: "flex",
                        gap: "clamp(8px,1.5vw,14px)",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <a 
                        href="#projects" 
                        onClick={(e) => handleScroll(e, "#projects")}
                        className="hero-cta-primary"
                    >
                        View Work
                    </a>
                    <a href="mailto:workwithdivy@gmail.com" className="hero-cta-secondary">Get in Touch</a>
                </motion.div>
            </div>

            {/* Marquee — pinned at bottom, flexShrink:0 means it's never squeezed */}
            <motion.div
                variants={fade} initial="hidden" animate="show" custom={5}
                style={{ flexShrink: 0 }}
            >
                <Marquee />
            </motion.div>

            <style>{`
        .hero-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,0.6);
          display: inline-block;
          flex-shrink: 0;
          animation: heroDotPulse 2.2s ease-in-out infinite;
        }

        .hero-cta-primary {
          padding: clamp(11px,1.5vw,15px) clamp(22px,3.5vw,40px);
          background: var(--fg); color: var(--bg);
          border-radius: 100px;
          font-size: clamp(12px,1.1vw,14px);
          font-weight: 700; font-family: var(--font-display);
          letter-spacing: 0.06em; text-decoration: none;
          display: inline-flex; align-items: center; justify-content: center;
          transition: transform 0.22s ease, box-shadow 0.3s ease;
          white-space: nowrap;
          min-height: 44px;
        }
        .hero-cta-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 28px rgba(26,22,16,0.2);
        }
        .hero-cta-primary:active { transform: scale(0.97); }

        .hero-cta-secondary {
          padding: clamp(11px,1.5vw,15px) clamp(22px,3.5vw,40px);
          background: transparent; color: var(--fg-muted);
          border: 1px solid var(--border-strong);
          border-radius: 100px;
          font-size: clamp(12px,1.1vw,14px);
          font-weight: 500; font-family: var(--font-display);
          letter-spacing: 0.04em; text-decoration: none;
          display: inline-flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
          white-space: nowrap;
          min-height: 44px;
        }
        .hero-cta-secondary:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: scale(1.04);
        }
        .hero-cta-secondary:active { transform: scale(0.97); }

        @media (max-width: 420px) {
          .hero-cta-primary, .hero-cta-secondary {
            width: 100%;
            max-width: 260px;
          }
        }

        @keyframes heroDotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
        </section>
    );
}