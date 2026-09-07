import { AnimatePresence, motion } from "framer-motion";

export default function Lightbox({ src, alt, onClose }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-14"
          style={{ background: "rgba(10,11,14,0.92)", backdropFilter: "blur(6px)" }}
        >
          <motion.img
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full rounded-xl border border-line object-contain"
          />
          <button
            onClick={onClose}
            aria-label="Close"
            data-cursor="link"
            className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 rounded-full border border-line flex items-center justify-center text-bone hover:border-accent hover:text-accent transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
