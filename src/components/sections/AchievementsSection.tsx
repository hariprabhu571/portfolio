import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Star, Target, Zap, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      title: "University Topper",
      issuer: "SIMATS University",
      year: "2022, 2023, 2024",
      icon: Star,
      description: "Consistent academic excellence across multiple years",
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Best External Achiever Award",
      issuer: "SIMATS University",
      year: "2024",
      icon: Trophy,
      description: "Outstanding performance in external industry level competitions",
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "Best Innovator Award",
      issuer: "IET (Institution of Engineering and Technology)",
      year: "2023",
      icon: Crown,
      description: "Recognized for innovative contributions to engineering solutions",
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: "Best Student Achiever Award",
      issuer: "SIMATS University",
      year: "2023",
      icon: Award,
      description: "Overall excellence in academics and extracurricular activities",
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Best Paper Presentation",
      issuer: "Academic Conference",
      year: "2023",
      icon: Target,
      description: "Outstanding research presentation on emerging technologies",
      color: "from-red-400 to-rose-500"
    },
    {
      title: "MachineX Hackathon Winner",
      issuer: "SIMATS University",
      year: "2023",
      icon: Zap,
      description: "First place in university-level symposium",
      color: "from-indigo-400 to-blue-500"
    }
  ];

  // Map Tailwind gradients to real color values for border gradients
  const gradientMap = {
    'from-yellow-400 to-orange-500': ['#facc15', '#f97316'],
    'from-blue-400 to-cyan-500': ['#60a5fa', '#06b6d4'],
    'from-purple-400 to-pink-500': ['#a78bfa', '#ec4899'],
    'from-green-400 to-emerald-500': ['#4ade80', '#10b981'],
    'from-red-400 to-rose-500': ['#f87171', '#f43f5e'],
    'from-indigo-400 to-blue-500': ['#818cf8', '#3b82f6'],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Title animation
      gsap.fromTo(".achievements-title",
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

      // Achievement cards animation
      gsap.fromTo(".achievement-card",
        { 
          opacity: 0, 
          y: 60, 
          rotationY: 45,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
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

      // Sparkle animation for trophy icons
      gsap.to(".trophy-icon", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="glow-orb w-96 h-96 top-1/4 right-1/4 animate-orbit opacity-10"></div>
        <div className="glow-orb w-64 h-64 bottom-1/4 left-1/4 animate-orbit opacity-10" style={{ animationDelay: '-10s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="achievements-title text-4xl lg:text-6xl font-bold">
            <span className="text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Recognition for excellence in technology and innovation
          </p>
        </div>

        {/* Achievements Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`achievement-card glass-card p-8 rounded-2xl transition-all duration-500 group relative overflow-hidden hover:scale-105 hover:shadow-xl`} 
              style={{
                border: '2px solid transparent',
                borderRadius: '1rem', // rounded-2xl
                boxShadow: '0 2px 24px 0 rgba(0,0,0,0.10)',
                transition: 'transform 0.5s, box-shadow 0.5s',
              }}
              data-gradient={achievement.color}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
              
              {/* Icon */}
              <div className="relative z-10">
                <div className={`trophy-icon w-16 h-16 mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-br ${achievement.color} shadow-lg`}>
                  <achievement.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-sm font-semibold text-secondary mb-2">
                    {achievement.issuer}
                  </p>
                  
                  <p className="text-xs text-muted-foreground mb-4 font-medium">
                    {achievement.year}
                  </p>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-secondary rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Ambassador Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Leadership Experience
            </span>
          </h3>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              'Unstop Campus Ambassador',
              'HackerEarth Campus Ambassador',
              'MyGov Campus Ambassador',
              'SIMATS IIC Student Coordinator',
              'Innovation Club President'
            ].map((pos) => (
              <div
                key={pos}
                className="relative px-8 py-4 rounded-full font-semibold text-lg text-white bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 group cursor-pointer select-none"
                style={{
                  boxShadow: '0 4px 32px 0 rgba(80,180,255,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.10)',
                  border: '2px solid rgba(255,255,255,0.18)',
                  perspective: '600px',
                }}
                onMouseMove={e => {
                  const el = e.currentTarget;
                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  el.style.transform = `scale(1.10) rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                }}
              >
                <span className="drop-shadow-lg z-10 relative">{pos}</span>
                {/* Animated border glow */}
                <span className="absolute inset-0 rounded-full pointer-events-none group-hover:opacity-80 opacity-0 transition-all duration-500" style={{
                  boxShadow: '0 0 32px 8px rgba(80,180,255,0.25), 0 0 0 4px rgba(80,180,255,0.10) inset'
                }} />
              </div>
            ))}
          </div>
        </div>

      </div>
      {/* Gradient border style for perfectly rounded border on hover */}
      <style>{`
        .achievement-card {
          position: relative;
        }
        .achievement-card:hover::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 2px;
          pointer-events: none;
          z-index: 20;
          background: linear-gradient(90deg, #fff, #fff); /* fallback, will be replaced below */
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        .achievement-card[data-gradient='from-yellow-400 to-orange-500']:hover::after {
          background: linear-gradient(90deg, #facc15, #f97316);
        }
        .achievement-card[data-gradient='from-blue-400 to-cyan-500']:hover::after {
          background: linear-gradient(90deg, #60a5fa, #06b6d4);
        }
        .achievement-card[data-gradient='from-purple-400 to-pink-500']:hover::after {
          background: linear-gradient(90deg, #a78bfa, #ec4899);
        }
        .achievement-card[data-gradient='from-green-400 to-emerald-500']:hover::after {
          background: linear-gradient(90deg, #4ade80, #10b981);
        }
        .achievement-card[data-gradient='from-red-400 to-rose-500']:hover::after {
          background: linear-gradient(90deg, #f87171, #f43f5e);
        }
        .achievement-card[data-gradient='from-indigo-400 to-blue-500']:hover::after {
          background: linear-gradient(90deg, #818cf8, #3b82f6);
        }
      `}</style>
    </section>
  );
};

export default AchievementsSection;