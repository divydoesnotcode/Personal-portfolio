"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Compass, Calendar, Layers, MapPin, Check } from "lucide-react";

const experiences = [
  {
    lap: "LAP_05",
    year: "Mar 2026 — Present",
    title: "Full Stack Engineer",
    company: "Procurement Genie Pvt. Ltd.",
    type: "OPERATIONAL_NODE",
    color: { r: 199, g: 92, b: 116 }, // Dusty Rose
    description:
      "Promoted from intern after three months. Now own the procurement product end-to-end — Next.js surfaces, Node APIs, and local plus cloud LLMs — shipping features that cut real review and negotiation time.",
    points: [
      "Shipped an AI negotiation flow across Ollama, Groq, Qwen, and Ministral, cutting manual turnaround by 60%+.",
      "Built LLM-assisted purchase-requisition review that flags anomalies and summarizes PRs, reducing manual review by 50%+.",
      "Designed Node.js and Next.js REST APIs with provider logic decoupled, so models can swap without touching feature code.",
    ],
    highlights: ["Next.js", "Node.js", "Ollama", "Groq", "PostgreSQL", "React", "Docker"],
  },

  {
    lap: "LAP_04",
    year: "Jan 2026 — Mar 2026",
    title: "Full Stack Engineer - Intern",
    company: "Procurement Genie Pvt. Ltd.",
    type: "OPERATIONAL_NODE",
    color: { r: 110, g: 87, b: 115 }, // Muted Purple
    description:
      "First three months on the procurement team. Ramped on the React, Node, and PostgreSQL stack and shipped production UI and API work that converted into a full-time seat.",
    points: [
      "Owned day-to-day feature delivery across the multi-tenant portal — frontend surfaces and REST APIs — while learning the procurement domain.",
      "Stood up local LLM experiments with Ollama so later production AI features already had a working integration path.",
      "Converted to Full Stack Engineer after three months on the strength of that delivery, not a timed rotation.",
    ],
    highlights: ["React", "Node.js", "PostgreSQL", "Next.js", "Ollama", "Docker"],
  },
  {
    lap: "LAP_03",
    year: "2023 — Present",
    title: "Full Stack Engineer - Freelance",
    company: "Freelance Client Systems",
    type: "CONTRACT_TELEMETRY",
    color: { r: 217, g: 119, b: 6 }, // Amber
    description:
      "Ran client work fully remote and async since 2023 — two clients, no fixed hours, no daily check-ins. Owned delivery from scope to deploy: custom frontends, APIs, and AI automation.",
    points: [
      "Designed and deployed Vermithor, a self-hosted AI Telegram assistant on n8n, Groq, and Docker — calendar, weather, and a daily briefing in one workflow.",
      "Shipped DJ Rohan's production portfolio in Next.js and TypeScript: animations, social integrations, and a responsive deploy against live client notes.",
      "Built My Daily Briefing: six parallel APIs into one Discord digest, filtering 1,000+ RSS items down to the top 5 stories per run — LLM layered on after the pipeline already worked.",
    ],
    highlights: ["Next.js", "n8n", "Groq", "Docker", "TypeScript", "React"],
  },
  {
    lap: "LAP_02",
    year: "2023 — 2026",
    title: "B.E. Computer Science - AI/ML",
    company: "New L.J. Institute of Engineering and Technology",
    type: "ACADEMIC_CALIBRATION",
    color: { r: 67, g: 90, b: 72 }, // Sage Green
    description:
      "B.E. in Computer Science with an AI/ML specialization at New L.J. Institute (GTU) — 9.23 CGPA. Coursework in AI, ML, deep learning, computer vision, and DevOps, used as a lab for real products rather than a transcript checklist.",
    points: [
      "Built ProcureGenie, a local-LLM vendor discovery system: FastAPI + PostgreSQL first, Ollama only on a miss, results validated with Pydantic and persisted for reuse.",
      "Shipped the React (Vite) frontend with a dual-mode search toggle between database lookups and live AI generation.",
      "Ran freelance and internship work in parallel with the degree, so models, APIs, and deploys landed on real clients — not just lab notebooks.",
    ],
    highlights: ["Python", "FastAPI", "PyTorch", "Ollama", "PostgreSQL", "Deep Learning"],
  },
  {
    lap: "LAP_01",
    year: "2020 — 2023",
    title: "Diploma in Computer Engineering",
    company: "R. C. Technical Institute",
    type: "ACADEMIC_CALIBRATION",
    color: { r: 122, g: 106, b: 83 }, // Warm Stone
    description:
      "Diploma in Computer Engineering at R. C. Technical Institute (GTU) — 8.68 CGPA. Three years of the actual building blocks: DSA, Java, OS, networking, and web applications, before any of the AI work.",
    points: [
      "Coursework in data structures, algorithms, DBMS, operating systems, and computer networks, with web application development as the first production-shaped work.",
      "Learned to write and reason about programs in Java and structured databases before jumping to frameworks.",
      "Left with a systems foundation that later made Node APIs, PostgreSQL, and Docker feel like extensions of the same ideas — not a new language.",
    ],
    highlights: ["DSA", "Java", "DBMS", "Networking", "Web Dev", "OS"],
  },
];

// ── Animated vertical race vector track that fills as you scroll ──────
function TimelineBeam({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="f1-tl-track">
      {/* Filled race vector line */}
      <motion.div className="f1-tl-beam" style={{ scaleY, originY: 0 }} />
      {/* Glowing head indicator riding the scroll line */}
      <motion.div
        className="f1-tl-dot"
        style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
      />
    </div>
  );
}

// ── Single timeline telemetry entry ──────────────────────────────────────
function TimelineEntry({ exp, index }) {
  const { r, g, b } = exp.color;
  const accent = `rgba(${r},${g},${b},`;

  return (
    <div className="f1-tl-entry">

      {/* Left: Sticky lap stats label */}
      <div className="f1-tl-year-col">
        <div className="f1-tl-year-sticky">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="flex flex-col items-end gap-1.5"
          >
            <span className="font-display text-lg font-black" style={{ color: `rgb(${r},${g},${b})` }}>
              {exp.lap}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--fg-muted)] opacity-60">
              {exp.year}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Right: Telemetry data card */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-40px" }}
        className="f1-tl-card"
        style={{ "--accent-r": r, "--accent-g": g, "--accent-b": b }}
      >
        {/* Ambient glow inside card */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at top right, ${accent}0.08), transparent)` }}
        />

        {/* 1. Cyber grid frame */}
        <div className="absolute inset-0 border border-[var(--border)] rounded-2xl pointer-events-none" />
        <span className="absolute top-0.5 left-2 z-10 font-mono text-[7px] text-[var(--fg-muted)] tracking-widest opacity-40">STAGE_NODE // 0{index + 1}</span>

        {/* Status header */}
        <div className="flex justify-between items-start mb-4 border-b border-[var(--border)] pb-3">
          <span
            className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border"
            style={{
              color: `rgba(${r},${g},${b},0.9)`,
              borderColor: `rgba(${r},${g},${b},0.25)`,
              backgroundColor: `rgba(${r},${g},${b},0.05)`,
            }}
          >
            {exp.type}
          </span>
          <div className="flex items-center gap-1 text-[8px] font-mono text-[var(--fg-muted)] opacity-60">
            <Calendar size={10} className="text-[var(--accent)]" />
            <span>CALIBRATED // OK</span>
          </div>
        </div>

        {/* Title & Organization */}
        <h3 className="font-display font-extrabold text-base text-[var(--fg)] mb-1 leading-snug">
          {exp.title}
        </h3>
        <p className="font-sans text-xs font-semibold mb-4 flex items-center gap-1.5" style={{ color: `rgba(${r},${g},${b},0.9)` }}>
          <MapPin size={11} className="text-[var(--fg-muted)]" />
          {exp.company}
        </p>

        {/* Job Narrative */}
        <p className={`font-sans text-xs text-[var(--fg-muted)] leading-relaxed ${exp.points?.length ? "mb-4" : "mb-6"}`}>
          {exp.description}
        </p>
        {exp.points?.length > 0 && (
          <ul className="flex flex-col gap-2.5 mb-6 pl-0.5">
            {exp.points.map((point) => (
              <li key={point} className="f1-tl-point flex items-start gap-2.5">
                <span className="f1-tl-point-dot" aria-hidden />
                <span className="f1-tl-point-text font-sans text-xs leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Action tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)]">
          {exp.highlights.map((h) => (
            <span
              key={h}
              className="font-mono text-[8px] uppercase tracking-widest px-2 py-1 bg-[var(--surface)] border border-[var(--border)] rounded flex items-center gap-1 text-[var(--fg-muted)]"
            >
              <Check size={8} style={{ color: `rgb(${r},${g},${b})` }} />
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
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="f1-tl-section"
      aria-label="Lap Registry Timeline"
    >

      {/* ── Immersive Grid Telemetry background ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Horizontal gridlines */}
        <div className="absolute inset-x-0 top-[25%] h-[1px] bg-[var(--border)]" />

        {/* Coordinate tick */}
        <span className="absolute top-[25%] left-[4%] text-[8px] font-mono text-[var(--fg-muted)] opacity-30">+ CH_05_E</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-14 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-[0.25em]"
            >
              Telemetry History // Lap Registry
            </motion.p>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="f1-tl-heading font-display text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[0.95] text-[var(--fg)]"
          >
            CAREER &amp; ACADEMIC <br className="hidden md:block" /> LAP REGISTRY.
          </motion.h2>
        </div>

        {/* Timeline body */}
        <div className="f1-tl-body">

          {/* Animated race vector line — only loaded on desktop to save mobile CPU */}
          {!isMobile && <TimelineBeam containerRef={sectionRef} />}

          {/* Entries */}
          <div className="f1-tl-entries">
            {experiences.map((exp, i) => (
              <TimelineEntry key={exp.title} exp={exp} index={i} />
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .f1-tl-section {
          position: relative;
          padding: clamp(64px, 8vw, 96px) 0;
          background: var(--bg);
        }

        .f1-tl-heading {
          letter-spacing: -0.03em;
        }

        .f1-tl-body {
          position: relative;
        }

        /* ── Telemetry Race Line ── */
        .f1-tl-track {
          display: none;
          position: absolute;
          left: clamp(120px, 18vw, 200px);
          top: 0;
          bottom: 0;
          width: 1px;
          z-index: 1;
        }
        @media (min-width: 768px) {
          .f1-tl-track { display: block; }
        }

        .f1-tl-track::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--border);
        }

        .f1-tl-beam {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom,
            rgba(180,83,9,0.0) 0%,
            rgba(180,83,9,0.8) 22%,
            rgba(217,119,6,0.75) 48%,
            rgba(110,87,115,0.7) 74%,
            rgba(67,90,72,0.7) 100%
          );
          transform-origin: top;
        }

        .f1-tl-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
          z-index: 2;
        }

        .f1-tl-entries {
          display: flex;
          flex-direction: column;
          gap: clamp(32px, 5vw, 64px);
        }

        .f1-tl-entry {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          position: relative;
        }
        @media (min-width: 768px) {
          .f1-tl-entry {
            grid-template-columns: clamp(100px, 16vw, 180px) clamp(32px, 3vw, 48px) 1fr;
            gap: 0;
            align-items: start;
          }
        }

        .f1-tl-year-col {
          text-align: left;
        }
        @media (min-width: 768px) {
          .f1-tl-year-col {
            text-align: right;
            position: relative;
          }
        }

        .f1-tl-year-sticky {
          padding-top: 16px;
        }
        @media (min-width: 768px) {
          .f1-tl-year-sticky {
            position: sticky;
            top: clamp(100px, 14vh, 140px);
          }
        }

        .f1-tl-card {
          position: relative;
          padding: 24px;
          border-radius: 16px;
          background: var(--bg-card);
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .f1-tl-card {
            grid-column: 3;
          }
        }

        /* Mobile entry outline marker */
        @media (max-width: 767px) {
          .f1-tl-year-col {
            display: flex;
            align-items: center;
            gap: 8px;
          }
        }

        .f1-tl-point-dot {
          margin-top: 6px;
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          border-radius: 50%;
          background: rgb(var(--accent-r), var(--accent-g), var(--accent-b));
          box-shadow:
            0 0 4px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 1),
            0 0 10px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.7),
            0 0 18px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.4);
          animation: f1-tl-point-pulse 2.6s ease-in-out infinite;
        }

        .f1-tl-point-text {
          color: var(--fg-muted);
          transition: color 0.3s ease, text-shadow 0.3s ease;
          text-shadow:
            0 0 10px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.28),
            0 0 22px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.12);
        }

        .f1-tl-point:hover .f1-tl-point-text {
          color: rgb(var(--accent-r), var(--accent-g), var(--accent-b));
          text-shadow:
            0 0 12px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.5),
            0 0 24px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.22);
        }

        @keyframes f1-tl-point-pulse {
          0%, 100% {
            box-shadow:
              0 0 4px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.85),
              0 0 10px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.45);
          }
          50% {
            box-shadow:
              0 0 6px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 1),
              0 0 16px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.75),
              0 0 28px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.35);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .f1-tl-point-dot { animation: none; }
        }
      `}</style>
    </section>
  );
}