import { useEffect, useRef } from "react";

export default function Spotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const tick = () => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(124,92,255,0.06), transparent 65%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="fixed inset-0 z-[1] pointer-events-none" />;
}
