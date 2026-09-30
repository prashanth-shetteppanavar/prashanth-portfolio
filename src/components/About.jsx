import { useState } from "react";
import { motion } from "framer-motion";
import heroPhoto from "../assets/portrait.jpeg";
import CountUp from "./CountUp";

const STATS = [
  { value: 8.2, decimals: 1, suffix: "", label: "CGPA" },
  { value: 50, decimals: 0, suffix: "+", label: "DSA Problems" },
  { value: 3, decimals: 0, suffix: "★", label: "HackerRank Java" },
  { value: 4, decimals: 0, suffix: "", label: "Projects" },
];

const TECH_CLUSTERS = [
  { title: "BACKEND", color: "var(--c-accent)", items: ["Java", "Spring Core", "Spring MVC", "Hibernate/JPA", "Servlets", "JDBC"] },
  { title: "FRONTEND", color: "var(--c-accent2)", items: ["React", "JavaScript", "HTML5", "CSS3"] },
  { title: "DATABASE", color: "var(--c-accent)", items: ["MySQL", "Oracle SQL", "Supabase", "SQL"] },
  { title: "EXPLORATION", color: "var(--c-accent2)", items: ["Local LLMs", "AI Tools", "Ollama", "Claude"] },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 bg-ink border-t border-line overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 20% 20%, var(--c-glow), transparent 55%)", opacity: 0.6 }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(var(--c-line) 1px, transparent 1px), linear-gradient(90deg, var(--c-line) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1.15fr_0.95fr] gap-10 md:gap-12 items-center relative z-10">
        {/* Text — now on LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1"
        >
          <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-3">About</p>
          <h2 className="font-display text-3xl md:text-4xl text-bone mb-5 leading-tight">
            From coursework to<br />production code.
          </h2>

          <p className="text-mute text-[13.5px] leading-relaxed mb-3">
            Java Full Stack Developer from Bengaluru — B.E. Information Science, East Point College
            of Engineering and Technology (CGPA 8.2, Jul 2026).
          </p>
          <p className="text-mute text-[13.5px] leading-relaxed mb-3">
            Aug 2026: AI Engineer Intern at <span className="text-bone">mittoX</span> (Vindox Services Private Limited),
            building AI-powered call operations and CRM automation workflows for customer engagement.
          </p>
          <p className="text-mute text-[13.5px] leading-relaxed mb-3">
            Feb–May 2026: Java Full Stack internship at <span className="text-bone">Dhee Coding Lab</span> (BTM) —
            built full-stack modules with Core Java, JDBC &amp; MySQL using DAO/MVC, plus Servlets,
            Spring Core/MVC and Hibernate/JPA.
          </p>
          <p className="text-mute text-[13.5px] leading-relaxed mb-3">
            50+ DSA on LeetCode · <span className="text-bone">3★ HackerRank Java</span> ·
            24h <span className="text-bone">Odoo × NMIT Hackathon 2025</span> (cloud accounting system).
            I use local LLMs via Ollama and AI-assisted tools to ship faster.
          </p>
          <p className="text-mute text-[13.5px] leading-relaxed">
            Now building internal tools, backend workflows, and AI-assisted product features with a focus on clean data
            flows and user-friendly full-stack experiences.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {TECH_CLUSTERS.map((cluster, ci) => (
              <motion.div
                key={cluster.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.08 + ci * 0.07 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="group p-3.5 rounded-2xl border border-line/50 bg-surface/40 backdrop-blur-sm hover:border-accent/30 hover:bg-surface/60 hover:shadow-[0_8px_24px_var(--c-glow)] transition-all duration-300"
              >
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2.5 font-semibold flex items-center gap-1.5" style={{ color: cluster.color }}>
                  <span className="w-1 h-1 rounded-full" style={{ background: cluster.color }} />
                  {cluster.title}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cluster.items.map((item) => (
                    <span key={item} className="font-mono text-[10px] text-mute px-2 py-1 rounded-full border border-line/40 bg-ink/20 group-hover:border-line/60 group-hover:text-bone transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <TerminalCard />
        </motion.div>

        {/* Photo — now on RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto order-1 md:order-2"
        >
          <PortraitRing />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="max-w-6xl mx-auto px-6 mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 relative z-10"
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-center md:text-left border-t border-line pt-4 cursor-default hover:border-accent/50 transition-all duration-300"
          >
            <p className="font-display text-2xl md:text-3xl text-bone">
              <CountUp to={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
            </p>
            <p className="font-mono text-[10px] tracking-widest uppercase text-mute mt-1.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function TerminalCard() {
  const [command, setCommand] = useState("profile");
  const outputs = {
    profile: "Java developer · product thinker · always learning",
    stack: "React  /  Spring Boot  /  MySQL  /  Git",
    contact: "Available for thoughtful teams and ambitious builds",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="mt-6 overflow-hidden rounded-xl border border-line bg-surface/60"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[10px] text-mute">prashanth@portfolio ~ zsh</span>
      </div>
      <div className="p-4 font-mono text-xs leading-6">
        <p className="text-mute"><span className="text-accent2">➜</span> <span className="text-accent">~</span> whoami</p>
        <p className="text-bone">{outputs[command]}</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {Object.keys(outputs).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCommand(item)}
              className={`rounded-md border px-2.5 py-1 text-[10px] transition-colors ${command === item ? "border-accent text-accent" : "border-line text-mute hover:border-accent/60 hover:text-bone"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="mt-2.5 text-mute"><span className="text-accent2">➜</span> <span className="text-accent">~</span> <span className="animate-pulse">_</span></p>
      </div>
    </motion.div>
  );
}

function PortraitRing() {
  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[360px] md:h-[360px] group">
      <div className="absolute -right-1 top-8 font-mono text-[10px] tracking-widest text-mute leading-5 select-none hidden sm:block text-right">
        <p>BUILD //</p>
        <p>LEARN //</p>
        <p>SHIP //</p>
      </div>
      <DotGrid className="absolute -right-3 -bottom-2 hidden sm:block" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{ border: "1px solid rgba(124,92,255,0.4)", boxShadow: "0 0 25px rgba(124,92,255,0.15), inset 0 0 25px rgba(124,92,255,0.05)" }}
      />
      <div className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100" style={{ boxShadow: "0 0 50px rgba(124,92,255,0.35)" }} />

      <div className="absolute inset-[10px] rounded-full overflow-hidden border border-line bg-surface">
        <img
          src={heroPhoto}
          alt="Prashanth Shetteppanavar"
          className="w-full h-full object-cover transition-all duration-700 ease-out"
          style={{ filter: "grayscale(1) contrast(1.05)" }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0) contrast(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(1) contrast(1.05)")}
        />
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" style={{ background: "radial-gradient(circle at 50% 40%, transparent 40%, var(--c-ink) 100%)", opacity: 0.5 }} />
      </div>
    </div>
  );
}

function DotGrid({ className = "" }) {
  const dots = Array.from({ length: 9 });
  return (
    <div className={`grid grid-cols-3 gap-1.5 ${className}`}>
      {dots.map((_, i) => (
        <span key={i} className="w-[3px] h-[3px] rounded-full bg-mute/50" />
      ))}
    </div>
  );
}
