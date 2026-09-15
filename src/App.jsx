import { useState, useEffect, useCallback, useRef } from "react";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import SocialRail from "./components/SocialRail";
import CommandPalette from "./components/CommandPalette";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import GithubStats from "./components/GithubStats";
import Certificates from "./components/Certificates";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import ProjectPage from "./components/ProjectPage";
import WhatIBuild from "./components/WhatIBuild";

function NotFoundPage() {
  return (
    <main className="min-h-screen bg-ink px-6 py-32 text-bone">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-accent">404</p>
        <h1 className="mt-4 font-display text-4xl">Page not found</h1>
        <p className="mt-4 max-w-md text-mute">The page you requested does not exist.</p>
        <div className="mt-8 flex flex-wrap gap-5 font-mono text-xs uppercase tracking-widest">
          <a className="text-accent hover:text-bone" href="/">Return home -&gt;</a>
          <a className="text-accent hover:text-bone" href="/#projects">View projects -&gt;</a>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const forceExit = useRef(false);

  const handleDone = useCallback(() => {
    if (forceExit.current) return;
    forceExit.current = true;
    setLoaded(true);
  }, []);

  useEffect(() => {
    const HARD_MAX = 3200;
    const timer = setTimeout(() => {
      if (!forceExit.current) {
        forceExit.current = true;
        setLoaded(true);
      }
    }, HARD_MAX);
    return () => clearTimeout(timer);
  }, []);

  const projectMatch = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/);
  if (projectMatch) return <ProjectPage slug={projectMatch[1]} />;
  if (window.location.pathname !== "/") return <NotFoundPage />;

  return (
    <div className="relative bg-ink">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-bone">
        Skip to main content
      </a>
      <CustomCursor />
      {!loaded && <Loader onDone={handleDone} />}
      {loaded && (
        <>
          <ScrollProgress />
          <SocialRail />
          <CommandPalette />
        </>
      )}
      <Navbar />
      <main id="main-content">
        <Hero />
        <WhatIBuild />
        <About />
        <Education />
        <Skills />
        <Projects />
        <GithubStats />
        <Certificates />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
