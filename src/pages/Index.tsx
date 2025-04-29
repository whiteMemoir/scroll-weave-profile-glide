
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import layout components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import section components
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

// Import utility components
import ScrollToTop from '@/components/ScrollToTop';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  // Initialize ScrollTrigger and set up smooth scrolling
  useEffect(() => {
    // Refresh ScrollTrigger to ensure all animations work properly
    ScrollTrigger.refresh();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(false));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
