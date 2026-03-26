import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, useAudio } from "./terminal";

export function Preloader({ isLoading, onComplete }) {
  const [hasLaunched, setHasLaunched] = useState(false);
  
  // Eagerly preload audio context and buffer globally on page load
  useAudio(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#F5F0E8] flex flex-col items-center justify-center p-4 md:p-8"
        >
          {!hasLaunched ? (
            <motion.button
              key="launch-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setHasLaunched(true)}
              className="group flex items-center gap-3 px-8 py-4 bg-[#1A1610] text-[#F5F0E8] rounded-full font-mono text-xs md:text-sm tracking-widest uppercase hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <span>Launch</span>
              <svg className="w-4 h-4 fill-current group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          ) : (
            <div className="w-full max-w-3xl">
              <Terminal 
                autoStart={true}
                commands={[
                  "sys init portfolio --user=divydoesnotcode",
                  "npm run dev"
                ]}
                outputs={{
                  0: ["→ Initializing system environment...", "→ Verifying assets...", "✓ Integrity check passed."],
                  1: ["Welcome to the portfolio of Divy Barot.", "System ready. Launching sequence initiated..."]
                }}
                username="divydoesnotcode"
                typingSpeed={20}
                delayBetweenCommands={250}
                onComplete={() => setTimeout(onComplete, 100)}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
