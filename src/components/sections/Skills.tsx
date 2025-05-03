
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'HTML/CSS', level: 95 },
  { name: 'UI/UX Design', level: 75 },
  { name: 'GSAP Animation', level: 70 },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const skillsContainer = skillsRef.current;

    if (!section || !heading || !skillsContainer) return;

    // Set initial states
    gsap.set(heading, { y: 50, opacity: 0 });

    // Heading animation with bidirectional scroll trigger
    gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: "top bottom-=100",
        end: "bottom center",
        scrub: 0.5,
        toggleActions: "play reverse play reverse",
      }
    }).to(heading, {
      y: 0,
      opacity: 1,
      duration: 0.5,
    });

    // Skills bars animation with bidirectional scroll trigger
    const skillBars = skillsContainer.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar) => {
      const progressBar = bar.querySelector('.progress-bar');
      const percentEl = bar.querySelector('.percent');
      const targetWidth = progressBar?.getAttribute('data-width');
      
      if (!progressBar || !percentEl || !targetWidth) return;
      
      gsap.set(progressBar, { width: 0 });
      gsap.set(percentEl, { textContent: '0%' });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bar,
          start: "top bottom-=100",
          end: "bottom center",
          scrub: 0.5,
          toggleActions: "play reverse play reverse",
        }
      });

      tl.to(progressBar, {
        width: targetWidth,
        duration: 0.7,
        ease: 'power2.out',
      });
      
      tl.to(percentEl, {
        textContent: targetWidth,
        duration: 0.7,
        ease: 'power2.out',
        onUpdate: function() {
          percentEl.textContent = `${Math.round(gsap.getProperty(progressBar, "width") / gsap.getProperty(progressBar.parentNode, "width") * 100)}%`;
        },
      }, "<");
    });

    // SVG animation with bidirectional scroll trigger
    const svgSection = section.querySelector('.svg-animation');
    const paths = svgSection?.querySelectorAll('path');
    
    if (paths) {
      paths.forEach((path) => {
        const length = path.getTotalLength();
        
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        
        gsap.timeline({
          scrollTrigger: {
            trigger: svgSection,
            start: "top bottom-=100",
            end: "bottom center",
            scrub: 0.5,
            toggleActions: "play reverse play reverse",
          }
        }).to(path, {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power2.out',
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(false));
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section">
      <div className="container">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          My Skills
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div ref={skillsRef} className="space-y-8">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2 skill-progress">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{skill.name}</h3>
                  <span className="text-sm font-medium percent">0%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full progress-bar"
                    data-width={`${skill.level}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="svg-animation flex items-center justify-center">
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="svg-path" d="M150,50 C93.75,50 50,93.75 50,150 C50,206.25 93.75,250 150,250 C206.25,250 250,206.25 250,150 C250,93.75 206.25,50 150,50 Z" />
              <path className="svg-path" d="M150,70 C105,70 70,105 70,150 C70,195 105,230 150,230 C195,230 230,195 230,150 C230,105 195,70 150,70 Z" />
              <path className="svg-path" d="M150,90 C116.25,90 90,116.25 90,150 C90,183.75 116.25,210 150,210 C183.75,210 210,183.75 210,150 C210,116.25 183.75,90 150,90 Z" />
              <path className="svg-path" d="M150,110 C127.5,110 110,127.5 110,150 C110,172.5 127.5,190 150,190 C172.5,190 190,172.5 190,150 C190,127.5 172.5,110 150,110 Z" />
              <path className="svg-path" d="M50,150 L250,150" />
              <path className="svg-path" d="M150,50 L150,250" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
