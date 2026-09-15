import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

const FIRST_NAME = "Prashanth";
const LAST_NAME = "Shetteppanavar";

const ROLES = [
  "Java Developer",
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Developer",
  "Software Developer",
  "React Developer",
  "Spring Developer",
];

function GlowButton({ href, target, rel, download, children, filled = false }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      download={download}
      data-cursor="link"
      className={`group relative font-mono text-[10px] md:text-xs tracking-[0.18em] uppercase rounded-full overflow-hidden transition-all duration-300 ${
        filled
          ? "px-7 py-3.5 bg-accent text-white hover:shadow-[0_0_30px_rgba(124,92,255,0.5)] hover:scale-[1.03]"
          : "px-6 py-3 border border-line/60 text-bone hover:border-accent/60 hover:text-accent hover:scale-[1.03]"
      }`}
    >
      {filled && (
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)" }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2.5 font-medium">
        {children}
      </span>
    </a>
  );
}

function MagneticLetter({ ch, i }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.span
      initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.6,
        delay: 0.2 + i * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="inline-block cursor-default"
      style={{
        color: hover ? "var(--c-accent)" : "var(--c-bone)",
        textShadow: hover ? "0 0 50px rgba(124,92,255,0.6)" : "none",
        transform: hover ? "translateY(-3px) scale(1.05)" : "none",
        transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease, text-shadow 0.3s ease",
      }}
    >
      {ch === " " ? "\u00A0" : ch}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════
   ROTATING ROLE TYPOGRAPHY
   ═══════════════════════════════════════════════════ */
function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [display, setDisplay] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = ROLES[index];
    let timer;

    if (!isDeleting && !isPaused) {
      if (display.length < current.length) {
        timer = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 85);
      } else {
        timer = setTimeout(() => setIsPaused(true), 2200);
      }
    } else if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 400);
    } else if (isDeleting) {
      if (display.length > 0) {
        timer = setTimeout(() => setDisplay(display.slice(0, -1)), 35);
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [display, isDeleting, isPaused, index]);

  return (
    <span className="inline-flex items-center gap-0">
      <span className="text-accent font-mono text-sm md:text-base lg:text-lg mr-1">{">"}</span>
      <span className="font-display text-base md:text-xl lg:text-2xl tracking-wide text-bone font-semibold min-w-0">
        {display}
      </span>
      <motion.span
        className="inline-block w-[2px] h-[1.1em] bg-accent ml-0.5 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.0, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
    >
      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-mute/50">Scroll</span>
      <div className="w-5 h-8 rounded-full border border-line/40 flex items-start justify-center p-1.5">
        <motion.div
          className="w-1 h-1.5 rounded-full bg-accent"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO RIGHT — single clean editor, no overlap
   ═══════════════════════════════════════════════════ */
function CodeStack() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 16, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 16, damping: 20 });

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(((e.clientX / window.innerWidth) * 2 - 1) * 6);
      mouseY.set(((e.clientY / window.innerHeight) * 2 - 1) * 6);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: springX, y: springY }}
        className="relative w-[92vw] max-w-[320px] sm:max-w-[380px] md:max-w-[440px]"
      >
      <div className="absolute -inset-6 rounded-[28px] pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, var(--c-glow), transparent 70%)", filter: "blur(28px)", opacity: 0.95 }} />

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative rounded-2xl border border-line/50 bg-surface/95 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-center gap-1.5 px-3 sm:px-4 py-3 border-b border-line/40 bg-ink/30">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10px] tracking-wide text-mute truncate">FullStack.java — prashanth/portfolio</span>
        </div>

        <div className="p-3 sm:p-5 font-mono text-[11px] sm:text-xs leading-6 overflow-x-auto">
          <div className="flex gap-2 sm:gap-3 min-w-0">
            <span className="select-none text-mute/40 text-right leading-6 hidden sm:block" style={{ lineHeight: "1.5rem" }}>
              1<br />2<br />3<br />4<br />5<br />6<br />7<br />8
            </span>
            <div className="flex-1 leading-6 min-w-0">
              <div className="truncate"><span className="text-accent">@RestController</span></div>
              <div className="truncate"><span className="text-bone">public class UserController {"{"}</span></div>
              <div className="truncate"><span className="text-mute">  </span><span className="text-accent">@GetMapping</span><span className="text-accent2">(“/api/users”)</span></div>
              <div className="truncate"><span className="text-bone">  List&lt;User&gt; all() {"{"}</span></div>
              <div className="truncate"><span className="text-accent2">    return</span><span className="text-mute"> repo.findAll();</span></div>
              <div><span className="text-bone">  {"}"}</span></div>
              <div className="truncate"><span className="text-mute">  </span><span className="text-bone">// React → fetch → MySQL</span></div>
              <div><span className="text-bone">{"}"}</span> <motion.span className="inline-block w-1.5 h-3.5 bg-accent ml-1 align-middle" animate={{ opacity: [1, 0] }} transition={{ duration: 0.55, repeat: Infinity }} /></div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 px-3 sm:px-4 py-2.5 border-t border-line/30 bg-ink/20">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] tracking-wide text-mute">Build successful · 4 projects · 50+ DSA</span>
          <span className="ml-auto font-mono text-[8px] sm:text-[9px] tracking-widest uppercase text-accent/60">Java · Spring · React · MySQL</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 55% 40% at 50% 45%, var(--c-glow), transparent 55%)" }}
        />
        <div
          className="absolute w-[500px] h-[500px] -top-[180px] -left-[180px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--c-accent) 0%, transparent 70%)",
            opacity: 0.04,
            animation: "auroraFloat 20s ease-in-out infinite",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] -bottom-[120px] -right-[120px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--c-accent2) 0%, transparent 70%)",
            opacity: 0.03,
            animation: "auroraFloat 24s ease-in-out infinite reverse",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--c-line) 1px, transparent 1px), linear-gradient(90deg, var(--c-line) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.04,
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16"
        style={{ y: parallaxY }}
      >
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-6 xl:gap-14 min-h-[85vh] pt-20 pb-16">

          {/* ─── LEFT: Identity ─── */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center gap-3 mb-7 px-4 py-2 rounded-full border border-line/50 bg-surface/70 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-mute">
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <div className="mb-2 select-none">
              <h1 aria-label="Prashanth Shetteppanavar" className="font-display text-[13vw] md:text-[7.5vw] lg:text-[5.5vw] xl:text-[5vw] font-bold leading-[0.86] tracking-tight">
                {FIRST_NAME.split("").map((ch, i) => (
                  <MagneticLetter key={i} ch={ch} i={i} />
                ))}
                <motion.span
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={{ opacity: 0.6, clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-display text-[4.5vw] md:text-[2.5vw] lg:text-[1.8vw] xl:text-[1.5vw] text-bone uppercase font-light tracking-[0.2em] -mt-0.5"
              >
                {LAST_NAME}
                </motion.span>
              </h1>
            </div>

            {/* Rotating role */}
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 h-10 flex items-center"
            >
              <RotatingRole />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-5 font-body text-mute text-sm md:text-base leading-relaxed max-w-md"
            >
              Building <span className="text-bone font-medium">full-stack applications</span> with
              Java, Spring, Hibernate, MySQL and React.
            </motion.p>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-3 font-body text-mute text-xs md:text-sm tracking-wide flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5 text-accent2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Bengaluru, India
            </motion.p>

            {/* CTAs — View + Download */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <GlowButton href="#projects" filled>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                View Work
              </GlowButton>
              <GlowButton href="/Prashanth_Shetteppanavar_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5l-3 3m0 0l-3-3m3 3V8.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Resume
              </GlowButton>
              <GlowButton href="/Prashanth_Shetteppanavar_Resume.pdf" download="Prashanth_Shetteppanavar_Resume.pdf">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0-4.5-4.5M12 16l4.5-4.5M4 21h16" />
                </svg>
                Download
              </GlowButton>
            </motion.div>
          </div>

          {/* ─── RIGHT: Floating Code Stack ─── */}
          <div className="flex-1 flex items-center justify-center relative mt-4 lg:mt-0">
            <CodeStack />
          </div>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
