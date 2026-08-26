"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Twitter, Mail, Activity, Send } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/divydoesnotcode", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/divy-barot", icon: Linkedin },
  { label: "X / Twitter", href: "https://x.com/divydoesnotcode", icon: Twitter },
  { label: "Email", href: "mailto:workwithdivy@gmail.com", icon: Mail },
];

export function Contact() {
  const [ping, setPing] = useState(12);

  // Simulate training-latency network ping fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.round(10 + Math.random() * 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="f1-contact-section" aria-label="Contact Console">

      {/* ── Visual Telemetry Corner Markers ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Horizontal gridlines */}
        <div className="absolute inset-x-0 top-[15%] h-[1px] bg-[var(--border)]" />
        <div className="absolute inset-x-0 bottom-[15%] h-[1px] bg-[var(--border)]" />

        {/* Intersection coordinates */}
        <span className="absolute top-[15%] left-[5%] text-[8px] font-mono text-[var(--fg-muted)] opacity-30">+ CH_06_A</span>
        <span className="absolute bottom-[15%] right-[5%] text-[8px] font-mono text-[var(--fg-muted)] opacity-30">+ CH_06_B</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Telemetry connection status indicator */}
        {/* <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[10px] font-mono text-[var(--fg-muted)] tracking-wider">
            <Activity size={10} className="text-[var(--accent)]" />
            <span>CONNECTION_PING // {ping}ms</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div> */}

        {/* Big Outlined Headers */}
        <div className="text-center mb-10 select-none">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[clamp(2.2rem,8vw,5.5rem)] font-display font-black leading-[0.9] text-[var(--fg)]"
          >
            LET'S BUILD
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[clamp(2.2rem,8vw,5.5rem)] font-display font-black leading-[0.9] text-[var(--fg)]"
          >
            SOMETHING GREAT.
          </motion.h2>
        </div>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center max-w-lg mx-auto mb-12 text-sm sm:text-base text-[var(--fg-muted)] leading-relaxed font-sans"
        >
          Open to core AI/ML integrations, high-performance web systems orchestration, contract frameworks, or key research initiatives.
        </motion.p>

        {/* Cinematic Dashboard Contact Trigger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="flex justify-center mb-14 px-4"
        >
          <a
            href="mailto:workwithdivy@gmail.com"
            className="f1-mail-btn"
          >
            <Send size={15} className="mr-2.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <span className="hidden sm:inline">workwithdivy@gmail.com</span>
            <span className="sm:hidden">Send Mail</span>
          </a>
        </motion.div>

        {/* Network Social Nodes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="f1-social-btn"
            >
              <Icon size={16} />
              <span className="text-[10px] font-mono tracking-widest font-semibold">{label}</span>
            </a>
          ))}
        </motion.div>

      </div>

      <style>{`
        .f1-contact-section {
          position: relative;
          padding: clamp(80px, 12vw, 128px) clamp(16px, 5vw, 48px);
          overflow: hidden;
          background: var(--bg);
          border-top: 1px solid var(--border);
        }

        .f1-mail-btn {
          position: relative;
          padding: 16px 36px;
          background: var(--fg);
          color: var(--bg);
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          font-family: var(--font-body);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--fg);
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }
        .f1-mail-btn:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px var(--accent-muted);
        }
        .f1-mail-btn:active {
          transform: translateY(0);
        }

        .f1-social-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          color: var(--fg-muted);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .f1-social-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
          transform: translateY(-2px);
          background: var(--accent-muted);
        }
        .f1-social-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}