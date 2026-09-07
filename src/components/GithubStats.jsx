import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const USERNAME = "prashanth-shetteppanavar";

function useIsLight() {
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains("light"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return isLight;
}

export default function GithubStats() {
  const isLight = useIsLight();

  const streakUrl = isLight
    ? `https://github-readme-streak-stats.herokuapp.com/?user=${USERNAME}&hide_border=true&background=00000000&ring=5b46d6&fire=b85e0f&currStreakLabel=14151a&sideLabels=5e5d58&sideNums=14151a&dates=5e5d58&currStreakNum=14151a&stroke=c9c0b3`
    : `https://github-readme-streak-stats.herokuapp.com/?user=${USERNAME}&hide_border=true&background=00000000&ring=7C5CFF&fire=F5A623&currStreakLabel=EDEEF2&sideLabels=8A8D98&sideNums=EDEEF2&dates=8A8D98&currStreakNum=EDEEF2&stroke=22252E`;

  return (
    <section id="github" className="relative py-24 md:py-32 bg-ink border-t border-line overflow-hidden">
      {/* subtle glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, var(--c-glow), transparent 60%)" }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4">Live</p>
            <h2 className="font-display text-3xl md:text-5xl text-bone">GitHub activity</h2>
            <p className="mt-3 text-sm text-mute max-w-md">Real-time stats — auto-theming for light/dark so every number stays readable.</p>
          </div>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="font-mono text-xs tracking-widest uppercase text-mute hover:text-accent transition-colors border border-line rounded-full px-4 py-2 hover:border-accent"
          >
            @{USERNAME} →
          </a>
        </motion.div>



        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="group relative rounded-2xl border border-line overflow-hidden bg-surface p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-accent/40 hover:shadow-[0_12px_40px_var(--c-glow)]"
        >
          <span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <img src={streakUrl} alt="Contribution streak" loading="lazy" className="w-full rounded-xl" />
        </motion.div>
      </div>
    </section>
  );
}
