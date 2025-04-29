
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Header = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const menuItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', clearProps: 'all' }
    );

    const links = header.querySelectorAll('.nav-link');
    gsap.fromTo(
      links,
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: 'power2.out',
        delay: 0.3,
        clearProps: 'all'
      }
    );

    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('bg-background/80', 'backdrop-blur-sm', 'shadow-sm');
      } else {
        header.classList.remove('bg-background/80', 'backdrop-blur-sm', 'shadow-sm');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/"
          className="text-xl md:text-2xl font-bold tracking-tight text-primary hover:text-accent transition-colors"
        >
          Portfolio
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="nav-link text-sm text-foreground/80 hover:text-accent transition-colors relative overflow-hidden group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        <button className="md:hidden text-foreground/80 hover:text-accent">
          <span className="sr-only">Menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
