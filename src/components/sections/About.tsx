
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const text = textRef.current;
    const image = imageRef.current;

    if (!section || !heading || !text || !image) return;

    // Heading animation
    gsap.fromTo(
      heading,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: heading,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );

    // Text paragraphs animation
    const paragraphs = text.querySelectorAll('p');
    gsap.fromTo(
      paragraphs,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: text,
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
        },
      }
    );

    // Image animation
    gsap.fromTo(
      image,
      { 
        x: 50, 
        opacity: 0,
        scale: 0.9
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: image,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(false));
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section bg-muted/30">
      <div className="container">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          About Me
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div ref={textRef} className="space-y-4">
            <p className="text-lg">
              Hello! I'm a passionate frontend developer and designer with a love for creating 
              beautiful, interactive experiences on the web.
            </p>
            <p>
              My journey in web development started over 5 years ago, and I've 
              since worked on various projects ranging from small business websites to 
              complex web applications.
            </p>
            <p>
              I specialize in modern JavaScript frameworks like React, and I have 
              a keen eye for design and animation. I believe that great websites should 
              not only look good but also provide seamless user experiences.
            </p>
            <p>
              When I'm not coding, you can find me exploring new design trends, 
              learning new technologies, or enjoying outdoor activities.
            </p>
          </div>
          
          <div ref={imageRef} className="relative">
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
