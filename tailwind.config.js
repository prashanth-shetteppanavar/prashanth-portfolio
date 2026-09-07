/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--c-ink)",
        surface: "var(--c-surface)",
        line: "var(--c-line)",
        bone: "var(--c-bone)",
        mute: "var(--c-mute)",
        accent: "var(--c-accent)",
        accent2: "var(--c-accent2)",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
