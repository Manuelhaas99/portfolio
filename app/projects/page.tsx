import type { Metadata } from "next";
import Contact from "../components/Contact";
import Nav from "../components/Nav";
import Projects from "../components/Projects";
import { projects } from "../data/portfolio";

export const metadata: Metadata = { title: "All projects · Manuel Haas" };

/**
 * Placeholder route for the `see all projects →` pill — the all-projects page
 * has not been designed yet, so it reuses the section as-is with the full list.
 * A server component rendering client components: metadata stays server-side,
 * the sections still read the language context on the client.
 */
export default function AllProjectsPage() {
  return (
    <>
      <Nav />
      <main className="pt-[56px]">
        <Projects projects={projects} />
        <Contact />
      </main>
    </>
  );
}
