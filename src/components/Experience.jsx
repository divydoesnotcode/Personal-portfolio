import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const experiences = [
  {
    year: "2024 — Now",
    title: "Full Stack Developer",
    company: "Tech Innovators Inc.",
    type: "Work",
    color: { r: 59, g: 130, b: 246 },   // blue
    description:
      "Developing and maintaining complex web applications using React, Node.js, and PostgreSQL. Focused on performance optimization and scalable architecture.",
    highlights: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    year: "2023 — 2024",
    title: "Frontend Engineer Intern",
    company: "Creative Design Agency",
    type: "Work",
    color: { r: 139, g: 92, b: 246 },   // violet
    description:
      "Built responsive and interactive user interfaces for various client projects. Collaborated closely with designers to ensure pixel-perfect implementation.",
    highlights: ["Next.js", "Figma", "Tailwind CSS", "Motion"],
  },
  {
    year: "2020 — 2024",
    title: "Computer Science",
    company: "University of Technology",
    type: "Education",
    color: { r: 16, g: 185, b: 129 },   // emerald
    description:
      "Graduated with honors. Coursework included Data Structures, Algorithms, Web Development, and Database Management Systems.",
    highlights: ["DSA", "System Design", "Web Dev", "DBMS"],
  },
];

// ── Animated vertical beam that fills as you scroll through the section ──────
function TimelineBeam({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    // Track — full-height faint line
    <div className="tl-track">
      {/* Filled beam that grows with scroll */}
      <motion.div className="tl-beam" style={{ scaleY, originY: 0 }} />
      {/* Glowing head dot that rides the top of the beam */}
      <motion.div
        className="tl-dot"
        style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
      />
    </div>
  );
}

// ── Single timeline entry ──────────────────────────────────────────────────
function TimelineEntry({ exp, index }) {
  const { r, g, b } = exp.color;
  const accent = `rgba(${r},${g},${b},`;

  return (
    <div className="tl-entry">

      {/* Left: sticky year label */}
      <div className="tl-year-col">
        <div className="tl-year-sticky">
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="tl-year-text"
          >
            {exp.year}
          </motion.span>
        </div>
      </div>

      {/* Right: content card */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-40px" }}
        className="tl-card"
        style={{ "--accent-r": r, "--accent-g": g, "--accent-b": b }}
      >
        {/* Corner glow */}
        <div
          className="tl-card-glow"
          style={{ background: `radial-gradient(circle at top right, ${accent}0.12), transparent)` }}
        />

        {/* Type badge */}
        <div className="tl-badge-row">
          <span
            className="tl-badge"
            style={{
              color: `${accent}0.85)`,
              borderColor: `${accent}0.2)`,
              background: `${accent}0.07)`,
            }}
          >
            {exp.type}
          </span>
        </div>

        {/* Title + company */}
        <h3 className="tl-title">{exp.title}</h3>
        <p className="tl-company" style={{ color: `${accent}0.8)` }}>{exp.company}</p>

        {/* Description */}
        <p className="tl-desc">{exp.description}</p>

        {/* Tech chips */}
        <div className="tl-chips">
          {exp.highlights.map((h) => (
            <span
              key={h}
              className="tl-chip"
              style={{
                color: `${accent}0.7)`,
                borderColor: `${accent}0.15)`,
                background: `${accent}0.05)`,
              }}
            >
              {h}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export function Experience() {
  const sectionRef = useRef(null);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="tl-section"
    >
      {/* Section header */}
      <div className="tl-header">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="tl-eyebrow"
        >
          The Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="tl-heading"
        >
          Experience &amp; <br className="hidden md:block" /> Education.
        </motion.h2>
      </div>

      {/* Timeline body */}
      <div className="tl-body" ref={sectionRef}>

        {/* The animated beam lives here, absolutely positioned */}
        <TimelineBeam containerRef={sectionRef} />

        {/* Entries */}
        <div className="tl-entries">
          {experiences.map((exp, i) => (
            <TimelineEntry key={exp.title} exp={exp} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .tl-section {
          padding: clamp(64px,8vw,96px) clamp(16px,5vw,48px);
          max-width: 72rem;
          margin: 0 auto;
        }

        /* ── Header ── */
        .tl-header {
          margin-bottom: clamp(40px,5vw,64px);
        }
        .tl-eyebrow {
          color: #3b82f6;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-family: var(--font-body);
          margin: 0 0 10px;
        }
        .tl-heading {
          font-family: var(--font-display);
          font-size: clamp(2.4rem,6vw,5rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.05;
          letter-spacing: -0.025em;
          margin: 0;
        }

        /* ── Timeline body (relative for the beam) ── */
        .tl-body {
          position: relative;
        }

        /* ── Beam track ── */
        .tl-track {
          /* On mobile: hidden (entries stack single column) */
          display: none;
          position: absolute;
          /* Align with the left edge of content column on desktop */
          left: clamp(120px,18vw,200px);
          top: 0;
          bottom: 0;
          width: 2px;
          z-index: 1;
        }
        /* Show on md+ */
        @media (min-width: 768px) {
          .tl-track { display: block; }
        }

        .tl-track::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.06);
          border-radius: 2px;
        }

        .tl-beam {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom,
            rgba(59,130,246,0.0) 0%,
            rgba(59,130,246,0.7) 40%,
            rgba(139,92,246,0.7) 70%,
            rgba(16,185,129,0.6) 100%
          );
          border-radius: 2px;
          transform-origin: top;
        }

        .tl-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 14px rgba(59,130,246,0.8), 0 0 28px rgba(59,130,246,0.4);
          z-index: 2;
        }

        /* ── Entries list ── */
        .tl-entries {
          display: flex;
          flex-direction: column;
          gap: clamp(32px,4vw,52px);
        }

        /* ── Single entry ── */
        .tl-entry {
          display: grid;
          /* Mobile: single column */
          grid-template-columns: 1fr;
          gap: 12px;
          position: relative;
        }
        @media (min-width: 768px) {
          .tl-entry {
            /* Desktop: [year col] [gap for beam] [card] */
            grid-template-columns: clamp(100px,16vw,180px) clamp(32px,3vw,48px) 1fr;
            gap: 0;
            align-items: start;
          }
        }

        /* ── Year column ── */
        .tl-year-col {
          /* On mobile sit above card */
        }
        @media (min-width: 768px) {
          .tl-year-col {
            /* Sticky so year label follows the card while scrolling */
            position: relative;
          }
        }

        .tl-year-sticky {
          padding-top: 20px; /* align with card top padding */
        }
        @media (min-width: 768px) {
          .tl-year-sticky {
            position: sticky;
            top: clamp(80px, 12vh, 120px);
          }
        }

        .tl-year-text {
          font-family: var(--font-body);
          font-size: clamp(11px,0.9vw,13px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          white-space: nowrap;
        }

        /* ── Card ── */
        .tl-card {
          position: relative;
          padding: clamp(20px,2.5vw,28px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.018);
          overflow: hidden;
          transition: border-color 0.3s, background 0.3s;
        }
        .tl-card:hover {
          border-color: rgba(255,255,255,0.11);
          background: rgba(255,255,255,0.028);
        }
        /* On desktop, the middle column is the beam lane — card sits in column 3 */
        @media (min-width: 768px) {
          .tl-card {
            grid-column: 3;
          }
        }

        .tl-card-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 20px;
        }

        /* ── Card internals ── */
        .tl-badge-row {
          margin-bottom: 12px;
        }
        .tl-badge {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid;
        }

        .tl-title {
          font-family: var(--font-display);
          font-size: clamp(1.1rem,2vw,1.35rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 4px;
          line-height: 1.3;
        }
        .tl-company {
          font-family: var(--font-body);
          font-size: clamp(12px,1vw,14px);
          font-weight: 500;
          margin: 0 0 14px;
        }
        .tl-desc {
          font-family: var(--font-body);
          font-size: clamp(13px,1vw,14px);
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          margin: 0 0 16px;
        }

        .tl-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tl-chip {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 8px;
          border: 1px solid;
        }

        /* ── Mobile connector dot (replaces beam on mobile) ── */
        @media (max-width: 767px) {
          .tl-year-text {
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
          .tl-year-text::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #3b82f6;
            flex-shrink: 0;
            box-shadow: 0 0 8px rgba(59,130,246,0.6);
          }
        }
      `}</style>
    </section>
  );
}