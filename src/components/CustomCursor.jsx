import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [variant, setVariant] = useState("default");
  const [enabled] = useState(() => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const fine = enabled;
    if (!fine) return;

    let raf;
    const onMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
    };

    const tick = () => {
      const { x: tx, y: ty } = posRef.current;
      ringPos.current.x += (tx - ringPos.current.x) * 0.15;
      ringPos.current.y += (ty - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const setState = (v) => () => setVariant(v);
    const reset = () => setVariant("default");

    const links = document.querySelectorAll("a, button, [data-cursor='link']");
    const cards = document.querySelectorAll("[data-cursor='card']");

    const add = (els, handler) => els.forEach((el) => el.addEventListener("mouseenter", handler));
    const remove = (els, handler) => els.forEach((el) => el.removeEventListener("mouseenter", handler));

    add(links, setState("link"));
    add(cards, setState("card"));
    links.forEach((el) => el.addEventListener("mouseleave", reset));
    cards.forEach((el) => el.addEventListener("mouseleave", reset));

    return () => {
      remove(links, setState("link"));
      remove(cards, setState("card"));
      links.forEach((el) => el.removeEventListener("mouseleave", reset));
      cards.forEach((el) => el.removeEventListener("mouseleave", reset));
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize = variant === "link" ? 40 : variant === "card" ? 56 : 32;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full pointer-events-none z-[9999]"
        style={{
          willChange: "transform",
          background: "var(--c-accent2)",
          opacity: variant === "link" || variant === "card" ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          width: ringSize,
          height: ringSize,
          border: `1px solid ${variant === "card" ? "var(--c-accent)" : "var(--c-accent)"}`,
          background: variant === "link" || variant === "card" ? "var(--c-accent)" : "transparent",
          opacity: 0.7,
          mixBlendMode: variant === "link" || variant === "card" ? "normal" : "difference",
          willChange: "transform, width, height",
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background 0.2s ease, border-color 0.2s ease",
        }}
      />
    </>
  );
}
