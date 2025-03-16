
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SplineScene } from '@/components/ui/spline';
import { Spotlight } from '@/components/ui/spotlight';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
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
    
    // Set loaded after a short delay to ensure smooth animation
    const timer = setTimeout(() => setIsLoaded(true), 500);
    
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Custom fallback for the 3D component
  const heroFallback = (
    <div className="w-full h-full flex items-center justify-center backdrop-blur-lg bg-white/5 rounded-xl">
      <div className="relative p-8 text-center">
        <div className="absolute inset-0 bg-black/30 rounded-xl backdrop-blur-sm -z-10"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-futuristic-blue/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-futuristic-purple/10 rounded-full blur-xl"></div>
      </div>
    </div>
  );

  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Enhanced spotlights */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-futuristic-purple/5 blur-[120px] rounded-full animate-pulse-glow"></div>
        <div className="absolute top-1/3 left-1/3 w-[50vw] h-[50vh] bg-futuristic-blue/5 blur-[100px] rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <Spotlight className="spotlight z-10" fill="white" />
      </div>
      
      <div 
        ref={containerRef} 
        className="container max-w-6xl mx-auto px-4 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left space-y-8">
            <h1 
              ref={headlineRef}
              className={cn(
                "text-5xl md:text-7xl font-bold tracking-tight",
                "bg-gradient-to-br from-gray-200/95 via-gray-300/90 to-gray-400/80 bg-clip-text text-transparent",
                "opacity-0 font-mono",
                "animate-morph",
                "drop-shadow-[0_5px_15px_rgba(255,255,255,0.15)]"
              )}
              style={{animationDelay: '100ms'}}
            >
              Spin up your <span className="bg-gradient-to-r from-futuristic-purple to-futuristic-blue bg-clip-text text-transparent">open-source</span> stack in{' '}
              <span className="relative inline-block">
                minutes
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-futuristic-neon rounded-full animate-pulse-glow"></span>
              </span>
            </h1>
            <p 
              ref={subheadlineRef}
              className={cn(
                "max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-300 text-balance",
                "opacity-0"
              )}
              style={{animationDelay: '300ms'}}
            >
              Configure and deploy multiple tools with a unified dashboard and seamless integration.
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
                    "backdrop-blur-xl bg-black/50 text-white border border-white/10 hover:border-futuristic-neon/50",
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
                <span className="text-sm text-white">No credit card required • Cancel anytime</span>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "relative h-[500px] w-full transition-all duration-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}>
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
                className="w-full h-full"
                fallback={heroFallback}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
