import { useState } from "react";
import { motion } from "framer-motion";
import dclCert from "../assets/certs/dcl-certificate.jpeg";
import odooCert from "../assets/certs/odoo-cert.jpg";

const CERTS = [
  {
    title: "Java Full Stack Internship",
    org: "Dhee Coding Lab, Bengaluru",
    meta: "Feb — May 2026 · Core Java, JDBC, Spring, Hibernate",
    image: dclCert,
  },
  {
    title: "Odoo × NMIT Hackathon 2025",
    org: "Nitte Meenakshi Institute of Technology",
    meta: "24-hour hackathon · Sep 2025",
    image: odooCert,
  },
];

const BADGES = [
  {
    label: "LeetCode 50 Days Badge",
    detail: "50+ problems solved, consistent daily DSA streak",
    icon: (
      <path d="M13.48 1.1c.51-.53 1.35-.55 1.9-.05.53.5.56 1.35.06 1.9L10 8.4l3.87 3.87a1.33 1.33 0 1 1-1.88 1.88L7.24 9.4a2.67 2.67 0 0 1 0-3.77l6.24-6.53Z" />
    ),
  },
  {
    label: "HackerRank Java — 3 Star",
    detail: "Verified proficiency in Java programming fundamentals",
    icon: (
      <path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9l3-7Z" />
    ),
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-28 md:py-36 bg-surface border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4">Proof</p>
          <h2 className="font-display text-3xl md:text-5xl text-bone">Certifications &amp; Achievements</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {CERTS.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {BADGES.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -4, scale: 1.03, boxShadow: "0 12px 40px var(--c-glow)" }}
              className="group flex items-center gap-4 p-5 rounded-xl border border-line bg-ink hover:border-accent/50 transition-all duration-300 cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5A623">
                  {badge.icon}
                </svg>
              </motion.div>
              <div>
                <p className="font-display text-sm text-bone group-hover:text-accent transition-colors duration-300">{badge.label}</p>
                <p className="font-mono text-[11px] text-mute mt-0.5 group-hover:text-bone/70 transition-colors duration-300">{badge.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert, index }) {
  const [flipped, setFlipped] = useState(false);
  const handleMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };
  const handleLeave = (e) => {
    e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => index === 0 && setFlipped((value) => !value)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="card"
      className={`group relative rounded-2xl border border-line bg-ink ${index === 0 ? "cursor-pointer" : ""}`}
      style={{ transition: "transform 0.2s ease-out", transformStyle: "preserve-3d", perspective: "1200px" }}
    >
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ transformStyle: "preserve-3d" }}>
        <div className={`relative aspect-[4/3] overflow-hidden ${index === 0 ? "bg-white" : ""}`} style={{ backfaceVisibility: "hidden" }}>
          <img src={cert.image} alt={cert.title} className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${index === 0 ? "object-contain -rotate-90 scale-[1.32]" : "object-cover"}`} loading="lazy" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,11,14,0) 40%, rgba(10,11,14,0.92) 100%)" }} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ backfaceVisibility: "hidden" }}>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent2 mb-2">{cert.meta}</p>
          <h3 className="font-display text-lg md:text-xl text-bone mb-1">{cert.title}</h3>
          <p className="text-mute text-sm">{cert.org}</p>
        </div>
        {index === 0 && <div className="absolute inset-0 flex flex-col justify-center p-8 bg-ink" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent2 mb-4">Internship / 2026</p>
          <h3 className="font-display text-xl text-bone mb-3">Built for the real world.</h3>
          <p className="text-sm leading-relaxed text-mute">Core Java, JDBC, MySQL, Spring MVC and Hibernate applied across production-style full-stack modules.</p>
          <span className="mt-6 font-mono text-[10px] uppercase tracking-widest text-accent">Click to view certificate</span>
        </div>}
      </motion.div>
    </motion.div>
  );
}
