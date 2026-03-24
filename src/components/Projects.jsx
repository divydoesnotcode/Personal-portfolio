import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "AI Image Generator",
    description: "Full-stack SaaS platform for generating AI images with DALL-E 3. Real-time generation, user auth, and subscription billing.",
    tech: ["Next.js", "OpenAI", "Stripe", "PostgreSQL"],
    link: "https://github.com/divydoesnotcode",
    year: "2024",
    // Tint color for the glass — each card has its own ambient hue
    tint: { r: 99, g: 102, b: 241 },   // indigo
    spotColor: "rgba(99,102,241,",
  },
  {
    number: "02",
    title: "Crypto Dashboard",
    description: "Real-time cryptocurrency tracking with live charts, portfolio management, and price alerts across 200+ coins.",
    tech: ["React", "Chart.js", "WebSockets"],
    link: "https://github.com/divydoesnotcode",
    year: "2024",
    tint: { r: 20, g: 184, b: 166 },   // teal
    spotColor: "rgba(20,184,166,",
  },
  {
    number: "03",
    title: "Task Management",
    description: "Collaborative task manager with real-time updates, team workspaces, drag-and-drop kanban, and deadline tracking.",
    tech: ["Node.js", "Socket.io", "React", "MongoDB"],
    link: "https://github.com/divydoesnotcode",
    year: "2023",
    tint: { r: 244, g: 63, b: 94 },    // rose
    spotColor: "rgba(244,63,94,",
  },
  {
    number: "04",
    title: "Portfolio v1",
    description: "First personal portfolio built with React and Framer Motion. Where it all started.",
    tech: ["React", "Framer", "Tailwind"],
    link: "https://github.com/divydoesnotcode",
    year: "2023",
    tint: { r: 251, g: 146, b: 60 },   // orange
    spotColor: "rgba(251,146,60,",
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
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="gc-icon-btn"
                aria-label="Open project"
              >
                <ArrowUpRight size={16} />
              </a>
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
    <section id="projects" className="proj-section">

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
          color: #3b82f6;
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
          color: #fff;
          line-height: 1.05;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .proj-archive-link {
          font-family: var(--font-body);
          font-size: clamp(12px,1vw,14px);
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          padding-bottom: 2px;
          transition: color 0.22s, border-color 0.22s;
          white-space: nowrap;
          align-self: flex-start;
        }
        @media (min-width: 768px) {
          .proj-archive-link { align-self: flex-end; }
        }
        .proj-archive-link:hover {
          color: rgba(255,255,255,0.85);
          border-color: rgba(255,255,255,0.5);
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
          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.09) 0%,
              rgba(255,255,255,0.04) 50%,
              rgba(255,255,255,0.07) 100%
            );
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.12);
          /* Outer shadow: depth + subtle colored bloom */
          box-shadow:
            0 1px 0 0 rgba(255,255,255,0.12) inset,  /* top rim */
            0 -1px 0 0 rgba(0,0,0,0.2) inset,         /* bottom inner shadow */
            0 20px 60px rgba(0,0,0,0.35),
            0 4px 16px rgba(0,0,0,0.2);
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
          min-height: 340px;
          display: flex;
          flex-direction: column;
        }
        .glass-card:hover .glass-body {
          border-color: rgba(255,255,255,0.2);
          box-shadow:
            0 1px 0 0 rgba(255,255,255,0.18) inset,
            0 -1px 0 0 rgba(0,0,0,0.2) inset,
            0 28px 80px rgba(0,0,0,0.4),
            0 8px 24px rgba(0,0,0,0.25);
        }

        /* ── Specular highlight (cursor-following) ── */
        .glass-specular {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          transition: opacity 0.3s ease;
          border-radius: 26px;
        }

        /* ── Top rim light — the Apple "edge catch" ── */
        .glass-rim {
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.5) 30%,
            rgba(255,255,255,0.7) 50%,
            rgba(255,255,255,0.5) 70%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 3;
          border-radius: 1px;
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
        }

        .gc-actions {
          display: flex;
          gap: 8px;
        }

        /* Icon button: glass pill */
        .gc-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: background 0.22s, color 0.22s, border-color 0.22s, transform 0.2s;
          backdrop-filter: blur(8px);
        }
        .gc-icon-btn:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.28);
          color: #fff;
          transform: scale(1.08);
        }

        .gc-title {
          font-family: var(--font-display);
          font-size: clamp(1.2rem,2.2vw,1.5rem);
          font-weight: 700;
          color: rgba(255,255,255,0.95);
          margin: 0 0 10px;
          line-height: 1.25;
        }

        .gc-desc {
          font-family: var(--font-body);
          font-size: clamp(12px,1vw,13.5px);
          color: rgba(255,255,255,0.48);
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
        }

        .gc-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 12px;
          margin-top: auto;
        }

        .gc-year {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
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