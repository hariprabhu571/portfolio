import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import emailjs from 'emailjs-com';

gsap.registerPlugin(ScrollTrigger);

// Add SVGs for LeetCode, Instagram, and X (Twitter)
const LeetCodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 20L2 12L7.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.5 4L22 12L16.5 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17" cy="7" r="1.5" fill="currentColor"/>
  </svg>
);
const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Add this TopmateIcon component near the other icon components at the top of the file
const TopmateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#1A91F0"/>
    <path d="M12 6C9.23858 6 7 8.23858 7 11C7 13.7614 9.23858 16 12 16C14.7614 16 17 13.7614 17 11C17 8.23858 14.7614 6 12 6ZM12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11C15.5 12.933 13.933 14.5 12 14.5Z" fill="white"/>
    <circle cx="12" cy="11" r="2.5" fill="white"/>
  </svg>
);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Title animation
      gsap.fromTo(".contact-title",
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

      // Form inputs animation
      gsap.fromTo(".form-input",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Contact info animation
      gsap.fromTo(".contact-info",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info-container",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gsap.to(".submit-button", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    emailjs.sendForm(
      'service_60ewica',
      'template_pevjx1r',
      formRef.current,
      'DUMDWSgq7AfkCZZsF'
    ).then(
      (result) => {
        alert('Message sent successfully!');
        setFormData({ from_name: '', from_email: '', message: '' });
      },
      (error) => {
        alert('Failed to send message. Please try again later.');
      }
    );
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="glow-orb w-80 h-80 top-1/4 left-1/4 animate-orbit opacity-10"></div>
        <div className="glow-orb w-60 h-60 bottom-1/4 right-1/4 animate-orbit opacity-10" style={{ animationDelay: '-15s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl lg:text-6xl font-bold">
            <span className="text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          {/* Contact Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              
              <div className="form-input">
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 glass-card rounded-xl border border-border/30 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  placeholder="Enter Name"
                />
              </div>

              <div className="form-input">
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 glass-card rounded-xl border border-border/30 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  placeholder="Enter Email"
                />
              </div>

              <div className="form-input">
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 glass-card rounded-xl border border-border/30 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
                  placeholder="Enter Your Thoughts..."
                />
              </div>

              <button
                type="submit"
                className="submit-button w-full neon-button px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-300"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>

            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info-container space-y-8">
            
            <div className="contact-info glass-card p-8 rounded-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-secondary">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-muted-foreground">hariprabhu571@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="contact-info glass-card p-8 rounded-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-secondary to-accent">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+91 8940645820</p>
                </div>
              </div>
            </div>

            <div className="contact-info glass-card p-8 rounded-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-accent to-primary">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="text-muted-foreground">Chennai, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-info">
              <h3 className="text-xl font-semibold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/hariprabhu571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass-card hover:scale-110 hover:text-primary transition-all duration-300 group"
                >
                  <Github size={24} className="group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/hari-raja-prabhu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass-card hover:scale-110 hover:text-primary transition-all duration-300 group"
                >
                  <Linkedin size={24} className="group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="https://leetcode.com/u/Hariprabhu_571/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass-card hover:scale-110 hover:text-primary transition-all duration-300 group"
                >
                  <LeetCodeIcon />
                </a>
                <a
                  href="https://www.instagram.com/its_me_hari_3103/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass-card hover:scale-110 hover:text-primary transition-all duration-300 group"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://x.com/harirajaprabhu3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass-card hover:scale-110 hover:text-primary transition-all duration-300 group"
                >
                  <XIcon />
                </a>
                <a
                  href="https://topmate.io/harirajaprabhu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass-card hover:scale-110 hover:text-primary transition-all duration-300 group"
                >
                  <TopmateIcon />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;