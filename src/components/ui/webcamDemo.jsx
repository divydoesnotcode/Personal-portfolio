import { motion } from "motion/react";
import WebcamPixelGrid from "./webcam-pixel-grid";
import { useEffect, useState } from "react";

const socials = [
  { label: "GitHub", href: "https://github.com/divydoesnotcode" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/divy-barot" },
  { label: "X / Twitter", href: "https://x.com/divydoesnotcode" },
  { label: "Mail", href: "mailto:workwithdivy@gmail.com" },
];

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function WebcamPixelGridDemo() {
  const year = new Date().getFullYear();
  // Remove theme-syncing logic; forcing dark mode
  const themeColors = {
    bg: "#12100C",
    border: "rgba(245, 240, 232, 0.18)",
  };

  const handleScroll = (e, href) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(href, {
        duration: 2.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const element = document.getElementById(href.replace("#", ""));
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="webcam-footer">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <WebcamPixelGrid
          gridCols={60}
          gridRows={40}
          maxElevation={20}
          motionSensitivity={0.3}
          elevationSmoothing={0.15}
          colorMode="webcam"
          backgroundColor={themeColors.bg}
          mirror={true}
          gapRatio={0.08}
          invertColors={false}
          darken={0.6}
          borderColor={themeColors.border}
          borderOpacity={0.12}
          className="w-full h-full"
        />
      </div>

      {/* Surface Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#12100C] via-transparent to-[#12100C] opacity-80 pointer-events-none" />

      {/* Footer Content */}
      <div className="relative z-10 w-full">
        {/* Top Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="webcam-footer-top"
        >
          <div className="flex flex-wrap gap-12 md:gap-32">
            <nav className="webcam-footer-nav" aria-label="Footer navigation">
              <span className="webcam-footer-label">Navigate</span>
              <div className="webcam-footer-links">
                {navLinks.map(({ label, href }) => (
                  <a key={label} href={href} onClick={(e) => handleScroll(e, href)} className="webcam-footer-link">
                    {label}
                  </a>
                ))}
              </div>
            </nav>

            <nav className="webcam-footer-nav" aria-label="Social navigation">
              <span className="webcam-footer-label">Connect</span>
              <div className="webcam-footer-links">
                {socials.map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="webcam-footer-link">
                    {label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="webcam-footer-divider" />

        {/* Subtle Status/Tagline */}
        <div className="webcam-footer-mid">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="webcam-footer-tagline"
          >
            "Leveraging Discipline, avoiding Distractions and building myself through Execution and Failures."
          </motion.p>
        </div>

        {/* Divider */}
        <div className="webcam-footer-divider" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="webcam-footer-bottom"
        >
          <p className="webcam-footer-meta">AI Engineer | Full Stack Engineer</p>
          <p className="webcam-footer-meta">© {year} Divy Barot</p>
        </motion.div>
      </div>

      <style>{`
        .webcam-footer {
          /* Force Dark Theme Variables */
          --bg: #12100C;
          --fg: #F5F0E8;
          --fg-muted: #A8A092;
          --border-strong: rgba(245, 240, 232, 0.18);
          --surface: rgba(245, 240, 232, 0.05);
          --accent: #D97706;
          --accent-muted: rgba(217, 119, 6, 0.15);

          position: relative;
          min-height: 60vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--bg);
          border-top: 1px solid var(--border-strong);
          overflow: hidden;
          padding: 0;
          color: var(--fg);
        }

        .webcam-footer-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: clamp(60px, 8vw, 100px) clamp(20px, 5vw, 64px) 0;
        }

        .webcam-footer-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .webcam-footer-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--fg-muted);
          opacity: 0.8;
        }

        .webcam-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(16px, 3vw, 40px);
        }

        .webcam-footer-link {
          font-family: var(--font-body);
          font-size: clamp(12px, 1.2vw, 15px);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--fg);
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .webcam-footer-link:hover {
          color: var(--accent);
          transform: translateY(-2px);
        }

        .webcam-footer-divider {
          height: 1px;
          background: var(--border-strong);
          margin: clamp(40px, 6vw, 80px) clamp(20px, 5vw, 64px) 0;
          opacity: 0.5;
        }

        .webcam-footer-mid {
          width: 100%;
          padding: clamp(40px, 6vw, 80px) clamp(20px, 5vw, 64px);
          text-align: center;
        }

        .webcam-footer-tagline {
           font-family: var(--font-display);
           font-size: clamp(2rem, 5vw, 4rem);
           font-weight: 700;
           letter-spacing: -0.01em;
           line-height: 1.1;
           color: var(--fg);
           opacity: 0.8;
           max-width: 900px;
           margin: 0 auto;
        }

        .webcam-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(20px, 4vw, 40px) clamp(20px, 5vw, 64px);
        }

        .webcam-footer-meta {
          font-family: var(--font-body);
          font-size: clamp(10px, 0.9vw, 13px);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--fg-muted);
        }

        @media (max-width: 640px) {
          .webcam-footer-top {
            flex-direction: column;
            gap: 40px;
          }
          .webcam-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .webcam-footer-name {
            font-size: 24vw;
            -webkit-text-stroke: 1px var(--border-strong);
          }
        }
      `}</style>
    </footer>
  );
}