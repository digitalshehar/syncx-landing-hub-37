
import React, { useRef, useEffect } from 'react';
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

type ToolIconProps = {
  name: string;
  icon: React.ReactNode;
  delay: number;
};

const ToolIcon = ({ name, icon, delay }: ToolIconProps) => {
  const iconRef = useRef<HTMLDivElement>(null);

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
        "tool-icon flex flex-col items-center justify-center p-4",
        "opacity-0"
      )}
    >
      <div className="bg-white/5 dark:bg-black/60 shadow-lg rounded-xl p-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 dark:gradient-border dark:card-shine backdrop-blur-md relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-futuristic-blue/10 to-futuristic-purple/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10">
          {icon}
        </div>
      </div>
      <span className="text-xs md:text-sm font-medium text-foreground/70 font-mono">{name}</span>
    </div>
  );
};

const Features = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
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

    return () => observer.disconnect();
  }, []);

  const tools = [
    { name: 'Supabase', icon: <Database className="h-8 w-8 text-futuristic-neon" /> },
    { name: 'Checkmate', icon: <CheckCircle2 className="h-8 w-8 text-futuristic-purple" /> },
    { name: 'Docmost', icon: <FileText className="h-8 w-8 text-futuristic-blue" /> },
    { name: 'Stalwart', icon: <Mail className="h-8 w-8 text-futuristic-pink" /> },
    { name: 'Refine.dev', icon: <SquareCode className="h-8 w-8 text-futuristic-glow" /> },
  ];

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
              <Sparkles size={14} className="mr-2" />
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
          <div className="futuristic-card backdrop-blur-md border-white/5 dark:border-white/10 hover:border-futuristic-neon/20 dark:hover:border-futuristic-neon/30 transition-all hover:shadow-lg hover:shadow-futuristic-neon/5 group card-3d">
            <div className="relative">
              <div className="bg-gradient-to-br from-futuristic-neon/20 to-futuristic-blue/20 rounded-xl p-3 w-fit mb-4 group-hover:from-futuristic-neon/30 group-hover:to-futuristic-blue/30 transition-all">
                <Layers className="h-6 w-6 text-futuristic-neon" />
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-futuristic-neon/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2 font-mono text-foreground group-hover:text-futuristic-neon transition-colors">Pre-Built Stacks</h3>
            <p className="text-foreground/70">
              Launch curated stacks for Startups, DevOps, or Enterprises with just a few clicks.
            </p>
          </div>

          <div className="futuristic-card backdrop-blur-md border-white/5 dark:border-white/10 hover:border-futuristic-purple/20 dark:hover:border-futuristic-purple/30 transition-all hover:shadow-lg hover:shadow-futuristic-purple/5 group card-3d">
            <div className="relative">
              <div className="bg-gradient-to-br from-futuristic-purple/20 to-futuristic-blue/20 rounded-xl p-3 w-fit mb-4 group-hover:from-futuristic-purple/30 group-hover:to-futuristic-blue/30 transition-all">
                <Package className="h-6 w-6 text-futuristic-purple" />
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-futuristic-purple/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2 font-mono text-foreground group-hover:text-futuristic-purple transition-colors">Integrated Tools</h3>
            <p className="text-foreground/70">
              All your favorite open-source tools, seamlessly working together.
            </p>
          </div>

          <div className="futuristic-card backdrop-blur-md border-white/5 dark:border-white/10 hover:border-futuristic-blue/20 dark:hover:border-futuristic-blue/30 transition-all hover:shadow-lg hover:shadow-futuristic-blue/5 group card-3d">
            <div className="relative">
              <div className="bg-gradient-to-br from-futuristic-blue/20 to-futuristic-neon/20 rounded-xl p-3 w-fit mb-4 group-hover:from-futuristic-blue/30 group-hover:to-futuristic-neon/30 transition-all">
                <Gauge className="h-6 w-6 text-futuristic-blue" />
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-futuristic-blue/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2 font-mono text-foreground group-hover:text-futuristic-blue transition-colors">Unified Dashboard</h3>
            <p className="text-foreground/70">
              Manage all tools, users, and billing in one place with centralized controls.
            </p>
          </div>

          <div className="futuristic-card backdrop-blur-md border-white/5 dark:border-white/10 hover:border-futuristic-pink/20 dark:hover:border-futuristic-pink/30 transition-all hover:shadow-lg hover:shadow-futuristic-pink/5 group card-3d">
            <div className="relative">
              <div className="bg-gradient-to-br from-futuristic-pink/20 to-futuristic-purple/20 rounded-xl p-3 w-fit mb-4 group-hover:from-futuristic-pink/30 group-hover:to-futuristic-purple/30 transition-all">
                <Shield className="h-6 w-6 text-futuristic-pink" />
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-futuristic-pink/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2 font-mono text-foreground group-hover:text-futuristic-pink transition-colors">Open-Source Freedom</h3>
            <p className="text-foreground/70">
              Self-hosted options available. Own your data and maintain full control.
            </p>
          </div>
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
      </div>
    </section>
  );
};

export default Features;
