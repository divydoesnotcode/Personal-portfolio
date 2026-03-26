import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const skillCategories = [
  {
    label: "Frontend",
    icon: "◈",
    accent: { r: 180, g: 83, b: 9 }, // Matching --accent (Amber/Terracotta)
    accentCss: "rgba(180,83,9,",
    borderActive: "rgba(180,83,9,0.3)",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 75 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    label: "Backend",
    icon: "◉",
    accent: { r: 67, g: 90, b: 72 }, // Muted Sage/Olive
    accentCss: "rgba(67,90,72,",
    borderActive: "rgba(67,90,72,0.3)",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 88 },
      { name: "REST APIs", level: 92 },
      { name: "GraphQL", level: 52 },
      { name: "API Handling", level: 85 },
    ],
  },
  {
    label: "Database",
    icon: "◬",
    accent: { r: 110, g: 87, b: 115 }, // Muted Plum/Dusty Purple
    accentCss: "rgba(110,87,115,",
    borderActive: "rgba(110,87,115,0.3)",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 82 },
      { name: "Redis", level: 75 },
      { name: "Prisma", level: 67 },
      { name: "MySQL", level: 90 },
    ],
  },
  {
    label: "Tools & DevOps",
    icon: "◎",
    accent: { r: 122, g: 106, b: 83 }, // Warm Stone/Taupe
    accentCss: "rgba(122,106,83,",
    borderActive: "rgba(122,106,83,0.3)",
    skills: [
      { name: "Git", level: 93 },
      { name: "Docker", level: 80 },
      { name: "Postman", level: 87 },
      { name: "Vercel", level: 90 },
      { name: "Linux", level: 98 },
    ],
  },
];

function SpotlightCard({ category, index }) {
  const cardRef = useRef(null);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const [hovered, setHovered] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);

  const { r, g, b } = category.accent;

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
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: -999, y: -999 }); }}
      className="sk-card"
      style={{ borderColor: hovered ? category.borderActive : undefined }}
    >
      {/* ── LIQUID GLASS BACKGROUND LAYERS ── */}

      {/* 1. Ambient tint glow — bleeds outside, color-tinted per card */}
      <div
        className="sk-gl-ambient"
        style={{
          opacity: hovered ? 1 : 0.4,
          background: `radial-gradient(ellipse at 65% 30%, rgba(${r},${g},${b},0.18) 0%, rgba(${r},${g},${b},0.04) 60%, transparent 100%)`,
        }}
      />

      {/* 2. Frosted glass surface */}
      <div className="sk-gl-frost" />

      {/* 3. Cursor-following spotlight (original behaviour, preserved) */}
      <div
        className="sk-gl-spotlight"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${mouse.x}px ${mouse.y}px, rgba(${r},${g},${b},0.13) 0%, transparent 70%)`,
        }}
      />

      {/* 4. Top rim light — Soft highlight for light mode */}
      <div className="sk-gl-rim" style={{ background: `linear-gradient(90deg, transparent, rgba(${r},${g},${b},0.3), transparent)` }} />

      {/* ── Original card content (100% unchanged) ── */}

      {/* Corner ambient blob */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, rgba(${r},${g},${b},0.22), transparent 70%)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl select-none" style={{ color: `rgba(${r},${g},${b},0.9)` }}>
            {category.icon}
          </span>
          <h3
            className="text-base md:text-lg font-bold tracking-wide"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            {category.label}
          </h3>
        </div>
        <span
          className="text-xs font-mono px-2 py-0.5 rounded-full border"
          style={{
            color: `rgba(${r},${g},${b},0.8)`,
            borderColor: `rgba(${r},${g},${b},0.25)`,
            backgroundColor: `rgba(${r},${g},${b},0.07)`,
          }}
        >
          {category.skills.length} skills
        </span>
      </div>

      {/* Skill bars */}
      <div className="relative z-10 flex flex-col gap-3">
        {category.skills.map((skill, si) => (
          <div
            key={skill.name}
            className="group/skill"
            onMouseEnter={() => setActiveSkill(skill.name)}
            onMouseLeave={() => setActiveSkill(null)}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span
                className="text-xs md:text-sm font-medium transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  color: activeSkill === skill.name
                    ? `rgba(${r},${g},${b},1)`
                    : "var(--fg-muted)",
                }}
              >
                {skill.name}
              </span>
              <AnimatePresence>
                {activeSkill === skill.name && (
                  <motion.span
                    key="pct"
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-mono"
                    style={{ color: `rgba(${r},${g},${b},0.7)` }}
                  >
                    {skill.level}%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Track */}
            <div className="h-[3px] w-full rounded-full bg-stone-900/10 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: index * 0.06 + si * 0.07, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="h-full rounded-full origin-left"
                style={{
                  width: `${skill.level}%`,
                  background: `linear-gradient(90deg, rgba(${r},${g},${b},0.4) 0%, rgba(${r},${g},${b},0.85) 100%)`,
                  boxShadow: activeSkill === skill.name
                    ? `0 0 8px rgba(${r},${g},${b},0.6)`
                    : "none",
                  transition: "box-shadow 0.2s",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Chip tags */}
      <div className="relative z-10 flex flex-wrap gap-2 pt-1 border-t border-stone-900/[0.08]">
        {category.skills.map((skill, si) => (
          <motion.span
            key={skill.name}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 + si * 0.04 }}
            viewport={{ once: true }}
            whileHover={{ y: -2, scale: 1.06 }}
            className="px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider border transition-all duration-200"
            style={{
              color: `rgba(${r},${g},${b},0.75)`,
              borderColor: `rgba(${r},${g},${b},0.15)`,
              backgroundColor: `rgba(${r},${g},${b},0.05)`,
            }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>

      <style>{`
        /* ── Card shell — glass instead of solid zinc ── */
        .sk-card {
          position: relative;
          overflow: hidden;
          border-radius: 1.5rem; /* rounded-3xl */
          border: 1px solid rgba(255,255,255,0.1);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transition: border-color 0.3s ease, box-shadow 0.35s ease;
          box-shadow: var(--shadow-card);
          background: var(--bg-card);
        }
        @media (min-width: 768px) {
          .sk-card { padding: 2rem; }
        }
        .sk-card:hover {
          box-shadow: var(--shadow-card-hover);
        }

        /* 1. Ambient tint */
        .sk-gl-ambient {
          position: absolute;
          inset: -24px;
          pointer-events: none;
          z-index: 0;
          filter: blur(28px);
          transition: opacity 0.4s ease;
          border-radius: 999px;
        }

        /* 2. Frosted glass surface */
        .sk-gl-frost {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: rgba(26,22,16,0.03);
          backdrop-filter: blur(var(--blur-std)) saturate(120%);
          -webkit-backdrop-filter: blur(var(--blur-std)) saturate(120%);
        }

        /* 3. Cursor spotlight */
        .sk-gl-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          transition: opacity 0.3s ease;
        }

        /* 4. Top rim light */
        .sk-gl-rim {
          position: absolute;
          top: 0;
          left: 8%;
          right: 8%;
          height: 1px;
          pointer-events: none;
          z-index: 3;
        }
      `}</style>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto" aria-label="Skills and Technologies">

      {/* Header */}
      <div className="mb-14 md:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-amber-700 text-xs uppercase tracking-[0.3em] mb-4 font-semibold"
          style={{ fontFamily: "var(--font-body)" }}
        >
          What I Work With
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight"
        >
          Skills &amp; <br className="hidden md:block" /> Technologies.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-4 text-sm md:text-base max-w-xl"
          style={{ fontFamily: "var(--font-body)", color: "var(--fg-muted)" }}
        >
          A curated set of tools and technologies I use daily to ship quality products.
        </motion.p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        {skillCategories.map((cat, i) => (
          <SpotlightCard key={cat.label} category={cat} index={i} />
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="text-xs mt-10 text-center tracking-wider opacity-30"
        style={{ fontFamily: "var(--font-body)", color: "var(--fg-muted)" }}
      >
        Always learning · Currently exploring Three.js &amp; WebGL
      </motion.p>
    </section>
  );
}