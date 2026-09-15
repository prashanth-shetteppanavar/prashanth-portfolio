import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const LINKS = [
  { label: "GitHub", href: "https://github.com/prashanth-shetteppanavar" },
  { label: "LeetCode", href: "https://leetcode.com/u/prashanth_shetteppanavar/" },
  { label: "GeeksForGeeks", href: "https://www.geeksforgeeks.org/profile/prashantshettecrfb" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prashanth-shetteppanavar-b680712a3/" },
  { label: "Email", href: "mailto:prashantshetteppanavar2004@gmail.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 bg-ink border-t border-line overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4"
        >
          System ready
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-3xl md:text-6xl text-bone mb-6 leading-tight"
        >
          Let's build<br />something useful.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Magnetic strength={0.3}>
              <a
                href="/Prashanth_Shetteppanavar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-2 font-mono text-sm tracking-wide px-7 py-3.5 rounded-full border border-line text-bone hover:border-accent hover:text-accent transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M15 13.5l-3 3m0 0l-3-3m3 3V8.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                View Resume
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="/Prashanth_Shetteppanavar_Resume.pdf"
                download="Prashanth_Shetteppanavar_Resume.pdf"
                data-cursor="link"
                className="inline-flex items-center gap-2 font-mono text-sm tracking-wide px-7 py-3.5 rounded-full bg-accent text-white font-medium hover:shadow-[0_0_30px_rgba(124,92,255,0.5)] transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                  <path d="M12 3v13m0 0-4.5-4.5M12 16l4.5-4.5M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download Resume
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {LINKS.map((link) => (
            <Magnetic key={link.label} strength={0.35}>
              <motion.a
                href={link.href}
                target="_blank"
                rel="me noopener noreferrer"
                data-cursor="link"
                whileHover={{ y: -3, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="font-mono text-sm tracking-wide px-6 py-3 rounded-full border border-line text-bone hover:border-accent hover:text-accent hover:shadow-[0_8px_20px_var(--c-glow)] transition-all duration-300 inline-block"
              >
                {link.label}
              </motion.a>
            </Magnetic>
          ))}
        </motion.div>

        <p className="mt-16 font-mono text-[11px] text-mute/50 tracking-wide">
          © 2026 Prashanth Shetteppanavar · Bengaluru, India
        </p>
      </div>
    </section>
  );
}
