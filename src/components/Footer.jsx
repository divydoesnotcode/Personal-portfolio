"use client";
import { motion } from "motion/react";
import { Compass, Mail, ExternalLink, ShieldCheck } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/divydoesnotcode" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/divy-barot" },
  { label: "X / Twitter", href: "https://x.com/divydoesnotcode" },
  { label: "Mail", href: "mailto:workwithdivy@gmail.com" },
];

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Sandbox", href: "#attention-sandbox" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  const handleScroll = (e, href) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();

    if (window.lenis) {
      window.lenis.scrollTo(href, {
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="f1-footer-root">
      
      {/* ── Geometric Telemetry Grid System ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Horizontal gridlines */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-[var(--border-strong)]" />
        <div className="absolute inset-x-0 bottom-[60px] h-[1px] bg-[var(--border)]" />
        
        {/* Vertical gridlines */}
        <div className="absolute inset-y-0 left-[10%] w-[1px] bg-[var(--border)]" />
        <div className="absolute inset-y-0 right-[10%] w-[1px] bg-[var(--border)]" />

        {/* Coordinate points */}
        <span className="absolute top-2 left-[10%] translate-x-[-50%] text-[8px] font-mono text-[var(--fg-muted)] opacity-40">+ F1_GRID</span>
        <span className="absolute top-2 right-[10%] translate-x-[50%] text-[8px] font-mono text-[var(--fg-muted)] opacity-40">+ F1_GRID</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        
        {/* ── Top Control HUD ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand/Telemetry Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-[0.25em]">System Status</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--fg)]">GRID_ENGAGED // OK</span>
            </div>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed mt-2 font-sans">
              Designed around telemetry frameworks and high-performance computing design specs. Re-engineering visual storytelling.
            </p>
          </div>

          {/* Navigation Anchors Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-[0.25em] opacity-80">Navigate Console</span>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => handleScroll(e, href)}
                  className="f1-footer-link"
                >
                  <Compass size={11} className="inline mr-1 text-[var(--accent)]" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Nodes Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-[0.25em] opacity-80">Connect Nodes</span>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="f1-footer-link"
                >
                  <ExternalLink size={11} className="inline mr-1 text-[var(--fg-muted)]" />
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Signature Philosophy Large Text (Cinematic Reveal) ── */}
        <div className="my-14 border-t border-b border-[var(--border)] py-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-muted)] via-transparent to-transparent opacity-10 pointer-events-none" />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="f1-tagline font-display text-[clamp(1.4rem,4.5vw,3.2rem)] font-extrabold leading-[1.1] text-[var(--fg)] max-w-5xl mx-auto tracking-tight"
          >
            "Leveraging Discipline, avoiding Distractions and building myself through Execution and Failures."
          </motion.p>
        </div>

        {/* ── Bottom HUD Meta Bar ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-4">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--fg-muted)]">
            <ShieldCheck size={12} className="text-emerald-500" />
            <span>AI ENGINE PROV // COMPILING OK</span>
          </div>
          
          <div className="flex items-center gap-8 text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--fg-muted)]">
            <span>© {year} DIVY BAROT</span>
            <span>GRID_LOC // 23.03_N 72.57_E</span>
          </div>
        </div>

      </div>

      <style>{`
        .f1-footer-root {
          position: relative;
          background: var(--bg);
          overflow: hidden;
          width: 100%;
        }

        .f1-footer-link {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--fg);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          padding: 6px 0;
          transition: color 0.25s ease, transform 0.2s ease;
        }
        .f1-footer-link:hover {
          color: var(--accent);
          transform: translateX(2px);
        }

        .f1-tagline {
          letter-spacing: -0.015em;
        }

        @media (max-width: 640px) {
          .f1-footer-root {
            padding-bottom: 72px; /* Touch navbar clearance */
          }
        }
      `}</style>
    </footer>
  );
}