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

  return (
    <div className="relative bg-ink">
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
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <GithubStats />
      <Certificates />
      <Experience />
      <Contact />
    </div>
  );
}
