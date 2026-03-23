import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── Data ────────────────────────────────────────────────────────────────────

const skillCategories = [
  {
    label: "Frontend",
    icon: "◈",
    accent: { r: 59, g: 130, b: 246 },        // blue-500
    accentCss: "rgba(59,130,246,",
    borderActive: "rgba(59,130,246,0.35)",
    skills: [
      { name: "React",         level: 95 },
      { name: "Next.js",       level: 90 },
      { name: "TypeScript",    level: 88 },
      { name: "Tailwind CSS",  level: 92 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    label: "Backend",
    icon: "◉",
    accent: { r: 52, g: 211, b: 153 },         // emerald-400
    accentCss: "rgba(52,211,153,",
    borderActive: "rgba(52,211,153,0.35)",
    skills: [
      { name: "Node.js",    level: 90 },
      { name: "Express",    level: 88 },
      { name: "REST APIs",  level: 92 },
      { name: "GraphQL",    level: 75 },
      { name: "Hono",       level: 70 },
    ],
  },
  {
    label: "Database",
    icon: "◬",
    accent: { r: 167, g: 139, b: 250 },        // violet-400
    accentCss: "rgba(167,139,250,",
    borderActive: "rgba(167,139,250,0.35)",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB",    level: 82 },
      { name: "Redis",      level: 75 },
      { name: "Prisma",     level: 85 },
      { name: "Drizzle",    level: 72 },
    ],
  },
  {
    label: "Tools & DevOps",
    icon: "◎",
    accent: { r: 251, g: 191, b: 36 },         // amber-400
    accentCss: "rgba(251,191,36,",
    borderActive: "rgba(251,191,36,0.35)",
    skills: [
      { name: "Git",            level: 93 },
      { name: "Docker",         level: 80 },
      { name: "GitHub Actions", level: 78 },
      { name: "Vercel",         level: 90 },
      { name: "Linux",          level: 75 },
    ],
  },
];

// ─── Card Spotlight (mouse-following radial glow) ─────────────────────────────

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
      className="relative overflow-hidden rounded-3xl border border-white/8 bg-zinc-950 p-6 md:p-8 flex flex-col gap-6 transition-colors duration-300"
      style={{
        borderColor: hovered ? category.borderActive : undefined,
      }}
    >
      {/* ── Spotlight Glow ── */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${mouse.x}px ${mouse.y}px, rgba(${r},${g},${b},0.13) 0%, transparent 70%)`,
        }}
      />

      {/* ── Corner ambient blob ── */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, rgba(${r},${g},${b},0.22), transparent 70%)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl select-none" style={{ color: `rgba(${r},${g},${b},0.9)` }}>
            {category.icon}
          </span>
          <h3
            className="text-base md:text-lg font-bold tracking-wide text-white/90"
            style={{ fontFamily: "var(--font-display)" }}
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

      {/* ── Skill bars ── */}
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
                    : "rgba(255,255,255,0.65)",
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
            <div className="h-[3px] w-full rounded-full bg-white/[0.06] overflow-hidden">
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

      {/* ── Chip tags ── */}
      <div className="relative z-10 flex flex-wrap gap-2 pt-1 border-t border-white/[0.05]">
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
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-14 md:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-blue-500 text-xs uppercase tracking-[0.3em] mb-4 font-semibold"
          style={{ fontFamily: "var(--font-body)" }}
        >
          What I Work With
        </motion.p>
        <motion.h2 
            initial={{ opacity: 0, y: 14 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }}
            style={{ fontFamily: "var(--font-display)" }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight"
          >
            Skills & <br className="hidden md:block" /> Technologies.
          </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-4 text-white/35 text-sm md:text-base max-w-xl"
          style={{ fontFamily: "var(--font-body)" }}
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
        className="text-white/20 text-xs mt-10 text-center tracking-wider"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Always learning · Currently exploring Three.js & WebGL
      </motion.p>
    </section>
  );
}