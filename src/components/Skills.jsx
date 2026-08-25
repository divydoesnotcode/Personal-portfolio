"use client";
import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, Cpu, Activity, Database, Sparkles, Check } from "lucide-react";

const skillCategories = [
  {
    label: "AI & ML",
    systemId: "SYS_0 // MODEL_INTELLIGENCE",
    icon: Sparkles,
    color: { r: 199, g: 92, b: 116 }, // Dusty Rose
    skills: [
      { name: "Artificial Intelligence", level: 90 },
      { name: "Machine Learning", level: 84 },
      { name: "Prompt Engineering", level: 97 },
      { name: "RAG", level: 85 },
      { name: "AI API Integration", level: 92 },
      { name: "Ollama / Local LLMs", level: 90 },
    ],
  },
  {
    label: "Frontend Core",
    systemId: "SYS_A // USER_INTERFACE",
    icon: Sliders,
    color: { r: 217, g: 119, b: 6 }, // Amber
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 75 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    label: "Backend Engine",
    systemId: "SYS_B // SERVER_ORCHESTRATION",
    icon: Cpu,
    color: { r: 67, g: 90, b: 72 }, // Sage Green
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 88 },
      { name: "REST APIs", level: 92 },
      { name: "GraphQL", level: 52 },
      { name: "API Handling", level: 85 },
    ],
  },
  {
    label: "Storage & State",
    systemId: "SYS_C // DATABASE_REGISTRY",
    icon: Database,
    color: { r: 110, g: 87, b: 115 }, // Muted Purple
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 82 },
      { name: "Redis", level: 75 },
      { name: "Prisma", level: 67 },
      { name: "MySQL", level: 90 },
    ],
  },
  {
    label: "DevOps & Shell",
    systemId: "SYS_D // DEPLOY_INFRASTRUCTURE",
    icon: Activity,
    color: { r: 122, g: 106, b: 83 }, // Warm Stone
    skills: [
      { name: "Git & Version", level: 93 },
      { name: "Docker Container", level: 80 },
      { name: "Postman Analytics", level: 87 },
      { name: "Vercel Deploy", level: 90 },
      { name: "Linux Bash", level: 98 },
    ],
  },
];

// ── Interactive Skills Spotlight Engine Card ──
function EngineCard({ category, index }) {
  const cardRef = useRef(null);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const [hovered, setHovered] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);

  const { r, g, b } = category.color;
  const Icon = category.icon;

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMouse({ x: -999, y: -999 });
      }}
      className="f1-skills-card"
      style={{ "--accent-r": r, "--accent-g": g, "--accent-b": b }}
    >
      {/* 1. Cyber grid frame */}
      <div className="absolute inset-0 z-10 border border-[var(--border)] rounded-2xl pointer-events-none" />
      <span className="absolute top-0.5 left-2 z-10 font-mono text-[7px] text-[var(--fg-muted)] tracking-widest opacity-40">SYSTEM_INDEX // 0{index + 1}</span>

      {/* 2. Interactive Spotlight tracker */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 0.4 : 0,
          background: `radial-gradient(240px circle at ${mouse.x}px ${mouse.y}px, rgba(${r},${g},${b},0.15) 0%, transparent 75%)`,
        }}
      />

      {/* 3. Specs header */}
      <div className="relative z-10 flex justify-between items-start mb-6 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center bg-[var(--bg)]">
            <Icon size={15} style={{ color: `rgb(${r},${g},${b})` }} />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[var(--fg)]">
              {category.label}
            </h3>
            <span className="font-mono text-[7px] text-[var(--fg-muted)] uppercase tracking-wider block opacity-70">
              {category.systemId}
            </span>
          </div>
        </div>

        {/* Dynamic status stats indicator */}
        <div className="flex flex-col items-end">
          <span className="font-mono text-[9px] text-[var(--accent)] font-bold">CALIBRATED_OK</span>
          <span className="font-mono text-[7px] text-[var(--fg-muted)] tracking-widest uppercase opacity-55">{category.skills.length} nodes</span>
        </div>
      </div>

      {/* 4. Skills Telemetry Progress Output Bars */}
      <div className="relative z-10 flex flex-col gap-4 mb-6">
        {category.skills.map((skill, si) => (
          <div
            key={skill.name}
            className="flex flex-col gap-1"
            onMouseEnter={() => setActiveSkill(skill.name)}
            onMouseLeave={() => setActiveSkill(null)}
          >
            <div className="flex justify-between items-center text-xs">
              <span
                className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 ${activeSkill === skill.name ? "font-bold" : ""}`}
                style={{
                  color: activeSkill === skill.name
                    ? `rgb(${r},${g},${b})`
                    : "var(--fg-muted)",
                }}
              >
                {skill.name}
              </span>
              <AnimatePresence mode="wait">
                {activeSkill === skill.name ? (
                  <motion.span
                    key="pct-indicator"
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    className="font-mono text-[8px] font-bold"
                    style={{ color: `rgb(${r},${g},${b})` }}
                  >
                    WEIGHT_COEFF // {skill.level}%
                  </motion.span>
                ) : (
                  <span className="font-mono text-[8px] text-[var(--fg-muted)] opacity-30">SYS_V_{si}</span>
                )}
              </AnimatePresence>
            </div>

            {/* Glowing calibration track */}
            <div className="h-1.5 w-full rounded bg-[var(--border)] overflow-hidden relative">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: index * 0.05 + si * 0.06, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="h-full origin-left"
                style={{
                  width: `${skill.level}%`,
                  background: `linear-gradient(90deg, rgba(${r},${g},${b},0.4) 0%, rgba(${r},${g},${b},0.9) 100%)`,
                  boxShadow: activeSkill === skill.name ? `0 0 8px rgba(${r},${g},${b},0.6)` : "none"
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 5. Terminal Tag Nodes */}
      <div className="relative z-10 flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)] mt-auto">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="f1-skill-tag font-mono text-[8px] uppercase tracking-widest px-2 py-1 bg-[var(--surface)] border rounded flex items-center gap-1"
          >
            <Check size={8} style={{ color: `rgb(${r},${g},${b})` }} />
            {skill.name}
          </span>
        ))}
      </div>

      <style>{`
        .f1-skills-card {
          position: relative;
          background: var(--bg-card);
          padding: 20px;
          border-radius: 16px;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: border-color 0.3s ease;
        }
        .f1-skills-card:hover {
          border-color: var(--border-strong) !important;
        }

        .f1-skill-tag {
          color: var(--fg-muted);
          border-color: var(--border);
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .f1-skill-tag:hover {
          color: rgb(var(--accent-r), var(--accent-g), var(--accent-b));
          border-color: rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.35);
        }
      `}</style>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export function Skills() {
  return (
    <section id="skills" className="f1-skills-section" aria-label="Skills Calibration Console">

      {/* ── Immersive Grid Telemetry background ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Horizontal gridlines */}
        <div className="absolute inset-x-0 top-[40%] h-[1px] bg-[var(--border)]" />

        {/* Coordinate tick */}
        <span className="absolute top-[40%] right-[4%] text-[8px] font-mono text-[var(--fg-muted)] opacity-30">+ CH_04_S</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="mb-14 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-[0.25em]"
            >
              Engine Calibration // Technical Profiles
            </motion.p>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="f1-skills-heading font-display text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[0.95] text-[var(--fg)]"
          >
            SYSTEM ENGINE <br className="hidden md:block" /> CALIBRATION.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="mt-4 font-sans text-xs text-[var(--fg-muted)] max-w-xl leading-relaxed"
          >
            A modular view of active technology systems, libraries, and frameworks integrated directly into full-stack AI engineering environments.
          </motion.p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <EngineCard key={cat.label} category={cat} index={i} />
          ))}
        </div>

        {/* Dynamic Running Logs footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          viewport={{ once: true }}
          className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--fg-muted)] opacity-35 text-center mt-12"
        >
          // ALL CORE COMPUTATION ENGINES DEPLOYED AND CALIBRATED SUCCESSFULLY
        </motion.p>

      </div>

      <style>{`
        .f1-skills-section {
          position: relative;
          padding: clamp(64px, 8vw, 96px) 0;
          background: var(--bg);
        }

        .f1-skills-heading {
          letter-spacing: -0.03em;
        }
      `}</style>
    </section>
  );
}