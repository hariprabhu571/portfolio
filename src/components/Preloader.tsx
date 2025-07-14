import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Preloader mounted');
    const tl = gsap.timeline();

    // Initial state
    gsap.set(logoRef.current, { opacity: 0, y: 50, scale: 0.8 });
    gsap.set(progressBarRef.current, { width: "0%" });

    // Simplified animation sequence
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(progressBarRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        console.log('Progress bar updating...');
      }
    }, "-=0.3")
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        console.log('Preloader animation complete, calling onComplete');
        onComplete();
      }
    }, "+=0.2");

  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="glow-orb w-64 h-64 top-1/4 left-1/4 animate-orbit"></div>
        <div className="glow-orb w-32 h-32 top-3/4 right-1/4 animate-orbit" style={{ animationDelay: '-10s' }}></div>
        <div className="glow-orb w-48 h-48 bottom-1/4 left-1/2 animate-orbit" style={{ animationDelay: '-5s' }}></div>
      </div>

      {/* Logo/Name */}
      <div ref={logoRef} className="text-center mb-8">
        <h1 className="text-6xl md:text-8xl font-bold text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          PORTFOLIO
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mt-4 font-light tracking-wide">
          Hari Raja Prabhu P
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-80 h-1 bg-muted/30 rounded-full overflow-hidden relative">
        <div 
          ref={progressBarRef}
          className="progress-bar h-full rounded-full"
        ></div>
      </div>

      {/* Loading Text */}
      <p className="text-muted-foreground mt-6 text-sm tracking-wider animate-pulse">
        INITIALIZING EXPERIENCE...
      </p>
    </div>
  );
};

export default Preloader;