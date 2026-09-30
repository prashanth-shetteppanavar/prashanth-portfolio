import { motion } from "framer-motion";

const TIMELINE = [
  {
    when: "Aug 2026",
    title: "Founder Team – AI Engineer Intern",
    org: "mittoX (Vindox Services Private Limited), Bengaluru",
    desc: "Worked on an AI-powered call operations platform with CRM automation, call tracking, agent workflows, and AI-generated notes for lead follow-ups.",
  },
  {
    when: "Feb 2026 — May 2026",
    title: "Java Full Stack Developer Intern",
    org: "Dhee Coding Lab, BTM Branch, Bengaluru",
    desc: "Built full-stack Java web modules with Core Java, JDBC & MySQL (DAO/MVC), Servlets, Spring Core/MVC and Hibernate/JPA.",
  },
  {
    when: "Sep 2025",
    title: "Odoo × NMIT Hackathon 2025",
    org: "Nitte Meenakshi Institute of Technology, Bengaluru",
    desc: "24-hour hackathon where the team built a cloud-based accounting system using Odoo and collaborative rapid prototyping.",
  },
  {
    when: "Jul 2026",
    title: "B.E. Information Science & Engineering",
    org: "East Point College of Engineering and Technology, Bengaluru",
    desc: "Graduated 2026 — CGPA 8.2. Focus: Java, Data Structures, DBMS, Web Technologies, and application design.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36 bg-surface border-t border-line">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4">Timeline</p>
          <h2 className="font-display text-3xl md:text-5xl text-bone">Experience</h2>
        </motion.div>

        <div className="relative pl-8 md:pl-10">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-line" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 top-2 bottom-2 w-px bg-accent"
          />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative mb-12 last:mb-0 group cursor-pointer"
            >
              <motion.div
                className="absolute -left-[38px] md:-left-[42px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent"
                whileHover={{ scale: 1.3, boxShadow: "0 0 20px rgba(124,92,255,0.8)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
              <p className="font-mono text-[11px] tracking-widest uppercase text-accent2 mb-1.5">{item.when}</p>
              <h3 className="font-display text-lg md:text-xl text-bone mb-1 transition-colors duration-300 group-hover:text-accent">{item.title}</h3>
              <p className="text-mute text-sm mb-2">{item.org}</p>
              <p className="text-mute/80 text-sm leading-relaxed max-w-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
