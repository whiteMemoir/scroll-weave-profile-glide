
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface UseScrollTriggerOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  pin?: boolean;
  anticipatePin?: number;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export const useGSAPScrollTrigger = (
  animation: gsap.core.Timeline | gsap.core.Tween | null,
  options: UseScrollTriggerOptions = {},
  dependencies: any[] = []
) => {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!animation) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: options.trigger || '.gsap-scroll-trigger',
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: options.scrub !== undefined ? options.scrub : false,
      markers: options.markers || false,
      toggleActions: options.toggleActions || 'play none none none',
      pin: options.pin || false,
      anticipatePin: options.anticipatePin || 0,
      animation,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onEnterBack: options.onEnterBack,
      onLeaveBack: options.onLeaveBack,
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, dependencies);

  return scrollTriggerRef;
};
