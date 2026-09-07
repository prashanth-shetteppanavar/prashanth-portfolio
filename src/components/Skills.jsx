import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function useOrbitScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      if (w < 380) setScale(0.52);
      else if (w < 640) setScale(0.6);
      else if (w < 768) setScale(0.82);
      else setScale(1);
    };
    upd();
    window.addEventListener("resize", upd, { passive: true });
    return () => window.removeEventListener("resize", upd);
  }, []);
  return scale;
}

const ORBITS = [
  {
    radius: 110,
    duration: 22,
    items: [
      { name: "Java", icon: "java/java-original.svg" },
      { name: "Spring", icon: "spring/spring-original.svg" },
      { name: "Hibernate", icon: "hibernate/hibernate-original.svg" },
    ],
  },
  {
    radius: 180,
    duration: 32,
    items: [
      { name: "React", icon: "react/react-original.svg" },
      { name: "JavaScript", icon: "javascript/javascript-original.svg" },
      { name: "MySQL", icon: "mysql/mysql-original.svg" },
      { name: "Python", icon: "python/python-original.svg" },
    ],
  },
  {
    radius: 250,
    duration: 44,
    items: [
      { name: "Git", icon: "git/git-original.svg" },
      { name: "HTML5", icon: "html5/html5-original.svg" },
      { name: "CSS3", icon: "css3/css3-original.svg" },
      { name: "Oracle SQL", icon: "oracle/oracle-original.svg" },
    ],
  },
];

const TOOLS = [
  { name: "GitHub", icon: "github/github-original.svg" },
  { name: "Postman", icon: "postman/postman-original.svg" },
  { name: "Vercel", icon: "vercel/vercel-original.svg" },
  { name: "VS Code", icon: "vscode/vscode-original.svg" },
  { name: "Eclipse", icon: "eclipse/eclipse-original.svg" },
  { name: "Maven", icon: "maven/maven-original.svg" },
  { name: "npm", icon: "npm/npm-original-wordmark.svg" },
  { name: "Linux", icon: "linux/linux-original.svg" },
  { name: "IntelliJ IDEA", icon: "intellij/intellij-original.svg" },
  { name: "Render", icon: null },
];

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

export default function Skills() {
  const [paused, setPaused] = useState(null);
  const scale = useOrbitScale();
  const BASE = 560;

  return (
    <section id="skills" className="relative py-28 md:py-36 bg-surface border-t border-line overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4">Skills</p>
          <h2 className="font-display text-3xl md:text-5xl text-bone">A stack in orbit</h2>
          <p className="max-w-lg mx-auto mt-5 text-sm md:text-base leading-relaxed text-mute">
            A practical toolkit for turning ambitious ideas into fast, reliable products.
          </p>
        </motion.div>

        <div className="relative mx-auto flex items-center justify-center overflow-visible" style={{ width: BASE * scale, height: BASE * scale, maxWidth: "100%" }}>
          {/* Core */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(124,92,255,0.4)" }}
            className="absolute z-10 w-16 h-16 rounded-full bg-accent flex items-center justify-center font-display text-ink text-xs shadow-[0_0_30px_rgba(124,92,255,0.5)] cursor-pointer"
          >
            PS
          </motion.div>

          {ORBITS.map((orbit, oi) => (
            <motion.div
              key={oi}
              className="absolute rounded-full border border-line/50"
              style={{ width: orbit.radius * 2 * scale, height: orbit.radius * 2 * scale }}
              onMouseEnter={() => setPaused(oi)}
              onMouseLeave={() => setPaused(null)}
            >
              <div
                className="absolute inset-0"
                style={{
                  animation: `spin${oi} ${orbit.duration}s linear infinite`,
                  animationPlayState: paused === oi ? "paused" : "running",
                }}
              >
                {orbit.items.map((item, ii) => {
                  const angle = (360 / orbit.items.length) * ii;
                  return (
                    <div
                      key={item.name}
                      className="absolute top-1/2 left-1/2 group"
                      style={{
                        transform: `rotate(${angle}deg) translate(${orbit.radius * scale}px) rotate(-${angle}deg)`,
                      }}
                    >
                      <motion.div
                        onMouseEnter={() => setPaused(oi)}
                        onMouseLeave={() => setPaused(null)}
                        data-cursor="link"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        whileHover={{
                          scale: 1.2,
                          rotate: 180,
                          boxShadow: "0 0 25px rgba(124,92,255,0.3)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                          delay: 0.5 + oi * 0.1,
                        }}
                        className="relative -translate-x-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-ink border border-line flex items-center justify-center hover:border-accent hover:shadow-[0_0_20px_var(--c-glow)] transition-all duration-300 cursor-pointer"
                      >
                        <img
                          src={ICON_BASE + item.icon}
                          alt={item.name}
                          className="w-5 h-5 md:w-6 md:h-6"
                          loading="lazy"
                        />
                        <motion.span
                          initial={{ opacity: 0, y: 5 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-8 whitespace-nowrap font-mono text-[10px] tracking-wide text-accent bg-ink/90 px-2 py-0.5 rounded-full border border-line opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                          {item.name}
                        </motion.span>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Orbit labels */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-mute/30">Skills · Tools · Technologies</span>
          </motion.div>
        </div>

        <style>{`
          @keyframes spin0 { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
          @keyframes spin1 { from { transform: rotate(0deg);} to { transform: rotate(-360deg);} }
          @keyframes spin2 { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        `}</style>

        {/* Tools marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-24 md:mt-32"
        >
          <p className="font-mono text-mute text-[11px] tracking-[0.3em] uppercase text-center mb-10">
            Tools &amp; Platforms
          </p>
          <div className="tool-marquee overflow-hidden" aria-label="Tools and platforms">
            <div className="tool-marquee-track flex w-max gap-4 md:gap-5 hover:[animation-play-state:paused]" style={{ animation: "marquee 30s linear infinite" }}>
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 gap-4 md:gap-5" aria-hidden={copy === 1}>
                  {TOOLS.map((tool, i) => (
                    <motion.div
                      key={`${copy}-${tool.name}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      whileHover={{ y: -4, scale: 1.06 }}
                      data-cursor="link"
                      className="group relative flex flex-col items-center gap-3 p-5 rounded-xl border border-line bg-ink/20 transition-all duration-300 hover:border-accent hover:bg-ink/40 hover:shadow-[0_12px_30px_var(--c-glow)] cursor-pointer min-w-[80px]"
                    >
                      <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300" />
                        {tool.icon ? (
                          <img
                            src={ICON_BASE + tool.icon}
                            alt={tool.name}
                            className="relative z-10 h-7 w-7 transition-all duration-300 group-hover:rotate-[360deg] group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <svg className="relative z-10 h-7 w-7 text-mute transition-all duration-300 group-hover:rotate-[360deg] group-hover:scale-110 group-hover:text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <path d="M12 2 3 8v8l9 6 9-6V8l-9-6Z" strokeLinejoin="round" />
                            <path d="M3 8l9 6 9-6M12 14v8" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className="font-mono text-[10px] tracking-wide text-mute text-center leading-tight transition-colors duration-300 group-hover:text-accent">
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
