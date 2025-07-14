import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Footer slide up animation
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating particles animation
      gsap.to(".particle", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer ref={footerRef} className="relative py-16 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          
          {/* Brand */}
          <div className="flex-2 text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Every pixel here has a story.
              </span>
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              The next one could be yours — let’s create something remarkable.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 text-center">
            <h4 className="text-lg font-semibold mb-6 text-foreground">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="flex-1 text-center md:text-right">
            <h4 className="text-lg font-semibold mb-6 text-foreground">Let's Connect</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-6">
              <a
                href="https://github.com/hariprabhu571"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card hover:scale-110 hover:text-primary transition-all duration-300 group"
              >
                <Github size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/hari-raja-prabhu/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card hover:scale-110 hover:text-primary transition-all duration-300 group"
              >
                <Linkedin size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hariprabhu571@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card hover:scale-110 hover:text-primary transition-all duration-300 group"
              >
                <Mail size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="glass-card p-3 rounded-xl hover:scale-110 hover:text-primary transition-all duration-300"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-muted-foreground text-sm w-full text-center">
            © 2025 Hari Raja Prabhu P. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;