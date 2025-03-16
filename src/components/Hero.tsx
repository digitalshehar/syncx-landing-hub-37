
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SplineScene } from '@/components/ui/spline';
import { Spotlight } from '@/components/ui/spotlight';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

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

    if (headlineRef.current) observer.observe(headlineRef.current);
    if (subheadlineRef.current) observer.observe(subheadlineRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    if (orbitRef.current) observer.observe(orbitRef.current);

    // Set loaded after a short delay to ensure smooth animation
    const timer = setTimeout(() => setIsLoaded(true), 500);
    
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      
      // Update CSS variables for spotlight effect
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Enhanced spotlights for dark mode */}
      <div className="absolute inset-0 z-0 overflow-hidden dark:block hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-futuristic-purple/5 blur-[120px] rounded-full animate-pulse-glow"></div>
        <div className="absolute top-1/3 left-1/3 w-[50vw] h-[50vh] bg-futuristic-blue/5 blur-[100px] rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <Spotlight className="spotlight z-10" fill="white" />
      </div>
      
      {/* 3D orbital decoration */}
      <div 
        ref={orbitRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] opacity-0 pointer-events-none"
        style={{ animationDelay: '800ms' }}
      >
        <div className="absolute inset-0 border border-futuristic-neon/10 rounded-full animate-rotate-slow"></div>
        <div className="absolute inset-0 border border-futuristic-purple/10 rounded-full animate-rotate-slow" style={{ animationDelay: '2s', transform: 'rotate(60deg)' }}></div>
        <div className="absolute inset-0 border border-futuristic-pink/10 rounded-full animate-rotate-slow" style={{ animationDelay: '4s', transform: 'rotate(120deg)' }}></div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 bg-futuristic-neon rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-2 bg-futuristic-purple rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 bg-futuristic-pink rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 bg-futuristic-glow rounded-full animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Light mode gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none dark:hidden" />
      
      <div 
        ref={containerRef} 
        className="container max-w-6xl mx-auto px-4 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left space-y-8">
            <h1 
              ref={headlineRef}
              className={cn(
                "text-5xl md:text-7xl font-bold tracking-tight text-foreground",
                "dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-white dark:via-futuristic-silver dark:to-slate-300 leading-tight",
                "opacity-0 font-mono",
                "animate-morph"
              )}
              style={{animationDelay: '100ms'}}
            >
              Deploy Your <span className="bg-gradient-to-r from-futuristic-purple to-futuristic-blue bg-clip-text text-transparent">Open-Source</span> Stack in{' '}
              <span className="relative inline-block">
                Minutes
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-futuristic-neon rounded-full animate-pulse-glow"></span>
              </span>
            </h1>
            <p 
              ref={subheadlineRef}
              className={cn(
                "max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-foreground/80 text-balance",
                "opacity-0"
              )}
              style={{animationDelay: '300ms'}}
            >
              Get pre-integrated tools like Supabase, Checkmate, Docmost, and Stalwart—with
              monitoring, SSO, and 24/7 support.
            </p>
            <div 
              ref={ctaRef}
              className={cn("pt-8", "opacity-0")}
              style={{animationDelay: '500ms'}}
            >
              <a href="#waitlist" className="relative group inline-block">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-futuristic-purple to-futuristic-blue rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
                <Button 
                  size="lg" 
                  className={cn(
                    "relative",
                    "dark:bg-black dark:text-white dark:border dark:border-futuristic-neon/30 dark:hover:border-futuristic-neon",
                    "bg-black text-white hover:bg-black/90",
                    "px-8 py-6 text-lg",
                    "transition-all duration-500 hover:scale-105"
                  )}
                >
                  Join Waitlist for Early Access
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              
              <div className="mt-8 flex justify-center lg:justify-start items-center space-x-2 opacity-70">
                <Zap size={16} className="text-futuristic-neon animate-pulse-subtle" />
                <span className="text-sm">No credit card required • Cancel anytime</span>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "relative h-[500px] w-full transition-all duration-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-futuristic-blue/5 dark:to-futuristic-blue/10 rounded-2xl overflow-hidden">
              <SplineScene 
                scene="https://prod.spline.design/c4Ub1KVNvJVPk9Ec/scene.splinecode" 
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
