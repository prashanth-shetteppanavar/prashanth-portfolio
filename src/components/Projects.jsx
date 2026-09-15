import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lightbox from "./Lightbox";
import { PROJECTS } from "../data/projects";

export default function Projects() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="projects" className="relative py-28 md:py-36 bg-ink border-t border-line overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4">Work</p>
          <h2 className="font-display text-3xl md:text-5xl text-bone">Selected projects</h2>
        </motion.div>

        <div className="flex flex-col gap-28 md:gap-40">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.title} project={p} index={i} reverse={i % 2 === 1} onExpand={() => setLightbox(p)} />
          ))}
        </div>
      </div>

      <Lightbox src={lightbox?.image} alt={lightbox?.title} onClose={() => setLightbox(null)} />
    </section>
  );
}

function ProjectRow({ project, reverse, onExpand }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Reduce parallax on mobile to prevent horizontal overflow
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const range = isMobile ? 12 : 50;
  const imageX = useTransform(scrollYProgress, [0, 1], [reverse ? -range : range, reverse ? range * 0.6 : -range * 0.6]);
  const textX = useTransform(scrollYProgress, [0, 1], [isMobile ? 8 : 25, isMobile ? -8 : -25]);

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center ${reverse ? "md:[direction:rtl]" : ""}`}
    >
      <motion.button
        type="button"
        style={{ x: imageX }}
        data-cursor="card"
        onClick={onExpand}
        aria-label={`Enlarge ${project.title} preview`}
        className={`group relative rounded-2xl overflow-hidden border border-line cursor-pointer ${
          reverse ? "md:[direction:ltr]" : ""
        }`}
      >
        <div className="relative aspect-[16/10]">
          <motion.img
            src={project.image}
            alt={project.title}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full h-full object-cover transition-transform duration-500"
            loading="lazy"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ opacity: { duration: 0.3 } }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-bone px-4 py-2 rounded-full border border-bone/30 bg-ink/40 backdrop-blur-sm">
              Click to enlarge
            </span>
          </motion.div>
        </div>
      </motion.button>

      <motion.div style={{ x: textX }} className={reverse ? "md:[direction:ltr]" : ""}>
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-5xl md:text-6xl text-line/50 font-bold">{project.number}</span>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent2 border border-line rounded-full px-3 py-1">
            {project.tag}
          </span>
        </div>
        <motion.h3
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="font-display text-2xl md:text-3xl text-bone mb-4"
        >
          {project.title}
        </motion.h3>
        <p className="text-mute text-sm md:text-base leading-relaxed mb-6 max-w-md">{project.desc}</p>

        {/* Architecture flow */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {project.architecture.map((label, ni) => (
            <div key={ni} className="flex items-center gap-2">
              <span
                className={`font-mono text-[10px] tracking-wider px-2.5 py-1 rounded border ${
                  ni === 0
                    ? "border-accent/40 text-accent bg-accent/5"
                    : ni === project.architecture.length - 1
                    ? "border-accent2/40 text-accent2 bg-accent2/5"
                    : "border-line text-mute"
                }`}
              >
                {label}
              </span>
              {ni < project.architecture.length - 1 && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-line)" strokeWidth="1.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((s) => (
            <motion.span
              key={s}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-line text-mute transition-all duration-300 cursor-default"
            >
              {s}
            </motion.span>
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-mute hover:text-accent transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.3-.52-1.49.11-3.1 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.61.24 2.8.12 3.1.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.18 0 1.57-.02 2.84-.02 3.23 0 .3.2.66.79.55A10.5 10.5 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
            </svg>
            View on GitHub
          </a>
        )}
        <a
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 ml-5 font-mono text-xs tracking-widest uppercase text-accent hover:text-bone transition-colors"
        >
          Read case study <span aria-hidden="true">-&gt;</span>
        </a>
      </motion.div>
    </div>
  );
}
