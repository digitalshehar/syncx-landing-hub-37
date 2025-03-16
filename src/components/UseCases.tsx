
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Building2, Server, Briefcase, Rocket, Zap, Sparkles } from 'lucide-react';

const UseCases = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="use-cases" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-secondary/50 dark:bg-black/30 clip-path-slant opacity-0 relative overflow-hidden"
    >
      {/* Neural network background pattern */}
      <div className="absolute inset-0 neural-bg opacity-30"></div>
      
      {/* Animated glowing particles */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-futuristic-blue/70 blur-sm animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-futuristic-purple/70 blur-sm animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-futuristic-neon/70 blur-sm animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center p-1 mb-6 rounded-full bg-white/5 dark:bg-black/50 backdrop-blur-sm border border-white/10 dark:border-white/5">
            <span className="px-4 py-1 text-sm font-medium text-futuristic-blue font-mono flex items-center">
              <Rocket size={14} className="mr-2" />
              Solutions for Every Team
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-white dark:via-futuristic-silver dark:to-slate-300 font-mono">
            Enterprise-Grade <span className="bg-gradient-to-r from-futuristic-blue to-futuristic-purple bg-clip-text text-transparent">Open Source</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Whether you're a startup, enterprise team, or DevOps group, Syncx.app has a pre-configured stack that fits your needs.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0"
          style={{animationDelay: '200ms'}}
        >
          <div className="relative group">
            {/* Card background glow effect on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-futuristic-blue to-futuristic-neon rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition duration-200"></div>
            
            <div className="relative bg-white/5 dark:bg-black/60 rounded-2xl p-8 shadow-md backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:border-futuristic-blue/30 dark:hover:border-futuristic-blue/30 card-3d h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-futuristic-blue/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="bg-futuristic-blue/10 rounded-full p-4 w-fit mb-6 backdrop-blur-sm">
                  <Building2 className="h-8 w-8 text-futuristic-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-mono group-hover:text-futuristic-blue transition-colors">Startups</h3>
                <p className="text-foreground/70 mb-4">
                  Deploy Supabase + Refine.dev + Checkmate in minutes. Perfect for MVPs and rapid iteration.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-futuristic-blue mr-2"></span>
                    <span className="text-sm">Database & Auth</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-futuristic-blue mr-2"></span>
                    <span className="text-sm">Admin Dashboards</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-futuristic-blue mr-2"></span>
                    <span className="text-sm">Task Management</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative group">
            {/* Card background glow effect on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-futuristic-purple to-futuristic-pink rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition duration-200"></div>
            
            <div className="relative bg-white/5 dark:bg-black/60 rounded-2xl p-8 shadow-md backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:border-futuristic-purple/30 dark:hover:border-futuristic-purple/30 card-3d h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-futuristic-purple/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="bg-futuristic-purple/10 rounded-full p-4 w-fit mb-6 backdrop-blur-sm">
                  <Briefcase className="h-8 w-8 text-futuristic-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-mono group-hover:text-futuristic-purple transition-colors">Teams</h3>
                <p className="text-foreground/70 mb-4">
                  Replace Slack + Confluence + Gmail with Matrix + Docmost + Stalwart. Own your communication.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-futuristic-purple mr-2"></span>
                    <span className="text-sm">Secure Messaging</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-futuristic-purple mr-2"></span>
                    <span className="text-sm">Knowledge Management</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-futuristic-purple mr-2"></span>
                    <span className="text-sm">Email System</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative group">
            {/* Card background glow effect on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-futuristic-glow to-futuristic-neon rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition duration-200"></div>
            
            <div className="relative bg-white/5 dark:bg-black/60 rounded-2xl p-8 shadow-md backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:border-futuristic-neon/30 dark:hover:border-futuristic-neon/30 card-3d h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-futuristic-neon/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="bg-futuristic-neon/10 rounded-full p-4 w-fit mb-6 backdrop-blur-sm">
                  <Server className="h-8 w-8 text-futuristic-neon" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-mono group-hover:text-futuristic-neon transition-colors">Enterprise</h3>
                <p className="text-foreground/70 mb-4">
                  Complete stacks with SSO, audit logs, and compliance features built-in. Enterprise-ready.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-futuristic-neon mr-2"></span>
                    <span className="text-sm">Single Sign-On</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-futuristic-neon mr-2"></span>
                    <span className="text-sm">Access Control</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-futuristic-neon mr-2"></span>
                    <span className="text-sm">Compliance Tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
