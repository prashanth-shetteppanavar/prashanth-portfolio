import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = NAV.map((n) => document.querySelector(n.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${
          scrolled ? "py-3.5 bg-ink/85 backdrop-blur-xl border-b border-line/30" : "py-5"
        }`}
      >
        <a href="#hero" data-cursor="link" className="font-display text-[11px] sm:text-sm text-bone tracking-wide whitespace-nowrap">
          Prashanth Shetteppanavar
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-cursor="link"
              className={`relative font-mono text-[11px] tracking-[0.15em] uppercase transition-colors ${
                active === item.href ? "text-bone" : "text-mute hover:text-bone"
              }`}
            >
              {item.label}
              {active === item.href && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Magnetic strength={0.3}>
            <a
              href="/Prashanth_Shetteppanavar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-full border border-line text-bone hover:border-accent hover:text-accent transition-colors"
            >
              Resume
            </a>
          </Magnetic>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-[70] w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
          >
            <span
              className="block w-5 h-[1.5px] bg-bone transition-transform duration-300"
              style={{ transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }}
            />
            <span
              className="block w-5 h-[1.5px] bg-bone transition-opacity duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-[1.5px] bg-bone transition-transform duration-300"
              style={{ transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-[65] bg-ink/98 backdrop-blur-xl flex flex-col items-center justify-center gap-7"
          >
            {NAV.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.35 }}
                className={`font-display text-3xl ${active === item.href ? "text-accent" : "text-bone"}`}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="/Prashanth_Shetteppanavar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * NAV.length, duration: 0.35 }}
              className="mt-4 font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-accent text-accent"
            >
              View Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
