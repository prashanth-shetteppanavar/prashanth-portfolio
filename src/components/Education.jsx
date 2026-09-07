import { motion } from "framer-motion";

const EDUCATION = [
  {
    degree: "B.E. — Information Science & Engineering",
    school: "East Point College of Engineering and Technology, Bengaluru, Karnataka",
    when: "Dec 2022 — Jul 2026",
    detail: "CGPA: 8.02",
  },
  {
    degree: "Pre-University (PU)",
    school: "Sri Sangameshwar PU College, Bagalkote, Karnataka",
    when: "Jul 2020 — Apr 2022",
    detail: "Percentage: 90.60",
  },
  {
    degree: "SSLC",
    school: "J S S High School, Mysore, Karnataka",
    when: "Jun 2019 — Jul 2020",
    detail: "Percentage: 83.68",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-28 md:py-36 bg-surface border-t border-line">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4">Background</p>
          <h2 className="font-display text-3xl md:text-5xl text-bone">Education</h2>
        </motion.div>

        <div className="space-y-5">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-8 p-7 md:p-8 rounded-2xl border border-line bg-ink hover:border-accent/70 hover:shadow-[0_18px_45px_var(--c-glow)] transition-all duration-500 cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="shrink-0 w-11 h-11 rounded-full border border-accent/40 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C5CFF" strokeWidth="1.8">
                  <path d="M12 3 2 8l10 5 10-5-10-5Z" strokeLinejoin="round" />
                  <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <div className="flex-1">
                <h3 className="font-display text-lg md:text-xl text-bone mb-1 group-hover:text-accent transition-colors duration-300">{edu.degree}</h3>
                <p className="text-mute text-sm md:text-base">{edu.school}</p>
              </div>
              <div className="text-left md:text-right shrink-0">
                <p className="font-mono text-[11px] tracking-widest uppercase text-accent2">{edu.when}</p>
                <p className="font-mono text-xs text-mute mt-1 group-hover:text-bone transition-colors duration-300">{edu.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
