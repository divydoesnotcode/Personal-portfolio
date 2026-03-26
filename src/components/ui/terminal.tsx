"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/utils";

const KEY_SOUNDS_DOWN: Record<string, [number, number]> = {
  A: [31542, 85],
  B: [40621, 107],
  C: [39632, 95],
  D: [32492, 85],
  E: [23317, 83],
  F: [32973, 87],
  G: [33453, 94],
  H: [33986, 93],
  I: [25795, 91],
  J: [34425, 88],
  K: [34932, 90],
  L: [35410, 95],
  M: [41610, 93],
  N: [41103, 90],
  O: [26309, 84],
  P: [26804, 83],
  Q: [22245, 95],
  R: [23817, 92],
  S: [32031, 88],
  T: [24297, 92],
  U: [25313, 95],
  V: [40136, 94],
  W: [22790, 89],
  X: [39148, 76],
  Y: [24811, 93],
  Z: [38694, 80],
  " ": [51541, 144],
  "-": [42594, 90],
  "@": [23317, 83],
  "/": [42594, 90],
  ".": [42594, 90],
  ":": [42594, 90],
  "0": [26309, 84],
  "1": [25313, 95],
  "2": [23317, 83],
  "3": [23817, 92],
  "4": [24297, 92],
  "5": [24811, 93],
  "6": [25313, 95],
  "7": [25795, 91],
  "8": [26309, 84],
  "9": [26804, 83],
  Enter: [19065, 110],
};

const KEY_SOUNDS_UP: Record<string, [number, number]> = {
  A: [31632, 80],
  B: [40736, 95],
  C: [39732, 85],
  D: [32577, 80],
  E: [23402, 80],
  F: [33063, 80],
  G: [33553, 85],
  H: [34081, 85],
  I: [25890, 85],
  J: [34515, 85],
  K: [35027, 85],
  L: [35510, 85],
  M: [41710, 85],
  N: [41198, 85],
  O: [26394, 80],
  P: [26889, 80],
  Q: [22345, 85],
  R: [23912, 85],
  S: [32121, 80],
  T: [24392, 85],
  U: [25413, 85],
  V: [40236, 85],
  W: [22880, 85],
  X: [39228, 70],
  Y: [24911, 85],
  Z: [38779, 75],
  " ": [51691, 130],
  "-": [42689, 85],
  "@": [23402, 80],
  "/": [42689, 85],
  ".": [42689, 85],
  ":": [42689, 85],
  "0": [26394, 80],
  "1": [25413, 85],
  "2": [23402, 80],
  "3": [23912, 85],
  "4": [24392, 85],
  "5": [24911, 85],
  "6": [25413, 85],
  "7": [25890, 85],
  "8": [26394, 80],
  "9": [26889, 80],
  Enter: [19180, 100],
};

let globalAudioContext: AudioContext | null = null;
let globalAudioBuffer: AudioBuffer | null = null;
let globalAudioPromise: Promise<void> | null = null;

export function useAudio(enabled: boolean) {
  const [ready, setReady] = useState(!!globalAudioBuffer);

  useEffect(() => {
    if (!enabled) return;

    if (!globalAudioContext) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      globalAudioContext = new AudioCtx();
    }

    if (!globalAudioBuffer && !globalAudioPromise) {
      globalAudioPromise = fetch("/sounds/sound.ogg")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load");
          return res.arrayBuffer();
        })
        .then((buffer) => globalAudioContext!.decodeAudioData(buffer))
        .then((audioBuffer) => {
          globalAudioBuffer = audioBuffer;
          setReady(true);
        })
        .catch(() => {});
    } else if (globalAudioPromise && !globalAudioBuffer) {
      globalAudioPromise.then(() => setReady(true));
    } else if (globalAudioBuffer) {
      setReady(true);
    }

    const unlockAudio = () => {
      if (globalAudioContext && globalAudioContext.state === "suspended") {
        globalAudioContext.resume().catch(() => {});
      }
    };

    window.addEventListener("click", unlockAudio, { passive: true });
    window.addEventListener("touchstart", unlockAudio, { passive: true });
    window.addEventListener("keydown", unlockAudio, { passive: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [enabled]);

  const playSound = (sound: [number, number] | undefined) => {
    if (!ready || !globalAudioContext || !globalAudioBuffer || !sound) return;
    if (globalAudioContext.state === "suspended") {
      globalAudioContext.resume().catch(() => {});
    }
    const src = globalAudioContext.createBufferSource();
    src.buffer = globalAudioBuffer;
    src.connect(globalAudioContext.destination);
    src.start(0, sound[0] / 1000, sound[1] / 1000);
  };

  const down = (key: string) => {
    const sound = KEY_SOUNDS_DOWN[key.toUpperCase()] || KEY_SOUNDS_DOWN[key] || KEY_SOUNDS_DOWN["A"];
    playSound(sound);
  };
  const up = (key: string) => {
    const sound = KEY_SOUNDS_UP[key.toUpperCase()] || KEY_SOUNDS_UP[key] || KEY_SOUNDS_UP["A"];
    playSound(sound);
  };

  return { down, up, ready };
}

function useInView(ref: React.RefObject<HTMLElement | null>, once = true) {
  const [inView, setInView] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && triggered.current)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          setInView(true);
          if (once) {
            triggered.current = true;
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once]);

  return inView;
}

type TokenType =
  | "command"
  | "flag"
  | "string"
  | "number"
  | "operator"
  | "path"
  | "variable"
  | "comment"
  | "default";

interface Token {
  type: TokenType;
  value: string;
}

function tokenizeBash(text: string): Token[] {
  const tokens: Token[] = [];
  const words = text.split(/(\s+)/);

  let isFirstWord = true;

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      tokens.push({ type: "default", value: word });
      continue;
    }

    if (word.startsWith("#")) {
      tokens.push({ type: "comment", value: word });
      continue;
    }

    if (word.startsWith("$")) {
      tokens.push({ type: "variable", value: word });
      isFirstWord = false;
      continue;
    }

    if (word.startsWith("--") || word.startsWith("-")) {
      tokens.push({ type: "flag", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^["'].*["']$/.test(word)) {
      tokens.push({ type: "string", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^\d+$/.test(word)) {
      tokens.push({ type: "number", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^[|>&<]+$/.test(word)) {
      tokens.push({ type: "operator", value: word });
      isFirstWord = true;
      continue;
    }

    if (word.includes("/") || word.startsWith(".") || word.startsWith("~")) {
      tokens.push({ type: "path", value: word });
      isFirstWord = false;
      continue;
    }

    if (isFirstWord) {
      tokens.push({ type: "command", value: word });
      isFirstWord = false;
      continue;
    }

    tokens.push({ type: "default", value: word });
  }

  return tokens;
}

const tokenColors: Record<TokenType, string> = {
  command: "text-emerald-700",
  flag: "text-sky-700",
  string: "text-amber-700",
  number: "text-purple-700",
  operator: "text-red-700",
  path: "text-cyan-700",
  variable: "text-pink-700",
  comment: "text-stone-500",
  default: "text-stone-700",
};

function SyntaxHighlightedText({ text }: { text: string }) {
  const tokens = tokenizeBash(text);

  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} className={tokenColors[token.type]}>
          {token.value}
        </span>
      ))}
    </>
  );
}

interface TerminalLine {
  type: "command" | "output";
  content: string;
}

export interface TerminalProps {
  commands: string[];
  outputs?: Record<number, string[]>;
  username?: string;
  className?: string;
  typingSpeed?: number;
  delayBetweenCommands?: number;
  initialDelay?: number;
  enableSound?: boolean;
  onComplete?: () => void;
  autoStart?: boolean;
}

export function Terminal({
  commands = ["npx shadcn@latest init"],
  outputs = {},
  username = "Manus-Macbook",
  className,
  typingSpeed = 50,
  delayBetweenCommands = 800,
  initialDelay = 500,
  enableSound = true,
  onComplete,
  autoStart = false,
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);
  const { down, up, ready: audioReady } = useAudio(enableSound);

  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [commandIdx, setCommandIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [outputIdx, setOutputIdx] = useState(-1);
  const [phase, setPhase] = useState<
    "idle" | "typing" | "executing" | "outputting" | "pausing" | "done"
  >("idle");
  const [cursorVisible, setCursorVisible] = useState(true);

  const currentCommand = commands[commandIdx] || "";
  const currentOutputs = useMemo(
    () => outputs[commandIdx] || [],
    [outputs, commandIdx],
  );
  const isLastCommand = commandIdx === commands.length - 1;

  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    if (phase !== "idle" || isStarting) return;
    
    // Explicitly unlock audio on this user gesture
    if (globalAudioContext && globalAudioContext.state === "suspended") {
      globalAudioContext.resume().catch(() => {});
    }

    if (!enableSound || audioReady) {
      setIsStarting(true);
      setTimeout(() => {
        setIsStarting(false);
        setPhase("typing");
      }, initialDelay);
    } else {
      setIsStarting(true);
      // Wait for audio to be ready, then type
      const checkInterval = setInterval(() => {
        if (globalAudioBuffer) {
          clearInterval(checkInterval);
          setIsStarting(false);
          setPhase("typing");
        }
      }, 50);

      // Fallback timeout in case fetch fails
      setTimeout(() => {
        clearInterval(checkInterval);
        setIsStarting(false);
        setPhase("typing");
      }, 3000);
    }
  };

  useEffect(() => {
    if (autoStart && phase === "idle" && !isStarting) {
      handleStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, phase]);

  useEffect(() => {
    if (phase === "done" && onComplete) {
      onComplete();
    }
  }, [phase, onComplete]);

  useEffect(() => {
    if (phase !== "typing") return;

    if (charIdx < currentCommand.length) {
      const char = currentCommand[charIdx];
      down(char);
      const t = setTimeout(
        () => {
          up(char);
          setCurrentText(currentCommand.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        },
        typingSpeed + Math.random() * 30,
      );
      return () => clearTimeout(t);
    } else {
      down("Enter");
      const t = setTimeout(() => {
        up("Enter");
        setPhase("executing");
      }, 80);
      return () => clearTimeout(t);
    }
  }, [phase, charIdx, currentCommand, typingSpeed, down, up]);

  useEffect(() => {
    if (phase !== "executing") return;

    setLines((prev) => [...prev, { type: "command", content: currentCommand }]);
    setCurrentText("");

    if (currentOutputs.length > 0) {
      setOutputIdx(0);
      setPhase("outputting");
    } else if (isLastCommand) {
      setPhase("done");
    } else {
      setPhase("pausing");
    }
  }, [phase, currentCommand, currentOutputs.length, isLastCommand]);

  useEffect(() => {
    if (phase !== "outputting") return;

    if (outputIdx >= 0 && outputIdx < currentOutputs.length) {
      const t = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { type: "output", content: currentOutputs[outputIdx] },
        ]);
        setOutputIdx((i) => i + 1);
      }, 150);
      return () => clearTimeout(t);
    } else if (outputIdx >= currentOutputs.length) {
      const t = setTimeout(() => {
        if (isLastCommand) {
          setPhase("done");
        } else {
          setPhase("pausing");
        }
      }, 300);
      return () => clearTimeout(t);
    }
  }, [phase, outputIdx, currentOutputs, isLastCommand]);

  useEffect(() => {
    if (phase !== "pausing") return;
    const t = setTimeout(() => {
      setCharIdx(0);
      setOutputIdx(-1);
      setCommandIdx((c) => c + 1);
      setPhase("typing");
    }, delayBetweenCommands);
    return () => clearTimeout(t);
  }, [phase, delayBetweenCommands]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines, phase]);

  const prompt = (
    <span className="text-stone-500">
      <span className="text-sky-700 font-semibold">{username}</span>
      <span className="text-emerald-700">:</span>
      <span className="text-sky-600">~</span>
      <span className="text-stone-500">$</span>{" "}
    </span>
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "mx-auto w-full max-w-xl px-4 font-mono text-xs",
        className,
      )}
    >
      <div className="overflow-hidden rounded-lg border border-stone-200 bg-[#FAF9F6] shadow-[0_4px_24px_rgba(26,22,16,0.1)]">
        {/* Title Bar */}
        <div className="flex items-center gap-2 bg-stone-100 border-b border-stone-200 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-600" />
            <div className="h-3 w-3 rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600" />
            <div className="h-3 w-3 rounded-full bg-green-500 transition-colors hover:bg-green-600" />
          </div>
          <div className="flex-1 text-center">
            <span className="truncate text-xs text-stone-500">
              {username} — bash
            </span>
          </div>
          <div className="w-[52px]" />
        </div>

        {/* Terminal Content */}
        <div
          ref={contentRef}
          className="no-visible-scrollbar h-80 overflow-y-auto p-4 font-mono"
          style={{ background: "#FAF9F6" }}
        >
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed whitespace-pre-wrap">
              {line.type === "command" ? (
                <span>
                  {prompt}
                  <SyntaxHighlightedText text={line.content} />
                </span>
              ) : (
                <span className="text-stone-500">{line.content}</span>
              )}
            </div>
          ))}

          {phase === "idle" && !autoStart && (
            <div className="leading-relaxed whitespace-pre-wrap flex items-center gap-2">
              {prompt}
              <button
                onClick={handleStart}
                className="flex items-center gap-1.5 rounded bg-stone-200/50 px-2.5 py-1 text-xs font-semibold text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-800 disabled:opacity-50"
                disabled={isStarting}
              >
                {isStarting ? (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-stone-400 border-t-transparent" />
                    Loading Audio...
                  </>
                ) : (
                  <>
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Run Script
                  </>
                )}
              </button>
            </div>
          )}

          {phase === "typing" && (
            <div className="leading-relaxed whitespace-pre-wrap">
              {prompt}
              <SyntaxHighlightedText text={currentText} />
              <span className="ml-0.5 inline-block h-4 w-2 bg-neutral-300 align-middle" />
            </div>
          )}

          {(phase === "done" ||
            phase === "pausing" ||
            phase === "outputting") && (
            <div className="leading-relaxed whitespace-pre-wrap">
              {prompt}
              <span
                className={cn(
                  "inline-block h-4 w-2 bg-neutral-300 align-middle transition-opacity duration-100",
                  !cursorVisible && "opacity-0",
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
