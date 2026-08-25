"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Cpu, Terminal, Compass } from "lucide-react";

// Ticker logs to simulate real-time AI training parameters (telemetry data)
const SYSTEM_LOGS = [
  "SYS_STATUS // ACTIVE",
  "MODEL_PARAMS // LLAMA-3-70B-INSTRUCT",
  "COMPUTE_ENG // A100-SXM4-80GB",
  "TRAINING_LOSS // 0.8421",
  "PRECISION // FP16_AMP",
  "TEMP // 64°C",
  "LATENCY // 14.8ms",
  "EMBEDDINGS_DIM // 8192",
  "LEARNING_RATE // 1e-4",
  "ATTENTION_HEADS // 64"
];

export function Hero() {
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();

  // Detect touch/mobile to skip scroll-based parallax (avoids jank)
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window
    );
  }, []);

  // Parallax effects — only applied on pointer devices
  const textY = useTransform(scrollY, [0, 800], [0, isTouchDevice ? 0 : -80]);
  const bgY = useTransform(scrollY, [0, 800], [0, isTouchDevice ? 0 : 40]);

  const [logIndex, setLogIndex] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Rotate simulator stats
  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % SYSTEM_LOGS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Track mouse coordinates for interactive grid target crosshairs (desktop only)
  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(targetId, {
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const element = document.getElementById(targetId.replace("#", ""));
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="hero-root"
      aria-label="Engine Room Intro"
    >
      {/* ── Immersive Kinetic Grid System ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Horizontal gridlines */}
        <div className="absolute inset-x-0 top-[20%] h-[1px] bg-[var(--border)]" />
        <div className="absolute inset-x-0 top-[50%] h-[1px] bg-[var(--border-strong)] opacity-60" />
        <div className="absolute inset-x-0 top-[80%] h-[1px] bg-[var(--border)]" />

        {/* Vertical gridlines */}
        <div className="absolute inset-y-0 left-[20%] w-[1px] bg-[var(--border)]" />
        <div className="absolute inset-y-0 left-[50%] w-[1px] bg-[var(--border-strong)] opacity-60" />
        <div className="absolute inset-y-0 left-[80%] w-[1px] bg-[var(--border)]" />

        {/* Intersection "+" coordinate crosshairs */}
        <span className="absolute top-[20%] left-[20%] translate-x-[-50%] translate-y-[-50%] text-[10px] text-[var(--fg-muted)] opacity-50 font-mono">+</span>
        <span className="absolute top-[20%] left-[80%] translate-x-[-50%] translate-y-[-50%] text-[10px] text-[var(--fg-muted)] opacity-50 font-mono">+</span>
        <span className="absolute top-[80%] left-[20%] translate-x-[-50%] translate-y-[-50%] text-[10px] text-[var(--fg-muted)] opacity-50 font-mono">+</span>
        <span className="absolute top-[80%] left-[80%] translate-x-[-50%] translate-y-[-50%] text-[10px] text-[var(--fg-muted)] opacity-50 font-mono">+</span>

        {/* Cursor crosshair highlights */}
        <div
          className="absolute hidden md:block w-24 h-24 border border-dashed rounded-full pointer-events-none opacity-20 border-[var(--accent)] translate-x-[-50%] translate-y-[-50%] transition-all duration-75"
          style={{ left: coords.x, top: coords.y }}
        />
        <div
          className="absolute hidden md:block w-px h-screen bg-[var(--accent)] opacity-[0.04] pointer-events-none translate-x-[-50%]"
          style={{ left: coords.x }}
        />
        <div
          className="absolute hidden md:block h-px w-screen bg-[var(--accent)] opacity-[0.04] pointer-events-none translate-y-[-50%]"
          style={{ top: coords.y }}
        />
      </div>

      {/* ── Ambient Glow Lighting Chassis ── */}
      <motion.div
        style={isTouchDevice ? {} : { y: bgY }}
        className="absolute top-[30%] left-[50%] translate-x-[-50%] w-[80vw] h-[40vh] bg-gradient-to-r from-[var(--accent-muted)] to-transparent blur-[140px] opacity-40 pointer-events-none z-0"
      />

      {/* ── Left Telemetry Nav HUD Panel ── */}
      <div className="hero-side-hud hidden xl:flex">
        <div className="flex flex-col gap-10 items-center justify-between h-full py-8 border-r border-[var(--border)]">
          <div className="flex flex-col gap-8 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--fg-muted)] rotate-[-90deg]">
            <span className="text-[var(--accent)]">ACTIVE SCAN // ON</span>
          </div>

          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
        </div>
      </div>

      {/* ── Central High-Octane Display Panel ── */}
      <motion.div
        style={isTouchDevice ? {} : { y: textY }}
        className="hero-center-panel z-10"
      >
        {/* Dynamic telemetry scanning ticker */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[10px] font-mono text-[var(--fg-muted)] tracking-wider">
            <Cpu size={12} className="text-[var(--accent)] animate-spin-slow" />
            <AnimatePresence mode="wait">
              <motion.span
                key={logIndex}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 0.9 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {SYSTEM_LOGS[logIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-[9px] font-mono text-[var(--accent)] uppercase tracking-widest animate-pulse">Telemetry Online</span>
        </div>

        {/* Cinematic Hollow Outline Headers */}
        <div className="name-block leading-[0.82] select-none">
          <div className="overflow-hidden py-1">
            <motion.h1
              initial={{ y: "105%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,14vw,11.5rem)] font-display font-normal tracking-[0.03em] text-[var(--fg)]"
            >
              DIVY
            </motion.h1>
          </div>
          <div className="overflow-hidden py-1 mt-1">
            <motion.h1
              initial={{ y: "105%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,14vw,11.5rem)] font-display font-normal tracking-[0.03em] text-[var(--fg)]"
            >
              BAROT
            </motion.h1>
          </div>
        </div>

        {/* Role & Engineering Credibility Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 max-w-xl mx-auto text-sm sm:text-base font-normal tracking-wide text-[var(--fg-muted)] leading-relaxed font-sans"
        >
          AI &amp; Machine Learning Engineer specializing in designing context-engineered LLMs,
          open-source orchestration architectures, and robust full-stack software systems.
        </motion.p>

        {/* HUD Interactive Trigger Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-wrap gap-4 items-center justify-center w-full"
        >
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, "#projects")}
            className="hud-btn-primary"
          >
            <Compass size={14} className="mr-2" />
            Engage Grid
          </a>
        </motion.div>
      </motion.div>

      {/* ── Running Ticker Base Overlay ── */}
      <div className="hero-ticker-footer border-t border-[var(--border)] overflow-hidden pointer-events-none">
        <div className="flex whitespace-nowrap animate-marquee font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--fg-muted)] opacity-40">
          {Array.from({ length: 4 }).map((_, idx) => (
            <span key={idx} className="inline-flex items-center gap-12 px-6 py-3.5">
              <span>● AI_AGENTS</span>
              <span>● FULL-STACK_ENGINEERING</span>
              <span>● AI_AUTOMATION</span>
              <span>● CONTEXT_ENGINEERING</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        /* Use svh (small viewport height) so the hero fills the visible
           area on mobile even when the browser chrome is visible.
           Falls back through dvh → 100vh for older browsers. */
        .hero-root {
          position: relative;
          height: 100vh;
          height: 100svh;
          min-height: 640px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          overflow: hidden;
          /* Extra top padding on mobile to clear the navbar */
          padding: clamp(70px, 10vh, 100px) clamp(16px, 5vw, 48px) 0;
        }

        /* ── Mobile-specific hero overrides ── */
        @media (max-width: 767px) {
          .hero-root {
            /* Push content down so it centres in the visible area */
            padding-top: 80px;
            /* Allow the section to grow if content overflows */
            height: auto;
            min-height: 100svh;
          }

          .hero-center-panel {
            width: 100%;
            max-width: 100%;
            padding-bottom: 60px;
          }
        }

        /* Beat the global mobile h1 cap so the name stays display-scale */
        @media (max-width: 768px) {
          .name-block {
            width: 100%;
          }

          .name-block h1 {
            font-size: clamp(3.75rem, 20vw, 6.5rem);
            letter-spacing: 0.02em;
            line-height: 0.84;
            white-space: nowrap;
            max-width: 100%;
          }
        }

        .hero-side-hud {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 10;
        }

        .hero-center-panel {
          position: relative;
          text-align: center;
          max-width: 58rem;
          /* GPU-promote this layer so CSS transforms are composited */
          will-change: transform;
        }

        .name-block h1 {
          margin: 0;
          line-height: 0.82;
          /* GPU layer for entrance animation */
          will-change: transform, opacity;
        }

        .hud-btn-primary {
          padding: 12px 28px;
          background: var(--fg);
          color: var(--bg);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          font-family: var(--font-body);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--fg);
          /* Ensure touch target is comfortably tappable */
          min-height: 48px;
        }
        .hud-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px var(--accent-muted);
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
        .hud-btn-primary:active { transform: translateY(0); }

        .hud-btn-secondary {
          padding: 12px 28px;
          background: transparent;
          color: var(--fg-muted);
          border: 1px solid var(--border-strong);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          font-family: var(--font-body);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          /* Ensure touch target is comfortably tappable */
          min-height: 48px;
        }
        .hud-btn-secondary:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-2px);
          background: var(--accent-muted);
        }
        .hud-btn-secondary:active { transform: translateY(0); }

        .hero-ticker-footer {
          position: absolute;
          bottom: 0;
          inset-x: 0;
          z-index: 5;
        }

        /* Full-width seamless marquee: duplicate content so the
           -50% translate lands exactly back at start */
        @keyframes marquee-ticker {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .animate-marquee {
          animation: marquee-ticker 28s linear infinite;
          /* GPU compositing so marquee doesn't block main thread */
          will-change: transform;
        }

        /* Respect user preference for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee,
          .animate-spin-slow {
            animation: none;
          }
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}