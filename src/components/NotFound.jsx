import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { SmoothCursorDemo } from "./ui/SmoothCursor";

function isPointerDevice() {
  if (typeof window === "undefined") return false;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  return hasFinePointer && !isMobile;
}

// Glitchy animated "404" number with scan lines
function GlitchNumber() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 180);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="nf-glitch-wrap" aria-hidden="true">
      <span className={`nf-big-num ${glitch ? "nf-glitching" : ""}`}>404</span>
      {glitch && (
        <>
          <span className="nf-glitch-clone nf-gc-1">404</span>
          <span className="nf-glitch-clone nf-gc-2">404</span>
        </>
      )}
    </div>
  );
}

// Floating particle dots
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    dur: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    color: i % 3 === 0
      ? "rgba(180,83,9,0.35)"
      : i % 3 === 1
        ? "rgba(110,87,115,0.25)"
        : "rgba(67,90,72,0.25)",
  }));

  return (
    <div className="nf-particles" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="nf-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.4, 0.9, 0.5, 0.8, 0.4],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Magnetic button effect
function MagneticButton({ children, href, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.22);
    y.set((e.clientY - cy) * 0.22);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      className="nf-mag-btn"
    >
      {children}
    </motion.a>
  );
}

// Terminal-style console log lines
const CONSOLE_LINES = [
  { delay: 0.2,  text: "→ Checking route registry...",       color: "var(--fg-muted)" },
  { delay: 0.7,  text: "✗ Route not found in manifest",      color: "#c0392b" },
  { delay: 1.1,  text: "→ Searching fallback routes...",      color: "var(--fg-muted)" },
  { delay: 1.6,  text: "✗ No fallback matched",               color: "#c0392b" },
  { delay: 2.1,  text: "→ Dispatching 404 handler...",        color: "var(--fg-muted)" },
  { delay: 2.6,  text: "✓ Rendering error boundary",          color: "#27ae60" },
];

function MiniConsole() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    CONSOLE_LINES.forEach((line, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), line.delay * 1000);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <div className="nf-console">
      <div className="nf-console-bar">
        <span className="nf-dot" style={{ background: "#ff5f56" }} />
        <span className="nf-dot" style={{ background: "#ffbd2e" }} />
        <span className="nf-dot" style={{ background: "#27c93f" }} />
        <span className="nf-console-title">error.log</span>
      </div>
      <div className="nf-console-body">
        {CONSOLE_LINES.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="nf-console-line"
            style={{ color: line.color }}
          >
            <span className="nf-console-prompt">$</span> {line.text}
          </motion.div>
        ))}
        {visibleCount < CONSOLE_LINES.length && (
          <div className="nf-cursor-line">
            <span className="nf-console-prompt">$</span>
            <span className="nf-blink-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

export function NotFound() {
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const update = () => setHasFinePointer(isPointerDevice());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleHome = (e) => {
    e.preventDefault();
    // Works with react-router or plain navigation
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="nf-root">
      {hasFinePointer && <SmoothCursorDemo />}
      <Particles />

      {/* Ambient glows */}
      <div className="nf-glow nf-glow-1" />
      <div className="nf-glow nf-glow-2" />

      {/* Top bar — matches portfolio nav */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="nf-topbar"
      >
        <span className="nf-topbar-tag">Portfolio · 2026</span>
        <a href="/" className="nf-topbar-logo">DB</a>
      </motion.div>

      {/* Main content */}
      <div className="nf-center">

        {/* Big 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlitchNumber />
        </motion.div>

        {/* Divider line with label */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="nf-divider"
        >
          <span className="nf-divider-label">Page Not Found</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="nf-heading-wrap"
        >
          <h1 className="nf-heading">
            You've wandered
          </h1>
          <h1 className="nf-heading nf-heading-outline">
            off the map.
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="nf-sub"
        >
          The page you're looking for doesn't exist — it may have been moved,
          deleted, or never existed in the first place.
        </motion.p>

        {/* Mini console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <MiniConsole />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="nf-actions"
        >
          <MagneticButton href="/" onClick={handleHome}>
            ← Take me home
          </MagneticButton>
        </motion.div>

        {/* Fun footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="nf-footnote"
        >
          Error code 404 · HTTP/1.1 · {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </motion.p>
      </div>

      <style>{`
        /* ── Root ── */
        .nf-root {
          min-height: 100svh;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* ── Ambient glows ── */
        .nf-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(90px);
          z-index: 0;
        }
        .nf-glow-1 {
          width: 600px; height: 600px;
          top: -15%; left: -10%;
          background: radial-gradient(circle, rgba(180,83,9,0.07) 0%, transparent 70%);
          animation: glowFloat1 12s ease-in-out infinite;
        }
        .nf-glow-2 {
          width: 500px; height: 500px;
          bottom: -10%; right: -5%;
          background: radial-gradient(circle, rgba(110,87,115,0.06) 0%, transparent 70%);
          animation: glowFloat2 16s ease-in-out infinite;
        }
        @keyframes glowFloat1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50%       { transform: translateY(40px) translateX(20px); }
        }
        @keyframes glowFloat2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50%       { transform: translateY(-30px) translateX(-20px); }
        }

        /* ── Particles ── */
        .nf-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .nf-particle {
          position: absolute;
          border-radius: 50%;
        }

        /* ── Top bar ── */
        .nf-topbar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(14px,2.5vw,22px) clamp(20px,5vw,48px);
          flex-shrink: 0;
        }
        .nf-topbar-tag {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--fg-muted);
          opacity: 0.65;
        }
        .nf-topbar-logo {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: var(--fg);
          text-decoration: none;
          letter-spacing: -0.02em;
          transition: color 0.22s;
        }
        .nf-topbar-logo:hover { color: var(--accent); }

        /* ── Center ── */
        .nf-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(20px,4vw,60px) clamp(16px,5vw,48px) clamp(40px,6vh,80px);
          text-align: center;
          position: relative;
          z-index: 5;
          gap: clamp(18px,2.5vh,28px);
        }

        /* ── Glitch 404 ── */
        .nf-glitch-wrap {
          position: relative;
          display: inline-block;
          line-height: 1;
        }
        .nf-big-num {
          font-family: var(--font-display);
          font-size: clamp(7rem, 22vw, 18rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: clamp(1.5px, 0.2vw, 3px) rgba(26,22,16,0.18);
          display: block;
          user-select: none;
          position: relative;
          z-index: 2;
        }
        .nf-glitch-clone {
          position: absolute;
          inset: 0;
          font-family: var(--font-display);
          font-size: clamp(7rem, 22vw, 18rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          display: block;
          user-select: none;
        }
        .nf-gc-1 {
          color: rgba(180,83,9,0.55);
          transform: translate(-3px, -2px) skewX(-1deg);
          clip-path: polygon(0 15%, 100% 15%, 100% 40%, 0 40%);
          animation: glitchShift1 0.18s steps(2) forwards;
        }
        .nf-gc-2 {
          color: rgba(110,87,115,0.45);
          transform: translate(3px, 2px) skewX(1deg);
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
          animation: glitchShift2 0.18s steps(2) forwards;
        }
        .nf-glitching {
          animation: glitchMain 0.18s steps(3) forwards;
        }
        @keyframes glitchMain {
          0%   { transform: translate(0); }
          25%  { transform: translate(-2px, 1px); }
          50%  { transform: translate(2px, -1px); }
          75%  { transform: translate(-1px, 2px); }
          100% { transform: translate(0); }
        }
        @keyframes glitchShift1 {
          0%   { transform: translate(-3px,-2px) skewX(-1deg); opacity: 1; }
          100% { transform: translate(-6px, 0)  skewX(-2deg); opacity: 0; }
        }
        @keyframes glitchShift2 {
          0%   { transform: translate(3px,2px) skewX(1deg); opacity: 1; }
          100% { transform: translate(5px,0)   skewX(2deg); opacity: 0; }
        }

        /* ── Divider ── */
        .nf-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          width: min(500px, 90vw);
          transform-origin: left;
        }
        .nf-divider::before, .nf-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border-strong);
        }
        .nf-divider-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent);
          white-space: nowrap;
          font-weight: 600;
        }

        /* ── Heading ── */
        .nf-heading-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .nf-heading {
          font-family: var(--font-display);
          font-size: clamp(2rem, 6vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.0;
          color: var(--fg);
          margin: 0;
        }
        .nf-heading-outline {
          color: transparent;
          -webkit-text-stroke: clamp(1.2px, 0.16vw, 2.5px) rgba(26,22,16,0.28);
        }

        /* ── Subtext ── */
        .nf-sub {
          font-family: var(--font-body);
          font-size: clamp(13px, 1.3vw, 16px);
          color: var(--fg-muted);
          max-width: 440px;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Mini Console ── */
        .nf-console {
          width: min(460px, 92vw);
          border-radius: 14px;
          border: 1px solid var(--border-strong);
          background: rgba(245, 240, 232, 0.7);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          backdrop-filter: blur(12px);
        }
        .nf-console-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 14px;
          background: var(--bg-card);
          border-bottom: 1px solid var(--border);
        }
        .nf-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
        .nf-console-title {
          font-family: var(--font-body);
          font-size: 11px;
          color: var(--fg-muted);
          margin-left: 6px;
          letter-spacing: 0.08em;
        }
        .nf-console-body {
          padding: 14px 16px;
          font-family: 'Courier New', monospace;
          font-size: clamp(10px, 1.1vw, 12px);
          line-height: 1.9;
          min-height: 120px;
        }
        .nf-console-line {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nf-console-prompt {
          color: var(--accent);
          font-weight: bold;
          flex-shrink: 0;
        }
        .nf-cursor-line {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nf-blink-cursor {
          display: inline-block;
          width: 8px;
          height: 14px;
          background: var(--accent);
          animation: blinkCursor 1s step-end infinite;
          border-radius: 1px;
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ── CTA buttons ── */
        .nf-actions {
          display: flex;
          gap: clamp(10px, 2vw, 18px);
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }
        .nf-mag-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: clamp(12px,1.5vw,15px) clamp(22px,3.5vw,40px);
          background: var(--fg);
          color: var(--bg);
          border-radius: 100px;
          font-family: var(--font-display);
          font-size: clamp(12px,1.1vw,14px);
          font-weight: 700;
          letter-spacing: 0.05em;
          text-decoration: none;
          transition: background 0.25s ease, box-shadow 0.3s ease, color 0.25s;
          white-space: nowrap;
          min-height: 44px;
        }
        .nf-mag-btn:hover {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 8px 28px rgba(180,83,9,0.28);
        }
        .nf-mag-btn + .nf-mag-btn {
          background: transparent;
          color: var(--fg-muted);
          border: 1px solid var(--border-strong);
        }
        .nf-mag-btn + .nf-mag-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: transparent;
          box-shadow: none;
        }

        /* ── Footnote ── */
        .nf-footnote {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          color: var(--fg-muted);
          opacity: 0.4;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0;
        }

        /* ── Mobile tweaks ── */
        @media (max-width: 480px) {
          .nf-big-num { font-size: clamp(6rem, 30vw, 9rem); }
          .nf-heading  { font-size: clamp(1.7rem, 7vw, 2.5rem); }
          .nf-mag-btn  { width: 100%; max-width: 280px; }
          .nf-actions  { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}