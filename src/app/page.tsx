import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Experience } from "@/components/experience/Experience";
import { Skills } from "@/components/skills/Skills";
import { Projects } from "@/components/projects/Projects";
import { AiAutomation } from "@/components/ai/AiAutomation";
import { Education } from "@/components/education/Education";
import { Contact } from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <AiAutomation />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
