import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A fully responsive e-commerce platform built with React and Node.js.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Portfolio Website',
    description: 'A creative portfolio website with smooth animations and interactive elements.',
    tags: ['React', 'GSAP', 'Tailwind CSS'],
  },
  {
    title: 'Task Management App',
    description: 'A productivity app to help users organize and track their daily tasks.',
    tags: ['React', 'Firebase', 'Material UI'],
  },
  {
    title: 'Travel Blog',
    description: 'A blog website for sharing travel experiences with a custom CMS.',
    tags: ['Next.js', 'GraphQL', 'Styled Components'],
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const projectElements = projectRefs.current.filter(Boolean);

    if (!section || !heading || projectElements.length === 0) return;

    // Set initial states
    gsap.set(heading, { y: 50, opacity: 0 });
    gsap.set(projectElements, { y: 50, opacity: 0, scale: 0.95 });

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

    // Projects animation with bidirectional scroll trigger
    projectElements.forEach((project, index) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top bottom-=50",
          end: "bottom center",
          scrub: 0.5,
          toggleActions: "play reverse play reverse",
        }
      }).to(project, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: index * 0.05,
        ease: 'power2.out',
      });

      // Hover animation setup - keep this as is since it's interactive
      if (project) {
        project.addEventListener('mouseenter', () => {
          gsap.to(project, {
            y: -10,
            scale: 1.03,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        project.addEventListener('mouseleave', () => {
          gsap.to(project, {
            y: 0,
            scale: 1,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(false));
      projectElements.forEach(project => {
        if (project) {
          project.removeEventListener('mouseenter', () => {});
          project.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section bg-muted/30">
      <div className="container">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Recent Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => projectRefs.current[index] = el}
              className={cn(
                "bg-card border border-border rounded-lg p-6 shadow-md transition-all duration-300",
                "hover:shadow-lg cursor-pointer group"
              )}
            >
              <div className="w-full aspect-video bg-muted rounded-md mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground/50 group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <a 
            href="#" 
            className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
