import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    gsap.set([headlineRef.current, sublineRef.current, ctaRef.current], {
      opacity: 1,
      y: 0,
      filter: "blur(0px)"
    });
  }, []);

  // Scroll to Projects section
  const handleViewWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const projects = document.getElementById('projects');
    if (projects) {
      projects.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Spline 3D Model as Full Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <iframe
          src="https://my.spline.design/orb-q7ueWHTcmMzVfNYskIKvmeev/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full object-cover"
          style={{ background: 'transparent', minHeight: '100vh' }}
          title="3D Animation"
        ></iframe>
        {/* Overlay to hide Spline watermark, flush with bottom, no extra height */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0" style={{ height: '60px', zIndex: 10, background: 'linear-gradient(to top, var(--background), transparent)' }}></div>
      </div>

      {/* Gradient Fade to next section */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 z-20" style={{height: '120px', background: 'linear-gradient(to top, hsl(var(--background)), transparent)'}}></div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 text-center min-h-screen">
        <div ref={headlineRef} className="mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Hi, I'm
            </span>
            <br />
            <span className="text-foreground">Hari Raja Prabhu</span>
          </h1>
        </div>
        <div ref={sublineRef} className="mb-8">
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
            Software Developer crafting immersive digital experiences with cutting-edge technology
          </p>
        </div>
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="neon-button px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300">
            Hire Me
          </button>
          <button
            className="glass-card px-8 py-4 rounded-full text-lg font-semibold border hover:border-primary transition-all duration-300 glassy-btn"
            onClick={handleViewWork}
          >
            View Work
          </button>
        </div>
      </div>

      {/* Arrow Overlay - exactly sized and positioned to cover watermark */}
      <div className="absolute bottom-2 right-3 z-50 flex items-center justify-center" style={{width: '140px', height: '48px'}}>
        <div className="w-full h-full flex items-center justify-center rounded-xl" style={{background: 'rgba(10, 12, 20, 1)', opacity: 1}}>
          <ArrowDown className="text-primary" size={28} style={{opacity: 0.7}} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;