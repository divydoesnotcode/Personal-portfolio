import { motion } from "motion/react";

const socials = [
    { label: "GitHub",      href: "https://github.com/divydoesnotcode" },
    { label: "LinkedIn",    href: "https://www.linkedin.com/in/divy-barot" },
    { label: "X / Twitter", href: "https://x.com/divydoesnotcode" },
    { label: "Mail",        href: "mailto:workwithdivy@gmail.com" },
];

const navLinks = [
    { label: "Work",       href: "#projects" },
    { label: "Skills",     href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact",    href: "#contact" },
];

export function Footer() {
    const year = new Date().getFullYear();
    
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
        <footer className="footer-root">

            {/* ── Top strip ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="footer-top"
            >
                {/* Section nav */}
                <nav className="footer-nav" aria-label="Footer navigation">
                    <span className="footer-group-label">Navigate</span>
                    <div className="footer-link-row">
                        {navLinks.map(({ label, href }) => (
                            <a 
                                key={label} 
                                href={href} 
                                onClick={(e) => handleScroll(e, href)}
                                className="footer-link"
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </nav>
            </motion.div>

            {/* ── Divider ── */}
            <div className="footer-divider" />

            {/* ── Giant name — two lines on mobile, one on desktop ── */}
            <div className="footer-name-wrap" aria-hidden="true">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >
                    {/* Desktop: single line */}
                    <div className="footer-name footer-name--desktop">DIVY BAROT</div>
                    {/* Mobile: stacked two lines so each fills the width */}
                    <div className="footer-name--mobile">
                        <div className="footer-name footer-name--line">DIVY</div>
                        <div className="footer-name footer-name--line footer-name--outline">BAROT.</div>
                    </div>
                </motion.div>
            </div>

            {/* ── Bottom bar ── */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="footer-bottom"
            >
                <p className="footer-meta">AI Engineer &amp; Full Stack Developer</p>
                <p className="footer-meta">© {year} Divy Barot</p>
            </motion.div>

            <style>{`
        /* ── Root ── */
        .footer-root {
          position: relative;
          background: #080808;
          border-top: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
        }

        /* ── Top strip ── */
        .footer-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: clamp(28px, 4vw, 40px);
          padding: clamp(32px,5vw,56px) clamp(20px,5vw,64px) 0;
        }

        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-group-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
        }

        .footer-link-row {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(14px, 2.5vw, 32px);
          align-items: center;
        }

        .footer-link {
          font-family: var(--font-body);
          font-size: clamp(12px, 1.1vw, 14px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.22s ease;
          /* 44px min touch target on mobile */
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }
        .footer-link:hover { color: rgba(255,255,255,0.85); }

        /* ── Divider ── */
        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: clamp(28px,4vw,48px) clamp(20px,5vw,64px) 0;
        }

        /* ── Giant name ── */
        .footer-name-wrap {
          width: 100%;
          overflow: hidden;
        }

        /* Shared name styles */
        .footer-name {
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 0.85;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.09);
          display: block;
          white-space: nowrap;
          user-select: none;
          cursor: default;
          transition: -webkit-text-stroke 0.4s ease;
          text-align: center;
          width: 100%;
        }
        .footer-name-wrap:hover .footer-name {
          -webkit-text-stroke: 1px rgba(255,255,255,0.18);
        }

        /* Desktop: one line, 16.5vw fills edge-to-edge */
        .footer-name--desktop {
          font-size: clamp(4rem, 16.5vw, 18rem);
          display: block;
        }

        /* Mobile two-line variant — hidden on desktop */
        .footer-name--mobile {
          display: none;
        }

        /* Each mobile line fills full width */
        .footer-name--line {
          font-size: 23vw;   /* 23vw on phone perfectly fills ~390px wide screens */
          display: block;
          white-space: nowrap;
        }

        /* BAROT gets the outline treatment like in Hero */
        .footer-name--outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.09);
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
          padding: clamp(14px,2vw,22px) clamp(20px,5vw,64px) clamp(24px,3.5vw,40px);
        }

        .footer-meta {
          font-family: var(--font-body);
          font-size: clamp(10px, 0.85vw, 12px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin: 0;
        }

        /* ── Mobile overrides ── */
        @media (max-width: 640px) {
          /* Stack nav + socials vertically */
          .footer-top {
            flex-direction: column;
            gap: 28px;
          }

          /* Tighten link rows on small screens */
          .footer-link-row {
            gap: 20px;
          }

          /* Hide single-line desktop name, show two-line mobile name */
          .footer-name--desktop { display: none; }
          .footer-name--mobile  { display: block; }

          /* Bottom bar: stack vertically, left-aligned */
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
        }
      `}</style>
        </footer>
    );
}