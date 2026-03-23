import { motion } from "motion/react";

const experiences = [
  {
    index: "01",
    title: "Full Stack Developer",
    company: "Tech Innovators Inc.",
    date: "2024 — Present",
    type: "Work",
    color: "text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/20",
    glowColor: "rgba(59,130,246,0.12)",
    description: "Developing and maintaining complex web applications using React, Node.js, and PostgreSQL. Focused on performance optimization and scalable architecture.",
    highlights: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    index: "02",
    title: "Frontend Engineer Intern",
    company: "Creative Design Agency",
    date: "2023 — 2024",
    type: "Work",
    color: "text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/20",
    glowColor: "rgba(139,92,246,0.12)",
    description: "Built responsive and interactive user interfaces for various client projects. Collaborated closely with designers to ensure pixel-perfect implementation.",
    highlights: ["Next.js", "Figma", "Tailwind CSS", "Motion"],
  },
  {
    index: "03",
    title: "Computer Science",
    company: "University of Technology",
    date: "2020 — 2024",
    type: "Education",
    color: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
    glowColor: "rgba(16,185,129,0.12)",
    description: "Graduated with honors. Coursework included Data Structures, Algorithms, Web Development, and Database Management Systems.",
    highlights: ["DSA", "System Design", "Web Dev", "DBMS"],
  },
];

function ExperienceCard({ exp, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      // Mobile: single column. Desktop: two-column grid
      className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-3 md:gap-8"
    >
      {/* Left meta — on mobile sits above card */}
      <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 md:pt-1 flex-row justify-between">
        <span className="text-white/12 text-2xl md:text-3xl font-extrabold leading-none order-1 md:order-none"
          style={{ fontFamily: "var(--font-display)" }}>
          {exp.index}
        </span>
        <span className={`text-xs px-2.5 py-1 rounded-full border ${exp.accentBorder} ${exp.accentBg} ${exp.color} font-medium flex-shrink-0`}>
          {exp.type}
        </span>
        <p className={`text-xs hidden md:block ${exp.color} opacity-60 mt-1`}>{exp.date}</p>
      </div>

      {/* Card */}
      <div className="relative p-5 sm:p-6 rounded-2xl border border-white/6 bg-white/[0.018] hover:border-white/10 hover:bg-white/[0.028] transition-all duration-300 overflow-hidden">
        {/* Corner glow */}
        <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-[60px] pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${exp.glowColor}, transparent)` }} />

        {/* Date — visible on mobile inside card */}
        <p className={`text-xs mb-1 md:hidden ${exp.color} opacity-60`}>{exp.date}</p>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
          {exp.title}
        </h3>
        <p className={`text-sm font-medium mb-3 sm:mb-4 ${exp.color}`}>{exp.company}</p>
        <p className="text-white/45 text-sm leading-relaxed mb-4">{exp.description}</p>

        <div className="flex flex-wrap gap-2">
          {exp.highlights.map(h => (
            <span key={h} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-white/38 border border-white/5">
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-blue-500 text-xs uppercase tracking-[0.28em] mb-2">
        The Journey
      </motion.p>
      <motion.h2 
            initial={{ opacity: 0, y: 14 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }}
            style={{ fontFamily: "var(--font-display)" }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-7"
          >
            Experience & <br className="hidden md:block" /> Education.
          </motion.h2>

      <div className="flex flex-col gap-6 sm:gap-8">
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.index} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}