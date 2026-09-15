import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const TERMINAL_LINES = [
  { text: "prashanth@portfolio ~ % init", type: "command", delay: 120 },
  { text: "> initializing interface", type: "output", delay: 380 },
  { text: "> loading experience", type: "output", delay: 620 },
  { text: "> loading projects", type: "output", delay: 860 },
  { text: "> system ready ✓", type: "success", delay: 1180 },
];

export default function Loader({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [showPrompt, setShowPrompt] = useState(true);
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const fire = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDoneRef.current?.();
    };

    const timers = [];

    TERMINAL_LINES.forEach((line) => {
      timers.push(setTimeout(() => setVisibleLines((prev) => [...prev, line.text]), line.delay));
    });

    timers.push(setTimeout(() => setShowPrompt(false), 1400));

    // smooth progress bar
    const start = Date.now();
    const dur = 2000;
    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, Math.round((elapsed / dur) * 100)));
      if (elapsed < dur) timers.push(setTimeout(tick, 40));
    };
    tick();

    // hard exit — always fires
    timers.push(setTimeout(fire, 2200));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[10000] bg-[#06070a] flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* ambient orbs */}
      <div className="absolute w-[420px] h-[420px] rounded-full pointer-events-none" style={{ left: "22%", top: "28%", background: "radial-gradient(circle, rgba(124,92,255,0.18) 0%, transparent 70%)", filter: "blur(56px)", opacity: 0.9 }} />
      <div className="absolute w-[360px] h-[360px] rounded-full pointer-events-none" style={{ right: "18%", bottom: "22%", background: "radial-gradient(circle, rgba(245,166,35,0.14) 0%, transparent 70%)", filter: "blur(56px)", opacity: 0.8 }} />
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(124,92,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,255,0.22) 1px, transparent 1px)", backgroundSize: "52px 52px" }} />

      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-7 relative z-10">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-3">Welcome</p>
        <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
          to <span className="bg-gradient-to-r from-[#7C5CFF] to-[#F5A623] bg-clip-text text-transparent">Prashanth’s</span> Portfolio
        </div>
        <p className="mt-2 font-body text-xs sm:text-sm text-white/55 tracking-wide">Java Full Stack Developer · Bengaluru, India</p>
      </motion.div>

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[min(92vw,520px)] rounded-xl overflow-hidden z-10"
        style={{ background: "rgba(12, 14, 20, 0.96)", border: "1px solid rgba(34, 37, 46, 0.7)", boxShadow: "0 24px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(124,92,255,0.08)" }}
      >
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid rgba(34, 37, 46, 0.5)" }}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex-1 text-center font-mono text-[10px] tracking-[0.16em] text-[#5a5d6a] uppercase select-none">Terminal — prashanth@portfolio</span>
          <div className="w-[52px]" />
        </div>

        <div className="p-5 md:p-6 font-mono text-[12px] md:text-[13px] leading-[1.9] min-h-[176px]">
          {visibleLines.map((line, i) => {
            const isCommand = line.startsWith("prashanth");
            const isSuccess = line.includes("ready");
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.28 }}>
                {isCommand ? (
                  <p className="text-[#8A8D98]"><span className="text-[#F5A623]">➜</span> <span className="text-[#7C5CFF]">~</span> <span className="text-[#EDEEF2]">{line.split("~ % ")[1] || line}</span></p>
                ) : (
                  <p className={isSuccess ? "text-[#28c840]" : "text-[#5a5d6a]"}>{line}</p>
                )}
              </motion.div>
            );
          })}
          {showPrompt && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 flex items-center gap-1.5">
              <span className="text-[#F5A623]">➜</span><span className="text-[#7C5CFF]">~</span><span className="inline-block w-[7px] h-[15px] bg-[#7C5CFF] rounded-sm" style={{ animation: "terminalBlink 1s step-end infinite" }} />
            </motion.div>
          )}
        </div>

        {/* progress bar */}
        <div className="h-[2px] w-full bg-white/5">
          <motion.div className="h-full bg-gradient-to-r from-[#7C5CFF] to-[#F5A623]" initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ ease: "linear", duration: 0.04 }} />
        </div>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }} className="mt-6 font-mono text-[10px] tracking-[0.25em] uppercase text-white/30 z-10">
        Crafting reliable software · Loading {progress}%
      </motion.p>

      {/* skip */}
      <button onClick={() => onDoneRef.current?.()} className="absolute bottom-6 right-6 z-10 font-mono text-[10px] tracking-widest uppercase text-white/40 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-full px-4 py-2 transition-colors">
        Skip →
      </button>
    </motion.div>
  );
}
