import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-transparent">
        <div
          className="h-full bg-accent"
          style={{ width: `${progress}%`, transition: "width 0.1s linear", boxShadow: "0 0 8px rgba(124,92,255,0.8)" }}
        />
      </div>
      <div className="hidden lg:block fixed left-10 top-1/2 -translate-y-1/2 h-36 w-px bg-line/70 z-40">
        <div
          className="absolute top-0 left-0 w-full bg-accent"
          style={{ height: `${progress}%`, transition: "height 0.15s ease-out", boxShadow: "0 0 10px var(--c-glow)" }}
        />
        <span className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_var(--c-glow)]" />
      </div>
    </>
  );
}
