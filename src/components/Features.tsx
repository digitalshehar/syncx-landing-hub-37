
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Layers, 
  Package, 
  Gauge, 
  Database, 
  SquareCode, 
  CheckCircle2, 
  FileText, 
  Mail,
  Zap,
  Shield,
  Globe,
  Sparkles
} from 'lucide-react';
import { SplineScene } from '@/components/ui/spline';
import { Spotlight } from '@/components/ui/spotlight';

type ToolIconProps = {
  name: string;
  icon: React.ReactNode;
  delay: number;
};

const ToolIcon = ({ name, icon, delay }: ToolIconProps) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (iconRef.current) {
                iconRef.current.classList.add('animate-scale-in');
                iconRef.current.classList.add('animate-float');
              }
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (iconRef.current) observer.observe(iconRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={iconRef}
      className={cn(
        "tool-icon flex flex-col items-center justify-center p-4 transform transition-all duration-300",
        "opacity-0",
        isHovered ? "scale-110" : "scale-100"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white/5 dark:bg-black/60 shadow-lg rounded-xl p-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 dark:gradient-border dark:card-shine backdrop-blur-md relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-futuristic-blue/10 to-futuristic-purple/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Animated glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-futuristic-neon/20 to-transparent opacity-0 group-hover:opacity-100 blur-sm animate-shimmer"></div>
        
        <div className="relative z-10">
          {icon}
        </div>
      </div>
      <span className="text-xs md:text-sm font-medium text-foreground/70 font-mono transition-colors group-hover:text-foreground">{name}</span>
    </div>
  );
};

const Features = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const feature3DRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (feature3DRef.current) observer.observe(feature3DRef.current);

    return () => observer.disconnect();
  }, []);

  const tools = [
    { name: 'Supabase', icon: <Database className="h-8 w-8 text-futuristic-neon" /> },
    { name: 'Checkmate', icon: <CheckCircle2 className="h-8 w-8 text-futuristic-purple" /> },
    { name: 'Docmost', icon: <FileText className="h-8 w-8 text-futuristic-blue" /> },
    { name: 'Stalwart', icon: <Mail className="h-8 w-8 text-futuristic-pink" /> },
    { name: 'Refine.dev', icon: <SquareCode className="h-8 w-8 text-futuristic-glow" /> },
  ];

  const FeatureCard = ({ icon, title, description, color, delay }: any) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                if (cardRef.current) {
                  cardRef.current.classList.add('animate-fade-in');
                  cardRef.current.style.transform = "translateY(0)";
                  cardRef.current.style.opacity = "1";
                }
              }, delay);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (cardRef.current) observer.observe(cardRef.current);
      return () => observer.disconnect();
    }, [delay]);
    
    return (
      <div
        ref={cardRef}
        className={`futuristic-card backdrop-blur-md border-white/5 dark:border-white/10 hover:border-${color}/20 dark:hover:border-${color}/30 transition-all hover:shadow-lg hover:shadow-${color}/5 group card-3d`}
        style={{ 
          opacity: 0, 
          transform: 'translateY(20px)',
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <div className={`bg-gradient-to-br from-${color}/20 to-futuristic-blue/20 rounded-xl p-3 w-fit mb-4 group-hover:from-${color}/30 group-hover:to-futuristic-blue/30 transition-all`}>
            {icon}
          </div>
          <div className={`absolute top-0 right-0 w-16 h-16 bg-${color}/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity`}></div>
        </div>
        <h3 className={`text-xl font-semibold mb-2 font-mono text-foreground group-hover:text-${color} transition-colors`}>{title}</h3>
        <p className="text-foreground/70 transition-colors group-hover:text-foreground/90">
          {description}
        </p>
        
        {/* Interactive particle effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute h-px w-full bg-gradient-to-r from-transparent via-${color}/30 to-transparent top-0 left-0 animate-shimmer`}></div>
            <div className={`absolute h-px w-full bg-gradient-to-r from-transparent via-${color}/30 to-transparent bottom-0 left-0 animate-shimmer`} style={{ animationDelay: '0.5s' }}></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="features" className="py-20 md:py-32 relative neural-bg dark:bg-transparent">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-50">
        <div className="blur-circle w-64 h-64 bg-futuristic-blue/10 top-20 -left-20"></div>
        <div className="blur-circle w-96 h-96 bg-futuristic-purple/10 bottom-20 -right-20"></div>
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-futuristic-blue/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-white/5 dark:bg-black/50 backdrop-blur-sm border border-white/10 dark:border-white/5">
            <span className="px-4 py-1 text-sm font-medium text-futuristic-glow flex items-center">
              <Sparkles size={14} className="mr-2 animate-pulse-subtle" />
              Open Source Technology
            </span>
          </div>
          
          <h2 
            ref={headingRef}
            className={cn(
              "text-3xl md:text-5xl font-bold text-center opacity-0 dark:text-silver-gradient",
              "font-mono tracking-tight"
            )}
          >
            Everything You Need, <span className="bg-gradient-to-r from-futuristic-blue to-futuristic-purple bg-clip-text text-transparent">Pre-Integrated</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard 
            icon={<Layers className="h-6 w-6 text-futuristic-neon" />}
            title="Pre-Built Stacks"
            description="Launch curated stacks for Startups, DevOps, or Enterprises with just a few clicks."
            color="futuristic-neon"
            delay={0}
          />
          
          <FeatureCard 
            icon={<Package className="h-6 w-6 text-futuristic-purple" />}
            title="Integrated Tools"
            description="All your favorite open-source tools, seamlessly working together."
            color="futuristic-purple"
            delay={100}
          />
          
          <FeatureCard 
            icon={<Gauge className="h-6 w-6 text-futuristic-blue" />}
            title="Unified Dashboard"
            description="Manage all tools, users, and billing in one place with centralized controls."
            color="futuristic-blue"
            delay={200}
          />
          
          <FeatureCard 
            icon={<Shield className="h-6 w-6 text-futuristic-pink" />}
            title="Open-Source Freedom"
            description="Self-hosted options available. Own your data and maintain full control."
            color="futuristic-pink"
            delay={300}
          />
        </div>

        <div 
          ref={featuresRef}
          className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-0 relative"
        >
          <div className="absolute w-full h-full -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] border border-white/5 rounded-full"></div>
          </div>
          
          {tools.map((tool, index) => (
            <ToolIcon 
              key={tool.name} 
              name={tool.name} 
              icon={tool.icon} 
              delay={index * 100}
            />
          ))}
        </div>
        
        {/* 3D Feature Demo Section */}
        <div 
          ref={feature3DRef}
          className="mt-32 opacity-0"
          style={{ transition: 'opacity 1s ease-out' }}
        >
          <div className="w-full rounded-xl overflow-hidden bg-black/90 relative h-[600px]">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
            
            <div className="flex flex-col md:flex-row h-full">
              {/* Left content */}
              <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                  Interactive 3D
                </h3>
                <p className="mt-4 text-neutral-300 max-w-lg">
                  Spin up your open-source stack in minutes. Configure and deploy multiple tools 
                  with a unified dashboard and seamless integration.
                </p>
              </div>

              {/* Right content */}
              <div className="flex-1 relative">
                <SplineScene 
                  scene="https://prod.spline.design/c4Ub1KVNvJVPk9Ec/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
