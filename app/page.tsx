import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import NameBand from "./components/NameBand";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import Stack from "./components/Stack";

/**
 * UI only — every section renders in its default (unfiltered) state.
 *
 * To wire the technology filter: add `"use client"` at the top of this file,
 * hold `activeTech` in state (or read it from `?tech=`), and pass it down:
 *
 *   <Stack activeTech={activeTech} onSelectTech={toggleTech} />
 *   <Projects
 *     projects={activeTech ? projects.filter((p) => p.tech.includes(activeTech)) : projects}
 *     activeTech={activeTech}
 *     filterCount={...}
 *     onSelectTech={toggleTech}
 *     onClearTech={() => setActiveTech(null)}
 *   />
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Stack />
        <Experience />
        <Projects />
        <NameBand />
        <Contact />
      </main>
    </>
  );
}
