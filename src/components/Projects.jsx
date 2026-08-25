"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { ArrowUpRight, Github, Activity, TrendingDown, Layers, Terminal } from "lucide-react";
import { LinkPreview } from "../components/ui/LinkPreview";

const projects = [
  {
    number: "01",
    title: "ProcureGenie Local LLM",
    description: "A local LLM-powered procurement assistant that streamlines vendor discovery, RFQ generation, and supplier evaluation using open-source models like Llama 3 and Mistral.",
    tech: ["Next.js", "Ollama", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/divydoesnotcode/ProcureGenie-Local-LLM",
    year: "2026",
    color: { r: 217, g: 119, b: 6 }, // Amber
    metrics: [
      { label: "MODEL", val: "Llama-3-8B" },
      { label: "ACCURACY", val: "98.4%" },
      { label: "LATENCY", val: "<140ms" }
    ],
    // SVG mock training loss curve coordinates
    curve: [90, 75, 45, 30, 22, 14, 10, 8]
  },
  {
    number: "02",
    title: "Weather App",
    description: "A sleek, modern weather application built with React and Tailwind CSS. It fetches real-time weather data for any city worldwide using the OpenWeatherMap API and displays it in a beautiful, user-friendly interface.",
    tech: ["React", "Tailwind CSS", "OpenWeatherMap API"],
    github: "https://github.com/divydoesnotcode/Weather-app",
    year: "2025",
    color: { r: 67, g: 90, b: 72 }, // Sage Green
    metrics: [
      { label: "API_GATEWAY", val: "OpenWeather" },
      { label: "UPTIME", val: "99.9%" },
      { label: "LATENCY", val: "<80ms" }
    ],
    // SVG mock weather prediction validation error curve coordinates
    curve: [80, 68, 52, 41, 33, 27, 24, 23]
  },
  {
    number: "03",
    title: "DJ Rohan - FreeLance",
    description: "A professional DJ website built with Next.js and Tailwind CSS. It features a sleek, modern design with smooth animations and a user-friendly interface. It also includes a contact form and a gallery of DJ setups.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Python"],
    github: "https://github.com/divydoesnotcode/djrohan-portfolio",
    year: "2026",
    color: { r: 110, g: 87, b: 115 }, // Muted Purple
    metrics: [
      { label: "CORE", val: "Next.js + Framer" },
      { label: "SEO_SCORE", val: "100%" },
      { label: "PERF", val: "98/100" }
    ],
    // SVG mock audio compression/loss curve coordinates
    curve: [95, 80, 60, 48, 38, 29, 21, 15]
  },
  {
    number: "04",
    title: "Personal Portfolio",
    description: "First personal portfolio built with React and Framer Motion. Where it all started. A highly interactive React portfolio designed to demonstrate real-world UI thinking and clean component architecture",
    tech: ["React", "Framer", "Tailwind", "Motion", "GSAP"],
    github: "https://github.com/divydoesnotcode/My-portfolio",
    vercel: "https://divydoesnotcode-portfolio-livid-beta.vercel.app/",
    year: "2024",
    color: { r: 122, g: 106, b: 83 }, // Warm Stone
    metrics: [
      { label: "RENDER_RATE", val: "60.0 FPS" },
      { label: "DOM_REDUCTION", val: "-35%" },
      { label: "CWV", val: "EXCELLENT" }
    ],
    // SVG mock frame optimization render-time drop coordinates
    curve: [75, 60, 40, 25, 18, 12, 9, 7]
  },
];

// ── Interactive Telemetry Grid Card ──
function TelemetryCard({ project, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position for specular highlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smooth the highlight position
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // 3-D tilt — subtle, F1 HUD-style
  const rotateX = useTransform(springY, [-0.5, 0.5], [2.5, -2.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  const { r, g, b } = project.color;
  const accent = `rgba(${r},${g},${b},`;

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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
        "--accent-r": r,
        "--accent-g": g,
        "--accent-b": b,
      }}
      className="f1-proj-card"
    >
      {/* 1. Ambient telemetry glow behind card */}
      <div
        className="absolute inset-[-12px] rounded-[32px] pointer-events-none z-0 blur-[24px] transition-opacity duration-500"
        style={{
          opacity: hovered ? 0.3 : 0.1,
          background: `radial-gradient(ellipse at center, ${accent}0.15) 0%, ${accent}0.02) 65%, transparent 100%)`,
        }}
      />

      {/* 2. Cyber grid surface frame */}
      <div className="absolute inset-0 z-10 border border-[var(--border)] rounded-2xl pointer-events-none" />
      <span className="absolute top-0.5 left-2 z-10 font-mono text-[7px] text-[var(--fg-muted)] tracking-widest opacity-40">GRID_SEC // 0{index + 1}</span>

      {/* 3. Specs/Metrics Dashboard Header */}
      <div className="relative z-20 flex justify-between items-start mb-6 border-b border-[var(--border)] pb-4">
        <div>
          <span className="font-display text-[clamp(1.8rem,3.5vw,2.4rem)] font-black text-transparent" style={{ WebkitTextStroke: "1px var(--border-strong)" }}>
            {project.number}
          </span>
          <div className="flex gap-1.5 mt-1">
            {project.tech.slice(0, 2).map((t) => (
              <span key={t} className="font-mono text-[8px] text-[var(--accent)] bg-[var(--accent-muted)] px-1.5 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Telemetry Graph - Loss Curve */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 font-mono text-[8px] text-[var(--fg-muted)] uppercase tracking-wider">
            <TrendingDown size={10} className="text-[var(--accent)]" />
            <span>Loss Curve</span>
          </div>
          <svg className="w-20 h-8 opacity-65" viewBox="0 0 100 40">
            <path
              d={`M 5,${project.curve[0] / 2.5} 
                  C 20,${project.curve[2] / 2.5} 40,${project.curve[4] / 2.5} 60,${project.curve[5] / 2.5} 
                  L 95,${project.curve[7] / 2.5}`}
              fill="none"
              stroke={`rgba(${r},${g},${b},0.8)`}
              strokeWidth="1.5"
              className="f1-curve-path"
              style={{ strokeDasharray: 200, strokeDashoffset: hovered ? 0 : 200, transition: "stroke-dashoffset 1.8s ease" }}
            />
            {/* Pulsing cursor point at curve end */}
            <circle cx="95" cy={project.curve[7] / 2.5} r="2" fill={`rgb(${r},${g},${b})`} className="animate-pulse" />
          </svg>
        </div>
      </div>

      {/* 4. Display Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-extrabold text-lg text-[var(--fg)] mb-2 leading-snug">
            {project.title}
          </h3>
          <p className="font-sans text-xs text-[var(--fg-muted)] leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Telemetry metrics dashboard block */}
        <div className="grid grid-cols-3 gap-2 border-t border-[var(--border)] pt-4 mb-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <span className="font-mono text-[7px] text-[var(--fg-muted)] uppercase tracking-widest opacity-60 mb-0.5">{m.label}</span>
              <span className="font-mono text-[10px] font-bold text-[var(--fg)] tracking-wide">{m.val}</span>
            </div>
          ))}
        </div>

        {/* 5. Footer and Link preview anchors */}
        <div className="flex justify-between items-center border-t border-[var(--border)] pt-3 mt-auto">
          <span className="font-mono text-[9px] text-[var(--fg-muted)] uppercase tracking-wider">{project.year} // SYSTEM ACTIVE</span>
          
          <div className="flex gap-2">
            {project.github && (
              <LinkPreview url={project.github} width={220} height={138} className="f1-action-btn" aria-label="View Github Code">
                <Github size={14} />
              </LinkPreview>
            )}
            {project.vercel && (
              <LinkPreview url={project.vercel} width={220} height={138} className="f1-action-btn" aria-label="Launch Live View">
                <ArrowUpRight size={14} />
              </LinkPreview>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .f1-proj-card {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          min-height: 360px;
          display: flex;
          flex-direction: column;
          cursor: crosshair;
          transition: border-color 0.3s ease, box-shadow 0.35s ease;
          overflow: hidden;
        }
        .f1-proj-card:hover {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-card);
        }

        .f1-action-btn {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: var(--bg);
          border: 1px solid var(--border);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--fg-muted);
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .f1-action-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
          transform: translateY(-1.5px);
          background: var(--accent-muted);
        }

        .f1-curve-path {
          will-change: stroke-dashoffset;
        }
      `}</style>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export function Projects() {
  return (
    <section id="projects" className="f1-projects-section" aria-label="Featured Projects Dashboard">
      
      {/* ── Immersive Grid Telemetry background ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Horizontal gridlines */}
        <div className="absolute inset-x-0 top-[30%] h-[1px] bg-[var(--border)]" />
        
        {/* Coordinate tick */}
        <span className="absolute top-[30%] left-[4%] text-[8px] font-mono text-[var(--fg-muted)] opacity-30">+ CH_03_P</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="f1-projects-header mb-14 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-[0.25em]"
            >
              System Grid Position // Selected Case Studies
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="f1-projects-heading font-display text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[0.95] text-[var(--fg)]"
            >
              FEATURED <br className="hidden md:block" /> PROJECTS.
            </motion.h2>

            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              viewport={{ once: true }}
              href="https://github.com/divydoesnotcode"
              target="_blank"
              rel="noopener noreferrer"
              className="f1-archive-link"
            >
              <Terminal size={12} className="inline mr-2 text-[var(--accent)]" />
              Launch Full Repository Archive →
            </motion.a>
          </div>
        </div>

        {/* Analytics Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <TelemetryCard key={project.number} project={project} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        .f1-projects-section {
          position: relative;
          padding: clamp(64px, 8vw, 96px) 0;
          background: var(--bg);
        }

        .f1-projects-heading {
          letter-spacing: -0.03em;
        }

        .f1-archive-link {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--fg-muted);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          padding-bottom: 4px;
          transition: all 0.22s ease;
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
        }
        .f1-archive-link:hover {
          color: var(--accent);
          border-color: var(--accent);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}