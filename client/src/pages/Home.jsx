import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Architecture from '../sections/Architecture';
import BuildWithMe from '../sections/BuildWithMe';
import Education from '../sections/Education';
import Certifications from '../sections/Certifications';
import WhatIBring from '../sections/WhatIBring';
import Terminal from '../sections/Terminal';
import Resume from '../sections/Resume';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import { trackEvent } from '../services/api';

export default function Home() {
  useEffect(() => {
    trackEvent('page_visit', { page: 'home' });
  }, []);

  return (
    <>
      {/* Subtle dot grid background */}
      <div className="bg-grid" aria-hidden="true" />
      
      <Navbar />
      
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="architecture">
          <Architecture />
        </section>

        <section id="build">
          <BuildWithMe />
        </section>

        <section id="education">
          <Education />
        </section>

        <section id="certifications">
          <Certifications />
        </section>

        <section id="bring">
          <WhatIBring />
        </section>

        <section id="terminal">
          <Terminal />
        </section>

        <section id="resume">
          <Resume />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />

      {/* AI Portfolio Assistant — floating chat widget */}
      <AIAssistant />
    </>
  );
}
