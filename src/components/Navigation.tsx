import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

const mainNavItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

const moreNavItems = [
  { name: 'Education', href: '#education' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Gallery', href: '#gallery' }
];

const allNavItems = [
  ...mainNavItems.slice(0, 4),
  ...moreNavItems,
  ...mainNavItems.slice(4)
];

function getCurrentSection() {
  if (typeof window === 'undefined') return 'Home';
  const offsets = [...mainNavItems, ...moreNavItems].map(item => {
    const el = document.querySelector(item.href);
    if (!el) return { name: item.name, offset: Infinity };
    return { name: item.name, offset: Math.abs((el as HTMLElement).getBoundingClientRect().top) };
  });
  offsets.sort((a, b) => a.offset - b.offset);
  return offsets[0].name;
}

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('Home');
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setActiveSection(getCurrentSection());
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      gsap.fromTo('.mobile-nav-item', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }
      );
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-transparent">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Nav Links - Only active is glassy */}
          <div className="hidden md:flex items-center space-x-2 py-2 px-2 mr-auto ml-8">
            {mainNavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={
                  item.name === activeSection
                    ? 'glassy-nav px-6 py-2 font-medium tracking-wide text-white transition-all duration-200'
                    : 'text-muted-foreground font-medium tracking-wide px-4 py-2 transition-all duration-200 opacity-60 hover:opacity-100'
                }
                style={{ borderRadius: '9999px' }}
              >
                {item.name}
              </a>
            ))}
            {/* More Dropdown */}
            <div className="relative group">
              <button
                className={
                  moreNavItems.some(item => item.name === activeSection)
                    ? 'glassy-nav px-6 py-2 font-medium tracking-wide text-white flex items-center transition-all duration-200'
                    : 'text-muted-foreground font-medium tracking-wide px-4 py-2 flex items-center transition-all duration-200 opacity-60 hover:opacity-100'
                }
                style={{ borderRadius: '9999px' }}
                onClick={() => setIsMoreOpen((v) => !v)}
                onBlur={() => setTimeout(() => setIsMoreOpen(false), 150)}
              >
                More <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {/* Dropdown Menu */}
              <div className={`absolute left-0 mt-2 min-w-[180px] bg-background/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/10 py-2 z-50 transition-all duration-200 ${isMoreOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'}`}>
                {moreNavItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={
                      item.name === activeSection
                        ? 'block px-6 py-2 font-medium text-primary bg-primary/10 rounded-lg'
                        : 'block px-6 py-2 font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200'
                    }
                    style={{ borderRadius: '0.5rem' }}
                    onClick={() => setIsMoreOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links & Hire Me - Each as glassy button */}
          <div className="hidden md:flex items-center space-x-4 ml-auto mr-8">
            <a
              href="https://github.com/hariprabhu571"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glassy-btn flex items-center justify-center"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/hari-raja-prabhu/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glassy-btn flex items-center justify-center"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://drive.google.com/file/d/1je5jzUPOhPxvvYQTXIH8bT1j15b16sam/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button px-6 py-2 glassy-btn text-sm font-semibold flex items-center justify-center"
            >
              View Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg glassy-btn"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {allNavItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={
                    item.name === activeSection
                      ? 'mobile-nav-item glassy-nav px-8 py-3 text-2xl font-medium text-white transition-all duration-200'
                      : 'mobile-nav-item text-2xl font-medium text-muted-foreground transition-all duration-200 opacity-60 hover:opacity-100'
                  }
                  style={{ borderRadius: '9999px' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center space-x-6 mt-8">
                <a
                  href="https://github.com/hariprabhu571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glassy-btn flex items-center justify-center"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/hari-raja-prabhu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glassy-btn flex items-center justify-center"
                >
                  <Linkedin size={24} />
                </a>
              </div>
              <button className="neon-button px-8 py-3 glassy-btn text-lg font-semibold mt-6 flex items-center justify-center">
                <a
                  href="https://drive.google.com/file/d/1je5jzUPOhPxvvYQTXIH8bT1j15b16sam/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full block"
                >
                  View Resume
                </a>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator"
        style={{ width: `${(scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}
      ></div>
    </>
  );
};

export default Navigation;