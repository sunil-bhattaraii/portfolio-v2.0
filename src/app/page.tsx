import Hero from '../sections/Hero';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Qualifications from '../sections/Qualifications';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import About from '@/sections/About';
import ContactFooter from '@/components/contact/ContactFooter';
import { getSiteConfig } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const config = await getSiteConfig();
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Qualifications />
      <Contact />
      <ContactFooter version={config?.version ?? ''} />
    </main>
  );
}
