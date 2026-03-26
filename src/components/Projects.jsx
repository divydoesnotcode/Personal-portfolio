import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { LinkPreview } from "../components/ui/LinkPreview";

const projects = [
  {
    number: "01",
    title: "ProcureGenie Local LLM",
    description: "A local LLM-powered procurement assistant that streamlines vendor discovery, RFQ generation, and supplier evaluation using open-source models like Llama 3 and Mistral.",
    tech: ["Next.js", "Ollama", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/divydoesnotcode/ProcureGenie-Local-LLM",
    year: "2026",
    tint: { r: 180, g: 83, b: 9 },   // Amber/Terracotta
    spotColor: "rgba(180,83,9,",
  },
  {
    number: "02",
    title: "Weather App",
    description: "A sleek, modern weather application built with React and Tailwind CSS. It fetches real-time weather data for any city worldwide using the OpenWeatherMap API and displays it in a beautiful, user-friendly interface.",
    tech: ["React", "Tailwind CSS", "OpenWeatherMap API"],
    github: "https://github.com/divydoesnotcode/Weather-app",
    year: "2025",
    tint: { r: 67, g: 90, b: 72 },   // Muted Sage/Olive
    spotColor: "rgba(67,90,72,",
  },
  {
    number: "03",
    title: "DJ Rohan - FreeLance",
    description: "A professional DJ website built with Next.js and Tailwind CSS. It features a sleek, modern design with smooth animations and a user-friendly interface. It also includes a contact form and a gallery of DJ setups.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Python"],
    github: "https://github.com/divydoesnotcode/djrohan-portfolio",
    vercel: "https://djrohan-portfolio.vercel.app", // example
    year: "2026",
    tint: { r: 110, g: 87, b: 115 }, // Muted Plum/Dusty Purple
    spotColor: "rgba(110,87,115,",
  },
  {
    number: "04",
    title: "Personal Portfolio",
    description: "First personal portfolio built with React and Framer Motion. Where it all started. A highly interactive React portfolio designed to demonstrate real-world UI thinking and clean component architecture",
    tech: ["React", "Framer", "Tailwind", "Motion", "GSAP"],
    github: "https://github.com/divydoesnotcode/My-portfolio",
    vercel: "https://divydoesnotcode-portfolio-livid-beta.vercel.app/", // example
    year: "2024",
    tint: { r: 122, g: 106, b: 83 }, // Warm Stone/Taupe
    spotColor: "rgba(122,106,83,",
  },
];

// ── Liquid Glass Card ──────────────────────────────────────────────────────
function GlassCard({ project, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position for specular highlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smooth the highlight position
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // 3-D tilt — subtle, Apple-style (not aggressive)
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const { r, g, b } = project.tint;
  const spot = project.spotColor;

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }

  // Specular highlight moves with cursor
  const highlightX = useTransform(springX, [-0.5, 0.5], ["10%", "90%"]);
  const highlightY = useTransform(springY, [-0.5, 0.5], ["10%", "90%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: hovered ? rotateX : 0,
        rotateY: hovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 800,
        transformPerspective: 800,
      }}
      className="glass-card"
    >
      {/* ── Layer 1: ambient tint glow behind the card ── */}
      <motion.div
        className="glass-ambient"
        animate={{ opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `radial-gradient(ellipse at 60% 40%, ${spot}0.22) 0%, ${spot}0.04) 70%, transparent 100%)`,
        }}
      />

      {/* ── Layer 2: frosted glass body ── */}
      <div className="glass-body">

        {/* ── Specular highlight: bright sheen that follows cursor ── */}
        <motion.div
          className="glass-specular"
          style={{
            background: useTransform(
              [springX, springY],
              ([x, y]) =>
                `radial-gradient(320px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.13) 0%, transparent 60%)`
            ),
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* ── Top edge shine — the Apple "rim light" ── */}
        <div className="glass-rim" />

        {/* ── Content ── */}
        <div className="glass-content">

          {/* Header row */}
          <div className="gc-header">
            <span className="gc-number" style={{ color: `${spot}0.2)` }}>
              {project.number}
            </span>
            <div className="gc-actions">
              {project.github && (
                <LinkPreview
                  url={project.github}
                  width={220}
                  height={138}
                  className="gc-icon-btn"
                >
                  <Github size={16} />
                </LinkPreview>
              )}
              {project.vercel && (
                <LinkPreview
                  url={project.vercel}
                  width={220}
                  height={138}
                  className="gc-icon-btn"
                >
                  <svg width="12" height="12" viewBox="0 0 76 65" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                </LinkPreview>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="gc-title">{project.title}</h3>

          {/* Description */}
          <p className="gc-desc">{project.description}</p>

          {/* Tech chips — glass pill style */}
          <div className="gc-chips">
            {project.tech.map((t) => (
              <span
                key={t}
                className="gc-chip"
                style={{
                  color: `${spot}0.9)`,
                  background: `${spot}0.08)`,
                  borderColor: `${spot}0.18)`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Footer: year */}
          <div className="gc-footer">
            <span className="gc-year">{project.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export function Projects() {
  return (
    <section id="projects" className="proj-section" aria-label="Featured Projects">

      {/* Header */}
      <div className="proj-header">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="proj-eyebrow"
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="proj-heading"
          >
            Featured <br className="hidden md:block" /> Projects.
          </motion.h2>
        </div>

        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          href="https://github.com/divydoesnotcode"
          target="_blank"
          rel="noopener noreferrer"
          className="proj-archive-link"
        >
          View Full Archive →
        </motion.a>
      </div>

      {/* Glass card grid */}
      <div className="proj-grid">
        {projects.map((project, i) => (
          <GlassCard key={project.number} project={project} index={i} />
        ))}
      </div>

      <style>{`
        /* ── Section ── */
        .proj-section {
          padding: clamp(64px,8vw,96px) clamp(16px,5vw,48px);
          max-width: 72rem;
          margin: 0 auto;
        }

        /* ── Header ── */
        .proj-header {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: clamp(36px,5vw,56px);
        }
        @media (min-width: 768px) {
          .proj-header {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .proj-eyebrow {
          color: var(--accent);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-family: var(--font-body);
          margin: 0 0 14px;
        }
        .proj-heading {
          font-family: var(--font-display);
          font-size: clamp(2.4rem,6vw,5rem);
          font-weight: 800;
          color: var(--fg);
          line-height: 1.05;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .proj-archive-link {
          font-family: var(--font-body);
          font-size: clamp(12px,1vw,14px);
          color: var(--fg-muted);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          padding-bottom: 2px;
          transition: color 0.22s, border-color 0.22s;
          white-space: nowrap;
          align-self: flex-start;
        }
        @media (min-width: 768px) {
          .proj-archive-link { align-self: flex-end; }
        }
        .proj-archive-link:hover {
          color: var(--fg);
          border-color: var(--border-strong);
        }

        /* ── Grid ── */
        .proj-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(16px,2.5vw,24px);
        }
        @media (min-width: 640px) {
          .proj-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── Glass card wrapper ── */
        .glass-card {
          position: relative;
          border-radius: 28px;
          cursor: pointer;
          /* Reserve space for the ambient glow to bleed outside */
          padding: 2px;
        }

        /* ── Ambient glow (bleeds outside card bounds) ── */
        .glass-ambient {
          position: absolute;
          inset: -20px;
          border-radius: 48px;
          pointer-events: none;
          z-index: 0;
          filter: blur(24px);
        }

        /* ── Frosted glass body ── */
        .glass-body {
          position: relative;
          z-index: 1;
          border-radius: 26px;
          overflow: hidden;
          /* The core Liquid Glass material */
          background: var(--bg-card);
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-card);
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
          min-height: 340px;
          display: flex;
          flex-direction: column;
        }
        .glass-card:hover .glass-body {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-card-hover);
        }

          /* ── Card content ── */
        .glass-content {
          position: relative;
          z-index: 4;
          padding: clamp(20px,2.5vw,28px);
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .gc-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: clamp(16px,2vw,24px);
        }

        .gc-number {
          font-family: var(--font-display);
          font-size: clamp(3rem,6vw,5rem);
          font-weight: 800;
          line-height: 1;
          user-select: none;
          color: transparent;
          -webkit-text-stroke: 1px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.15);
        }

        .gc-actions {
          display: flex;
          gap: 8px;
        }

        /* Icon button: glass pill */
        .gc-icon-btn,
        .gc-actions a.gc-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--fg-muted);
          text-decoration: none;
          transition: background 0.22s, color 0.22s, border-color 0.22s, transform 0.2s;
          backdrop-filter: blur(8px);
        }
        .gc-icon-btn:hover,
        .gc-actions a.gc-icon-btn:hover {
          background: rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.1);
          border-color: rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.3);
          color: rgba(var(--accent-r), var(--accent-g), var(--accent-b), 1);
          transform: scale(1.08);
        }

        .gc-title {
          font-family: var(--font-display);
          font-size: clamp(1.2rem,2.2vw,1.5rem);
          font-weight: 700;
          color: var(--fg);
          margin: 0 0 10px;
          line-height: 1.25;
        }

        .gc-desc {
          font-family: var(--font-body);
          font-size: clamp(12px,1vw,13.5px);
          color: var(--fg-muted);
          line-height: 1.7;
          margin: 0 0 20px;
          flex: 1;
        }

        /* Tech chips — frosted pill */
        .gc-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }

        .gc-chip {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          border: 1px solid;
          backdrop-filter: blur(8px);
          transition: background 0.2s, border-color 0.2s;
          background: rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.05);
        }

        .gc-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          border-top: 1px solid var(--border);
          padding-top: 12px;
          margin-top: auto;
        }

        .gc-year {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--fg-muted);
        }

        /* Mobile: ensure cards don't have 3d tilt on touch */
        @media (hover: none) {
          .glass-card {
            transform: none !important;
          }
          .glass-specular {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}