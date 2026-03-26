import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const socials = [
    { label: "GitHub", href: "https://github.com/divydoesnotcode", icon: Github },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/divy-barot", icon: Linkedin },
    { label: "X / Twitter", href: "https://x.com/divydoesnotcode", icon: Twitter },
    { label: "Email", href: "mailto:workwithdivy@gmail.com", icon: Mail },
];

export function Contact() {
    return (
        <section id="contact" className="py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto" aria-label="Contact Information">

            {/* Label */}
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-amber-700 text-xs uppercase tracking-[0.28em] mb-5 text-center" style={{ fontFamily: "var(--font-body)" }}>
                Let's Connect
            </motion.p>

            {/* Big heading */}
            <div className="text-center mb-10 md:mb-12">
                <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
                    className="text-[clamp(2.2rem,9vw,7rem)] font-extrabold leading-[0.92] mb-2" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>
                    Let's Build
                </motion.h2>
                <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
                    style={{ fontFamily: "var(--font-display)", WebkitTextStroke: "clamp(1.5px,0.18vw,3px) rgba(26,22,16,0.25)", color: "transparent" }}
                    className="text-[clamp(2.2rem,9vw,7rem)] font-extrabold leading-[0.92]">
                    Something Great.
                </motion.h2>
            </div>

            {/* Subtext */}
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
                className="text-center max-w-sm sm:max-w-md mx-auto mb-10 md:mb-12 leading-relaxed text-sm sm:text-base" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-body)" }}>
                Open to new opportunities — freelance projects, full-time roles, or just a good tech conversation.
            </motion.p>

            {/* Email CTA — truncates gracefully on small screens */}
            <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }} viewport={{ once: true }}
                className="flex justify-center mb-12 md:mb-16 px-4">
                <a href="mailto:workwithdivy@gmail.com"
                    className="contact-email-btn">
                    {/* Full email on md+, shortened on mobile */}
                    <span className="hidden sm:inline">workwithdivy@gmail.com</span>
                    <span className="sm:hidden">Say Hello →</span>
                    {/* Hover overlay */}
                    <span className="contact-email-hover hidden sm:flex">Say Hello →</span>
                </a>
            </motion.div>

            {/* Social icons — larger touch targets on mobile */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.35 }} viewport={{ once: true }}
                className="flex items-center justify-center gap-3 sm:gap-4">
                {socials.map(({ label, href, icon: Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center active:scale-95 transition-all duration-250" style={{ borderColor: "var(--border-strong)", color: "var(--fg-muted)" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--fg-muted)'; }}>
                        <Icon size={17} />
                    </a>
                ))}
            </motion.div>

            <style>{`
        .contact-email-btn {
          position: relative;
          padding: clamp(12px,1.8vw,18px) clamp(20px,4vw,44px);
          background: var(--fg); color: var(--bg);
          border-radius: 100px;
          font-size: clamp(13px,1.4vw,18px);
          font-weight: 700;
          font-family: var(--font-display);
          text-decoration: none;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;
          white-space: nowrap;
          min-height: 52px;
          transition: box-shadow 0.4s ease, transform 0.2s ease;
        }
        .contact-email-btn:hover {
          box-shadow: 0 4px 20px rgba(26,22,16,0.18);
          transform: scale(1.02);
        }
        .contact-email-btn:active { transform: scale(0.97); }
        .contact-email-hover {
          position: absolute; inset: 0;
          background: var(--accent); color: var(--bg);
          font-weight: 700;
          align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity 0.28s ease;
          border-radius: 100px;
        }
        .contact-email-btn:hover .contact-email-hover { opacity: 1; }
      `}</style>
        </section>
    );
}