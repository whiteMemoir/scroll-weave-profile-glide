
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register the plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subheadingRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const cta = ctaRef.current;

    if (!section || !heading || !subheading || !cta) return;

    // Initial animation for hero entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Custom SplitText implementation since we don't have the actual plugin
    const splitHeading = () => {
      const text = heading.innerText;
      heading.innerHTML = '';
      const words = text.split(' ');
      
      words.forEach((word, i) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'reveal-text mr-[0.25em]';
        
        const innerSpan = document.createElement('span');
        innerSpan.innerText = word;
        innerSpan.className = 'inline-block';
        
        wordSpan.appendChild(innerSpan);
        heading.appendChild(wordSpan);
        
        // Add a space after each word except the last one
        if (i < words.length - 1) {
          const space = document.createTextNode(' ');
          heading.appendChild(space);
        }
      });

      return heading.querySelectorAll('.reveal-text span');
    };
    
    const splitSubheading = () => {
      const text = subheading.innerText;
      subheading.innerHTML = '';
      const words = text.split(' ');
      
      words.forEach((word, i) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'reveal-text mr-[0.25em]';
        
        const innerSpan = document.createElement('span');
        innerSpan.innerText = word;
        innerSpan.className = 'inline-block';
        
        wordSpan.appendChild(innerSpan);
        subheading.appendChild(wordSpan);
        
        // Add a space after each word except the last one
        if (i < words.length - 1) {
          const space = document.createTextNode(' ');
          subheading.appendChild(space);
        }
      });

      return subheading.querySelectorAll('.reveal-text span');
    };

    const headingWords = splitHeading();
    const subheadingWords = splitSubheading();

    // Animation timeline
    tl.set([headingWords, subheadingWords], { y: '100%', opacity: 0 });
    tl.to(headingWords, { 
      y: '0%', 
      opacity: 1, 
      duration: 0.8, 
      stagger: 0.1,
      ease: 'power3.out' 
    });
    tl.to(subheadingWords, { 
      y: '0%', 
      opacity: 1, 
      duration: 0.6, 
      stagger: 0.05,
      ease: 'power3.out' 
    }, '-=0.4');
    tl.fromTo(cta, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      '-=0.2'
    );

    // Scroll animation
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      opacity: 0.5,
      y: 100,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--accent)/0.08)_0,rgba(var(--accent)/0)_50%)]"></div>
      </div>
      
      <div className="container relative z-10 flex flex-col items-center text-center">
        <h1 
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          Creative Developer & Designer
        </h1>
        <p 
          ref={subheadingRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          I build engaging digital experiences with beautiful animations and solid code.
        </p>
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <a 
            href="#projects" 
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all transform hover:translate-y-[-2px]"
          >
            View My Work
          </a>
          <a 
            href="#contact" 
            className="px-6 py-3 bg-transparent border border-primary hover:bg-primary/10 text-primary rounded-lg transition-all transform hover:translate-y-[-2px]"
          >
            Contact Me
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center animate-bounce">
          <p className="text-sm text-muted-foreground mb-2">Scroll Down</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
