import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Calendar, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const certifications = [
    {
      title: "Wipro Certified Java Full Stack Developer",
      platform: "Wipro",
      date: "Oct 2024",
      description: "End-to-end web development using Java technologies and modern frameworks.",
      badge: "wipro",
      url: "https://drive.google.com/file/d/1grtmL8RPynaooauDBi-MM1DTrS2oPXYz/view?usp=sharing"
    },
    {
      title: "The Ultimate 2025 Fullstack Web Development Bootcamp",
      platform: "Udemy",
      date: "Jun 2022",
      description: "Full-stack web development course to build real-world projects.",
      badge: "udemy",
      url: "https://www.udemy.com/certificate/UC-6b6d435d-84e7-4122-88fc-886f09ee54dc/"
    },
    {
      title: "Oracle Generative AI Professional Certificate",
      platform: "Oracle",
      date: "Jul 2023",
      description: "Generative AI applications and implementation strategies.",
      badge: "oracle",
      url: "https://drive.google.com/file/d/18CeoN9Ov7ZyIXnNlOxzieY9RVlvhxFlU/view?usp=sharing"
    },
    {
      title: "Coursera Technical Support Fundamentals",
      platform: "Coursera",
      date: "Jun 2022",
      description: "IT support principles and customer service best practices.",
      badge: "coursera",
      url: "https://www.coursera.org/account/accomplishments/verify/BTUS79FXKA3Q"
    },

    {
      title: "Cambridge Linguaskill Certificate",
      platform: "Cambridge",
      date: "Aug 2023",
      description: "Professional English language proficiency for business communication.",
      badge: "cambridge",
      url: "https://drive.google.com/file/d/17q9I8C_Es93e1vGldhcuPbnA4kt6lJP2/view?usp=sharing"
    },
    {
      title: "IBM Getting Started with Enterprise Data Science",
      platform: "IBM",
      date: "Sep 2022",
      description: "Data science methodologies and machine learning in enterprise environments.",
      badge: "ibm",
      url: "https://www.credly.com/badges/c8c1e15d-5412-4e57-8e85-4f545bcb438c/public_url"
    }
  ];

  const visibleCerts = showAll ? certifications : certifications.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Title animation
      gsap.fromTo(".certifications-title",
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

      // Certification cards animation
      gsap.fromTo(".cert-card",
        { 
          opacity: 0, 
          y: 60, 
          scale: 0.8,
          rotationX: 15
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="glow-orb w-72 h-72 top-1/3 right-1/3 animate-orbit opacity-10"></div>
        <div className="glow-orb w-48 h-48 bottom-1/3 left-1/3 animate-orbit opacity-10" style={{ animationDelay: '-12s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="certifications-title text-4xl lg:text-6xl font-bold">
            <span className="text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Continuous learning and professional development in cutting-edge technologies
          </p>
        </div>

        {/* Certifications Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {visibleCerts.map((cert, index) => (
            <div 
              key={index}
              className="cert-card glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-300">
                    <Award className="text-primary" size={24} />
                  </div>
                  <a 
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted/20 hover:bg-primary/20 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ExternalLink size={16} className="text-muted-foreground hover:text-primary" />
                  </a>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h3>
                
                {/* Platform */}
                <p className="text-secondary font-semibold mb-2">
                  {cert.platform}
                </p>

                {/* Date */}
                <div className="flex items-center text-muted-foreground mb-4">
                  <Calendar size={14} className="mr-2" />
                  <span className="text-sm">{cert.date}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>

                {/* Verification Badge */}
                <div className="mt-6 pt-4 border-t border-border/30">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30">
                    Verified Certificate
                  </span>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-secondary/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {certifications.length > 6 && (
          <div className="text-center mt-12">
            <button
              className="glass-card px-8 py-4 rounded-full text-lg font-semibold border border-border/30 hover:border-primary/50 hover:scale-105 transition-all duration-300"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show Less' : 'View All Certifications'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default CertificationsSection;