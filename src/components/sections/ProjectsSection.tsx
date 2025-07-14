import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Rush Detection in Corporate Cafeteria",
      description: "A real-time crowd estimation system that detects and tracks individuals in a corporate cafeteria using deep learning (SSD + MobileNet) and OpenCV. Integrated with Flask, it features live alerts, daily logs, and an intelligent scheduler for optimized monitoring.",
      image: "/lovable-uploads/project1.png",
      technologies: ["Python", "OpenCV", "Flask", "MobileNet-SSD", "Caffe", "Centroid Tracker", "Threading", "Scheduler", "SMTP Email API"],
      liveUrl: "https://github.com/smartinternz02/SBSPS-Challenge-9465-Rush-Estimator-for-Corporate-Cafeteria",
      githubUrl: "https://github.com/hariprabhu571/Rush-Detector-in-Corporate-Cafeteria",
      featured: true
    },
    {
      id: 2,
      title: "Silent Speech Recognition (Automatic Lip Reading Model)",
      description: "A deep learning–powered real-time lip reading application that converts silent video speech into readable text using CNN-LSTM architecture.",
      image: "/lovable-uploads/project2.png",
      technologies: ["Python", "TensorFlow", "OpenCV", "Streamlit", "3D CNN", "Bidirectional LSTM", "CTC Decoding"],
      liveUrl: "https://github.com/smartinternz02/SBSPS-Challenge-10528-Slient-Speech-Recognition-Automatic-Lip-reading-Model-using-3D-CNN-and-GRU",
      githubUrl: "https://github.com/hariprabhu571/Slient-Speech-Recognition-Automatic-Lip-reading-Model",
      featured: true
    },
    {
      id: 3,
      title: "Campus Placement Prediction",
      description: "A machine learning-based solution to predict campus placement outcomes using student academic and personal data, implemented with interactive Jupyter notebooks and multiple classification models.",
      image: "/lovable-uploads/project3.jpg",
      technologies: ["Python 3.8+","Jupyter Notebook","Pandas","NumPy","Scikit-learn","Matplotlib","Seaborn","Plotly (optional)","Virtual Environment (venv)","Conda (optional)"],
      liveUrl: "https://github.com/hariprabhu571/Campus-Placement-Prediction",
      githubUrl: "https://github.com/hariprabhu571/Campus-Placement-Prediction",
      featured: false
    },
    {
      id: 4,
      title: "Consent Management System",
      description: "A full-featured Odoo module for managing digital consent forms with secure signatures, PDF generation, customer portal access, and compliance-ready tracking.",
      image: "/lovable-uploads/project4.jpg",
      technologies: ["Python", "Odoo", "PostgreSQL", "QWeb", "CSS", "XML", "HTML", "JavaScript"],
      liveUrl: "https://github.com/hariprabhu571/Consent_management_System",
      githubUrl: "https://github.com/hariprabhu571/Consent_management_System",
      featured: false
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "A clean and modern portfolio showcasing my projects, skills, and professional journey.",
      image: "/lovable-uploads/portfolio_pro.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "GSAP", "EmailJS", "Spline"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Title animation
      gsap.fromTo(".projects-title",
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

      // Project cards stagger
      gsap.fromTo(".project-card",
        { opacity: 0, y: 60, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
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
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="projects-title text-4xl lg:text-6xl font-bold">
            <span className="text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            A showcase of innovative web experiences and creative solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {visibleProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-card group relative overflow-hidden rounded-2xl glass-card hover:scale-105 transition-all duration-500 ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              } ${index === 0 ? 'lg:col-span-2' : ''}`}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="flex space-x-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 hover:bg-primary/30 transition-all duration-300"
                      >
                        <ExternalLink size={18} className="text-primary" />
                      </a>
                    </div>
                    <Eye size={20} className="text-muted-foreground" />
                  </div>
                </div>

                {/* Creative Animated Overlay for First Card */}
                {index === 0 && (
                  <>
                    {/* Glowing animated border */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl animate-glow-border z-20"></div>
                    {/* Floating icon overlay */}
                    <div className="absolute top-6 right-6 z-30 animate-float">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="20" fill="url(#paint0_radial)"/>
                        <defs>
                          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(24 24) scale(20)" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00e0ff" stopOpacity="0.7"/>
                            <stop offset="1" stopColor="#00e0ff" stopOpacity="0"/>
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  </>
                )}

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full">
                      FEATURED
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs font-medium bg-muted/30 text-muted-foreground rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        {projects.length > 6 && (
        <div className="text-center mt-12">
            <button
              className="neon-button px-8 py-4 rounded-full text-lg font-semibold"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show Less' : 'View All Projects'}
          </button>
        </div>
        )}

      </div>
    </section>
  );
};

export default ProjectsSection;