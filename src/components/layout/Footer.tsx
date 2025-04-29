
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.fromTo(
      footer,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="bg-muted py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Portfolio</h2>
            <p className="text-muted-foreground max-w-xs">
              Creating beautiful digital experiences with code and animation.
            </p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="#" 
              className="p-2 bg-background hover:bg-accent/20 text-foreground hover:text-accent rounded-full transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="p-2 bg-background hover:bg-accent/20 text-foreground hover:text-accent rounded-full transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="p-2 bg-background hover:bg-accent/20 text-foreground hover:text-accent rounded-full transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="p-2 bg-background hover:bg-accent/20 text-foreground hover:text-accent rounded-full transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <hr className="my-8 border-border" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
