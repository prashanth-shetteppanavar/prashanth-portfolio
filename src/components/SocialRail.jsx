import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/prashanth-shetteppanavar",
    icon: <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.3-.52-1.49.11-3.1 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.61.24 2.8.12 3.1.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.18 0 1.57-.02 2.84-.02 3.23 0 .3.2.66.79.55A10.5 10.5 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/prashanth-shetteppanavar-b680712a3/",
    icon: (
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.24 8.25h4.5V23h-4.5V8.25ZM8.5 8.25h4.32v2.02h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.86V23h-4.5v-6.36c0-1.52-.03-3.47-2.11-3.47-2.12 0-2.45 1.66-2.45 3.37V23H8.5V8.25Z" />
    ),
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/prashanth_shetteppanavar/",
    icon: (
      <path d="M13.48 1.1c.51-.53 1.35-.55 1.9-.05.53.5.56 1.35.06 1.9L10 8.4l3.87 3.87a1.33 1.33 0 1 1-1.88 1.88L7.24 9.4a2.67 2.67 0 0 1 0-3.77l6.24-6.53Zm-3.1 9.42 2.6 2.6a5.33 5.33 0 1 0 0 7.55l1.06-1.06a1.33 1.33 0 1 0-1.88-1.88l-1.06 1.06a2.67 2.67 0 1 1 0-3.77l1.06 1.06a1.33 1.33 0 1 0 1.88-1.88l-2.6-2.6-1.06.92Z" />
    ),
  },
];

export default function SocialRail() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 2.8 }}
      className="hidden lg:flex fixed left-6 bottom-0 z-40 flex-col items-center gap-5"
    >
      {SOCIALS.map((s) => (
        <Magnetic key={s.label} strength={0.5}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            data-cursor="link"
            className="text-mute hover:text-accent transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              {s.icon}
            </svg>
          </a>
        </Magnetic>
      ))}
      <div className="w-px h-20 bg-line" />
    </motion.div>
  );
}
