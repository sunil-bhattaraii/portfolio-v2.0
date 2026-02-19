import Hero from '../sections/Hero';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Qualifications from '../sections/Qualifications';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import About from '@/sections/About';

export default function Home() {
  return (
    <main>
      <Hero />
      <About/>
      <Skills />
      <Experience />
      <Qualifications />
      <Projects />
      <Contact />
    </main>
  );
}
