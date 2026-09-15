import { motion } from "framer-motion";

const FOCUS_AREAS = [
  { title: "Backend systems", detail: "Java services, persistence layers, and practical server-side workflows." },
  { title: "REST APIs", detail: "Clear API boundaries that connect interfaces, business logic, and data." },
  { title: "Full-stack applications", detail: "React interfaces backed by maintainable Java or Node.js application logic." },
  { title: "Database-driven products", detail: "SQL-backed features with deliberate data models and reliable retrieval." },
  { title: "AI-assisted applications", detail: "Local model integrations and AI features with privacy and product context in mind." },
  { title: "Automation tools", detail: "Internal workflows that reduce repetitive work without hiding how they operate." },
];

export default function WhatIBuild() {
  return (
    <section id="what-i-build" className="relative border-t border-line bg-surface py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Focus</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-bone md:text-5xl">What I build</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-mute">
            Prashanth Shetteppanavar builds practical software across the boundary between backend systems, useful interfaces, and automation.
          </p>
        </div>
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {FOCUS_AREAS.map((area, index) => (
            <motion.article
              key={area.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="border-t border-line pt-4"
            >
              <h3 className="font-display text-base text-bone">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{area.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-6xl border-t border-line px-6 pt-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent2">Engineering approach</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-mute">
          I prefer clear boundaries, maintainable code, deliberate database design, reusable components, and measurable performance. Security, accessibility, and failure states are part of the implementation rather than polish added at the end.
        </p>
      </div>
    </section>
  );
}
