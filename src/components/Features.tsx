
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
  Mail
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
      <div className="bg-white dark:bg-black/60 shadow-md rounded-xl p-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 gradient-border dark:card-shine">
        {icon}
      </div>
      <span className="text-xs md:text-sm font-medium text-foreground/70">{name}</span>
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
    { name: 'Supabase', icon: <Database className="h-8 w-8 text-syncx-blue" /> },
    { name: 'Checkmate', icon: <CheckCircle2 className="h-8 w-8 text-syncx-purple" /> },
    { name: 'Docmost', icon: <FileText className="h-8 w-8 text-syncx-indigo" /> },
    { name: 'Stalwart', icon: <Mail className="h-8 w-8 text-syncx-blue" /> },
    { name: 'Refine.dev', icon: <SquareCode className="h-8 w-8 text-syncx-purple" /> },
  ];

  return (
    <section id="features" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-20 opacity-0 dark:text-silver-gradient"
        >
          Everything You Need, <span className="text-primary">Pre-Integrated</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white dark:bg-black/60 rounded-2xl p-6 shadow-md border border-border transition-all hover:shadow-lg dark:card-shine gradient-border">
            <div className="bg-primary/10 rounded-xl p-3 w-fit mb-4">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pre-Built Stacks</h3>
            <p className="text-foreground/70">
              Launch curated stacks for Startups, DevOps, or Enterprises with just a few clicks.
            </p>
          </div>

          <div className="bg-white dark:bg-black/60 rounded-2xl p-6 shadow-md border border-border transition-all hover:shadow-lg dark:card-shine gradient-border">
            <div className="bg-primary/10 rounded-xl p-3 w-fit mb-4">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Integrated Tools</h3>
            <p className="text-foreground/70">
              All your favorite open-source tools, seamlessly working together.
            </p>
          </div>

          <div className="bg-white dark:bg-black/60 rounded-2xl p-6 shadow-md border border-border transition-all hover:shadow-lg dark:card-shine gradient-border">
            <div className="bg-primary/10 rounded-xl p-3 w-fit mb-4">
              <Gauge className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Unified Dashboard</h3>
            <p className="text-foreground/70">
              Manage all tools, users, and billing in one place with centralized controls.
            </p>
          </div>

          <div className="bg-white dark:bg-black/60 rounded-2xl p-6 shadow-md border border-border transition-all hover:shadow-lg dark:card-shine gradient-border">
            <div className="bg-primary/10 rounded-xl p-3 w-fit mb-4">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Open-Source Freedom</h3>
            <p className="text-foreground/70">
              Self-hosted options available. Own your data and maintain full control.
            </p>
          </div>
        </div>

        <div 
          ref={featuresRef}
          className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-0"
        >
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
