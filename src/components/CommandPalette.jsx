import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMMANDS = [
  { label: "Go to About", type: "nav", target: "#about" },
  { label: "Go to Education", type: "nav", target: "#education" },
  { label: "Go to Skills", type: "nav", target: "#skills" },
  { label: "Go to Projects", type: "nav", target: "#projects" },
  { label: "Go to GitHub Activity", type: "nav", target: "#github" },
  { label: "Go to Certifications", type: "nav", target: "#certificates" },
  { label: "Go to Experience", type: "nav", target: "#experience" },
  { label: "Go to Contact", type: "nav", target: "#contact" },
  { label: "Open GitHub", type: "link", target: "https://github.com/prashanth-shetteppanavar" },
  { label: "Open LinkedIn", type: "link", target: "https://www.linkedin.com/in/prashanth-shetteppanavar-b680712a3/" },
  { label: "Open LeetCode", type: "link", target: "https://leetcode.com/u/prashanth_shetteppanavar/" },
  { label: "Email Prashanth", type: "link", target: "mailto:prashantshetteppanavar2004@gmail.com" },
  { label: "Download Resume", type: "download", target: "/Prashanth_Shetteppanavar_Resume.pdf" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (!v) {
            setQuery("");
            setSelected(0);
          }
          return !v;
        });
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const filtered = useMemo(
    () => COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const run = (cmd) => {
    if (!cmd) return;
    if (cmd.type === "nav") {
      document.querySelector(cmd.target)?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd.type === "download") {
      const a = document.createElement("a");
      a.href = cmd.target;
      a.download = "";
      a.click();
    } else {
      window.open(cmd.target, "_blank", "noopener,noreferrer");
    }
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      run(filtered[selected]);
    }
  };

  return (
    <>
      {/* subtle hint, desktop only */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 items-center gap-2 font-mono text-[10px] text-mute/70">
        <kbd className="px-2 py-1 rounded border border-line">⌘</kbd>
        <kbd className="px-2 py-1 rounded border border-line">K</kbd>
        <span>Quick nav</span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4"
            style={{ background: "rgba(10,11,14,0.7)", backdropFilter: "blur(4px)" }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-line bg-surface overflow-hidden shadow-2xl"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C5CFF" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" strokeLinecap="round" />
                </svg>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(0);
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Jump to a section or link..."
                  className="flex-1 bg-transparent outline-none font-mono text-sm text-bone placeholder:text-mute"
                />
                <kbd className="font-mono text-[10px] px-2 py-1 rounded border border-line text-mute">ESC</kbd>
              </div>
              <div className="max-h-72 overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <p className="px-5 py-6 text-center font-mono text-xs text-mute">No matches</p>
                )}
                {filtered.map((cmd, i) => (
                  <button
                    key={cmd.label}
                    onClick={() => run(cmd)}
                    onMouseEnter={() => setSelected(i)}
                    className={`w-full flex items-center justify-between px-5 py-3 text-left font-mono text-sm transition-colors ${
                      i === selected ? "bg-accent/10 text-bone" : "text-mute"
                    }`}
                  >
                    <span>{cmd.label}</span>
                    <span className="text-[10px] uppercase tracking-widest text-mute/60">{cmd.type}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
