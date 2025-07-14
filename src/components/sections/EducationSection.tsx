import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, Award, Star } from 'lucide-react';

const education = [
  {
    label: 'SSLC',
    degree: "Secondary Education",
    institution: "Alhikmah Matriculation Hr Sec",
    period: "2018 - 2019",
    location: "Theni, TN",
    description: "Foundation in core subjects with emphasis on logical thinking and problem-solving skills.",
    gpa: "91.5%",
    achievements: ["Class Topper", "Academic Excellence"],
    highlights: ["Mathematics", "Science", "Social Studies", "Languages"]
  },
  {
    label: 'HSC',
    degree: "Higher Secondary Education",
    institution: "Alhikmah Matriculation Hr Sec",
    period: "2020 - 2021",
    location: "Theni, TN",
    description: "Science stream with focus on Mathematics and Biology, laying strong foundation for engineering studies.",
    gpa: "92%",
    achievements: ["School Topper", "Best Student Award"],
    highlights: ["Mathematics", "Physics", "Biology", "English"]
  },
  {
    label: 'UG',
    degree: "B.E. in Computer Science & Engineering",
    institution: "SIMATS University",
    period: "2021 - 2025",
    location: "Chennai, TN",
    description: "Specialized in software development, algorithms, and modern web technologies with focus on full-stack development and emerging technologies.",
    gpa: "9.1/10",
    achievements: ["University Topper", "Best External Achiever"],
    highlights: ["Machine Learning", "Web Development", "Database Systems", "Software Engineering", "Datastructures"]
  }
];

const SEGMENT_COUNT = education.length;
const AUTO_ADVANCE_INTERVAL = 3500;

const EducationSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SEGMENT_COUNT);
    }, AUTO_ADVANCE_INTERVAL);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  // Manual select resets auto-advance timer
  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SEGMENT_COUNT);
    }, AUTO_ADVANCE_INTERVAL);
  };

  // Responsive SVG math
  const baseSize = 700;
  const baseOuterRadius = 280;
  const baseInnerRadius = 150;
  const anglePer = 360 / SEGMENT_COUNT;

  // Arc path generator
  function describeArc(cx, cy, r1, r2, startAngle, endAngle) {
    const startOuter = polarToCartesian(cx, cy, r1, endAngle);
    const endOuter = polarToCartesian(cx, cy, r1, startAngle);
    const startInner = polarToCartesian(cx, cy, r2, endAngle);
    const endInner = polarToCartesian(cx, cy, r2, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", startOuter.x, startOuter.y,
      "A", r1, r1, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
      "L", endInner.x, endInner.y,
      "A", r2, r2, 0, largeArcFlag, 1, startInner.x, startInner.y,
      "Z"
    ].join(" ");
  }
  function polarToCartesian(cx, cy, r, angle) {
    const a = (angle - 90) * Math.PI / 180.0;
    return {
      x: cx + (r * Math.cos(a)),
      y: cy + (r * Math.sin(a))
    };
  }

  // For textPath arc
  function describeArcPath(cx, cy, r, startAngle, endAngle, id) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `<path id="${id}" d="M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}" fill="none" />`;
  }

  // For label rotation and placement
  function getTextPathProps(idx, outerRadius, innerRadius, center) {
    const start = idx * anglePer;
    const end = (idx + 1) * anglePer;
    // Place text at radius between inner and outer
    const r = (outerRadius + innerRadius) / 2;
    const id = `arc-label-${idx}`;
    return { start, end, r, id };
  }

  // Responsive SVG size
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const svgWidth = isMobile ? Math.min(window.innerWidth * 0.9, 400) : baseSize;
  const scale = svgWidth / baseSize;
  const size = svgWidth;
  const center = size / 2;
  const outerRadius = baseOuterRadius * scale;
  const innerRadius = baseInnerRadius * scale;

  // SVG paths for textPath (must be injected as raw HTML for <defs>)
  const arcDefs = education.map((_, idx) => {
    const { start, end, r, id } = getTextPathProps(idx, outerRadius, innerRadius, center);
    return describeArcPath(center, center, r, start, end, id);
  }).join('');

  return (
    <section id="education" className="relative w-full min-h-[700px] flex flex-col items-center justify-center py-0 md:py-12 overflow-hidden bg-transparent">
      {/* Section Title */}
      <div className="text-center mb-4 w-full">
        <h2 className="education-title text-4xl lg:text-6xl font-bold">
          <span className="text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Education
          </span>
        </h2>
        <p className="text-xl text-muted-foreground mt-2 max-w-2xl mx-auto">
          My academic journey and achievements
        </p>
      </div>
      <div className="relative w-full flex flex-col md:flex-row items-center md:items-center justify-start md:justify-start gap-8 md:gap-0">
        {/* Segmented SVG Circle with curved text */}
        <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto ml-0 md:ml-8">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="block"
            style={{ width: isMobile ? '90vw' : baseSize, maxWidth: isMobile ? 400 : baseSize, height: 'auto' }}
          >
            <g dangerouslySetInnerHTML={{ __html: arcDefs }} />
            {/* Segments */}
            {education.map((edu, idx) => {
              const start = idx * anglePer;
              const end = (idx + 1) * anglePer;
              const { r, id } = getTextPathProps(idx, outerRadius, innerRadius, center);
              return (
                <g key={edu.label}>
                  <path
                    d={describeArc(center, center, outerRadius, innerRadius, start, end)}
                    fill={idx === activeIndex ? 'url(#activeGrad)' : 'rgba(255,255,255,0.07)'}
                    stroke="#fff"
                    strokeWidth={1.5 * scale}
                    style={{ filter: idx === activeIndex ? 'drop-shadow(0 0 32px #00e0ff88)' : 'none', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(.4,2,.6,1)' }}
                    onClick={() => handleSelect(idx)}
                  />
                  {/* Divider line */}
                  <line
                    x1={center}
                    y1={center}
                    x2={polarToCartesian(center, center, outerRadius, end).x}
                    y2={polarToCartesian(center, center, outerRadius, end).y}
                    stroke="#fff"
                    strokeWidth={1.5 * scale}
                    opacity={0.5}
                  />
                  {/* Curved label */}
                  <text
                    fontSize={44 * scale}
                    fontWeight={700}
                    fill={idx === activeIndex ? '#00e0ff' : '#fff'}
                    style={{ textTransform: 'uppercase', letterSpacing: 2, cursor: 'pointer', userSelect: 'none', filter: idx === activeIndex ? 'drop-shadow(0 0 12px #00e0ff)' : 'none', transition: 'all 0.4s cubic-bezier(.4,2,.6,1)' }}
                    onClick={() => handleSelect(idx)}
                  >
                    <textPath href={`#arc-label-${idx}`} startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                      {edu.label}
                    </textPath>
                  </text>
                </g>
              );
            })}
            {/* Center circle (no icon) */}
            <circle cx={center} cy={center} r={innerRadius - 24 * scale} fill="rgba(30,30,40,0.7)" />
            <defs>
              <linearGradient id="activeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00e0ff" />
                <stop offset="100%" stopColor="#a259ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* Content Area (no card, just styled text) */}
        <div className="w-full max-w-xl z-10 mt-8 md:mt-0 md:ml-12 px-4 md:px-0">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{education[activeIndex].degree}</h3>
              <span className="px-3 py-1 text-xs md:text-sm font-semibold bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 rounded-full">{education[activeIndex].label}</span>
            </div>
            <div className="text-lg md:text-xl font-semibold text-primary">{education[activeIndex].institution}</div>
            <div className="flex flex-wrap gap-4 text-muted-foreground text-sm md:text-base">
              <div className="flex items-center"><Calendar size={18} className="mr-2" />{education[activeIndex].period}</div>
              <div className="flex items-center"><MapPin size={18} className="mr-2" />{education[activeIndex].location}</div>
              <div className="flex items-center"><Star size={18} className="mr-2 text-yellow-400" />GPA: {education[activeIndex].gpa}</div>
            </div>
            <p className="text-muted-foreground mt-2 text-base md:text-lg">{education[activeIndex].description}</p>
            <div>
              <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 mt-2">Key Focus Areas:</h4>
              <div className="flex flex-wrap gap-2">
                {education[activeIndex].highlights.map((highlight, i) => (
                  <span key={i} className="px-2 py-1 text-xs md:text-base font-medium bg-gradient-to-r from-secondary/20 to-accent/20 text-secondary border border-secondary/30 rounded-full">{highlight}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm md:text-base font-semibold text-foreground flex items-center gap-2 mb-1 mt-2"><Award size={18} className="text-yellow-400" />Achievements:</h4>
              <ul className="text-xs md:text-base text-muted-foreground space-y-1">
                {education[activeIndex].achievements.map((achievement, i) => (
                  <li key={i} className="flex items-center"><div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection; 