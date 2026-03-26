"use client";
import { cn } from "../../lib/utils";
import React from "react";
import { motion } from "motion/react";
import { IconDownload } from "@tabler/icons-react";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const ResumeDownload = () => {
  const handleDownload = () => {
    // Basic download trigger
    const link = document.createElement("a");
    link.href = "/DivyResume.pdf"; // Make sure to place resume.pdf in the public folder
    link.download = "Divy_Barot_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative isolate z-0 py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <motion.button
          onClick={handleDownload}
          whileHover="animate"
          className="group/file relative block w-full cursor-pointer overflow-hidden rounded-2xl p-10 md:p-14 border transition-colors duration-500"
          style={{ 
            backgroundColor: "var(--bg)", 
            borderColor: "var(--border-strong)"
          }}
        >
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            <GridPattern />
          </div>
          
          <div className="flex flex-col items-center justify-center pointer-events-none relative z-20">
            <p className="font-sans text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold tracking-tight" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>
              Grab My Resume
            </p>
            <p className="mt-4 font-sans text-sm md:text-base font-normal max-w-lg text-center leading-relaxed" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-body)" }}>
              Prefer to have a copy of my experience to go? Click below to download a PDF version of my resume.
            </p>
            
            <div className="relative mx-auto mt-12 w-full max-w-[12rem]">
              <motion.div
                  layoutId="file-download"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative z-40 mx-auto mt-4 flex h-36 w-full items-center justify-center rounded-xl transition-shadow duration-500",
                    "shadow-[0px_10px_50px_rgba(26,22,16,0.1)] border group-hover/file:shadow-2xl"
                  )}
                  style={{ backgroundColor: "var(--bg)", borderColor: "var(--border-strong)" }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-3"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    <IconDownload className="h-10 w-10 transition-colors duration-300 group-hover/file:text-amber-700" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 group-hover/file:text-amber-700">.PDF</span>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={secondaryVariant}
                  className="absolute inset-0 z-30 mx-auto mt-4 flex h-36 w-full items-center justify-center rounded-xl border border-dashed opacity-0"
                  style={{ borderColor: "var(--accent)" }}
                ></motion.div>
            </div>
          </div>
        </motion.button>
      </div>
    </section>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px opacity-30" style={{ backgroundColor: "var(--border-strong)" }}>
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className="flex h-10 w-10 shrink-0 rounded-[2px]"
              style={{
                backgroundColor: "var(--bg)",
                boxShadow: index % 2 !== 0 ? "0px 0px 1px 1.5px var(--border-strong) inset" : "none"
              }}
            />
          );
        }),
      )}
    </div>
  );
}
