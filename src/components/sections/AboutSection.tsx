import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Globe, Smartphone, Cloud, Wrench, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skillGroups = [
    {
      icon: Code,
      name: 'Frontend',
      color: 'text-blue-400',
      skills: ['HTML5', 'CSS3', 'JS', 'React']
    },
    {
      icon: Database,
      name: 'Backend',
      color: 'text-green-400',
      skills: ['Java', 'C++', 'SQL']
    },
    {
      icon: Database,
      name: 'Database',
      color: 'text-yellow-400',
      skills: ['SQL', 'Sqflite']
    },
    {
      icon: Smartphone,
      name: 'Mobile',
      color: 'text-pink-400',
      skills: ['Flutter', 'Dart']
    },
    {
      icon: Cloud,
      name: 'Cloud',
      color: 'text-cyan-400',
      skills: ['AWS']
    },
    {
      icon: Wrench,
      name: 'Tools/Platforms',
      color: 'text-purple-400',
      skills: ['Visual Studio Code', 'IntelliJ', 'Docker', 'GitHub', 'Android Studio']
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Section fade in
      gsap.fromTo(sectionRef.current,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -60, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Skills stagger animation
      gsap.fromTo(".skill-item",
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-60 h-60 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] mx-auto lg:mx-0">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30 animate-pulse-glow"></div>
              
              {/* Image container */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden glass-card p-1">
                <img 
                  src="/mine/photoprofile7.png"
                  alt="Hari Raja Prabhu P"
                  className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-floating opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-floating opacity-60" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="text-center lg:text-left">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I’m not a fan of long introductions.<br/>
                But if you’ve landed here, here’s what you should know:
              </p>
              <p>
                I like systems that work, ideas that matter, and people who move things forward with intent.<br/>
                I question defaults, simplify the complex, and believe execution &gt; intention.
              </p>
              <p>
                Titles change. Tools evolve. Trends fade.<br/>
                But curiosity, clarity, and consistency? That’s what I carry with me.
              </p>
              <p>
                This space isn’t a highlight reel — it’s a snapshot of momentum.<br/>
                You’re welcome to look around. Or build something better with me.
              </p>
            </div>

            {/* Tech Stack */}
            <div ref={skillsRef} className="mt-12">
              <h3 className="text-2xl font-semibold mb-8 text-center lg:text-left">Tech Expertise</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillGroups.map((group, index) => (
                  <div
                    key={group.name}
                    className="skill-item group glassy-card p-6 rounded-2xl text-center transition-all duration-300 cursor-pointer relative overflow-visible"
                  >
                    <group.icon className={`w-8 h-8 mx-auto mb-3 ${group.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-lg font-semibold">{group.name}</span>
                    <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 overflow-hidden mt-3">
                      <ul className="flex flex-wrap justify-center gap-2">
                        {group.skills.map((s) => (
                          <li key={s} className="bg-muted/30 px-3 py-1 rounded-full text-xs font-medium text-muted-foreground border border-border/30">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;