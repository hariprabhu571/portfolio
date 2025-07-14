import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const experiences = [
    {
      company: "CIRANTA IT SERVICES",
      role: "Software Engineer Intern",
      period: "Jul 2024 – Present",
      location: "Chennai, TN",
      description: [
        "Assisted in the development and maintenance of web and mobile applications, utilizing technologies such as XML, Python, Odoo, Docker, and Flutter.",
        "Actively participated in reviews, team meetings, and contributed to product planning and feature enhancements for both web and mobile platforms."
      ],
      technologies: ["Odoo", "ERP", "Flutter", "Dart", "Python", "Docker"]
    },
    {
      company: "GARUDA AEROSPACE",
      role: "Agro Drone Pilot",
      period: "Nov 2023 - Feb 2024",
      location: "Kendrapara, Odisha",
      description: [
        "Contributed to agricultural drone technology development, focusing on precision farming solutions and IoT integration for smart agriculture."
      ],
      technologies: ["Leadership", "Communication", "Management", "Drone Operations"]
    },
    {
      company: "IIDE",
      role: "Digital Marketing Intern",
      period: "Nov 2022 – Dec 2022",
      location: "Remote",
      description: [
        "Led the successful integration of thoroughly researched target demographics, resulting in a 20% increase in performance.",
        "Achieved an impressive 12% surge in sales revenue through strategic multi-channel digital marketing initiatives."
      ],
      technologies: ["Email Marketing", "SEO", "Market Research & Analysis", "Brand Messaging"]
    },
    {
      company: "HAIMI SOFTTECH",
      role: "Web Developer Intern",
      period: "Sep 2022 – Nov 2022",
      location: "Remote",
      description: [
        "Improved website loading speed by 20% using optimized front-end technologies and worked in HTTP request.",
        "Elevated the company’s online presence with a user-centric web experience, captivating audiences and fostering customer loyalty."
      ],
      technologies: ["HTML", "CSS", "JS", "Reactjs", "Java", "WordPress", "Tailwind"]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Title animation
      gsap.fromTo(".experience-title",
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline line animation
      gsap.fromTo(".timeline-line",
        { height: "0%" },
        {
          height: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );

      // Experience items stagger
      gsap.fromTo(
        ".experience-item",
        { opacity: 0, x: -60, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          },
          onStart: () => {
            // Expand all cards as they animate in
            setExpandedIndexes(Array.from({ length: experiences.length }, (_, i) => i));
          }
        }
      );

      // Floating animation for timeline dots
      gsap.to(".timeline-dot", {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="experience-title text-4xl lg:text-6xl font-bold">
            <span className="text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            My professional journey in crafting innovative solutions
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative w-full">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
            <div className="timeline-line w-full bg-gradient-to-b from-primary via-secondary to-accent opacity-60"></div>
          </div>

          {/* Experience Items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`experience-item relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } ${expandedIndexes.includes(index) ? 'expanded' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full z-10 shadow-glow">
                  <div className="absolute inset-1 bg-background rounded-full"></div>
                </div>

                {/* Connector Line */}
                {index % 2 === 0 ? (
                  // Left card: connector from right edge to dot
                  <div className="hidden lg:block absolute right-1/2 top-1/2 transform -translate-y-1/2 z-0" style={{ width: 'calc(50% - 24px)', height: '2px' }}>
                    <div className="w-full h-full bg-gradient-to-r from-transparent to-primary/60"></div>
                  </div>
                ) : (
                  // Right card: connector from left edge to dot
                  <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-y-1/2 z-0" style={{ width: 'calc(50% - 24px)', height: '2px' }}>
                    <div className="w-full h-full bg-gradient-to-l from-transparent to-primary/60"></div>
                  </div>
                )}

                {/* Content Card */}
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'pr-0 lg:pr-8' : 'pl-0 lg:pl-8'}`}>
                  <div className="glass-card p-4 md:p-8 rounded-2xl transition-all duration-500 group w-full relative bg-transparent backdrop-blur-3xl border border-white/20 shadow-lg overflow-hidden hover:scale-105 hover:ring-2 hover:ring-primary/40 hover:border-primary/80 hover:shadow-[0_0_24px_4px_rgba(80,180,255,0.25)]">
                    
                    {/* Company Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {exp.company}
                        </h3>
                        <p className="text-lg font-semibold text-primary">
                          {exp.role}
                        </p>
                      </div>
                      <Briefcase className="text-muted-foreground group-hover:text-secondary transition-colors duration-300" size={24} />
                    </div>

                    {/* Period and Location */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar size={16} className="mr-2" />
                        <span className="text-sm font-medium">{exp.period}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin size={16} className="mr-2" />
                        <span className="text-sm font-medium">{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className={`text-muted-foreground leading-relaxed list-disc list-inside space-y-1 max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-out transform translate-y-2 ${expandedIndexes.includes(index) ? 'max-h-40 opacity-100 mb-6 translate-y-0' : ''}`}>
                      {Array.isArray(exp.description)
                        ? exp.description.map((line, i) => <li key={i}>{line}</li>)
                        : <li>{exp.description}</li>}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;