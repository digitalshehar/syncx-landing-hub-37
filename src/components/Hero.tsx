
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background spotlight effect for dark mode */}
      <div className="absolute inset-0 z-0 overflow-hidden dark:block hidden">
        <div className="absolute top-1/3 left-1/3 w-[50rem] h-[50rem] bg-primary/5 rounded-full blur-[120px] animate-pulse-subtle" />
        <div className="absolute bottom-1/3 right-1/3 w-[40rem] h-[40rem] bg-syncx-purple/5 rounded-full blur-[100px] animate-pulse-subtle" style={{animationDelay: '2s'}} />
      </div>
      
      {/* Light mode gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none dark:hidden" />
      
      {/* Light mode decorative elements */}
      <div className="absolute top-1/3 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl dark:hidden" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-syncx-purple/10 rounded-full blur-3xl dark:hidden" />
      
      <div 
        ref={containerRef} 
        className="container max-w-5xl mx-auto px-4 relative z-10"
      >
        <div className="text-center space-y-8">
          <h1 
            ref={headlineRef}
            className={cn(
              "text-4xl md:text-6xl font-bold tracking-tight text-foreground",
              "opacity-0"
            )}
            style={{animationDelay: '100ms'}}
          >
            Deploy Your Open-Source Stack in{' '}
            <span className="text-primary dark:text-white">Minutes</span>
            <br />
            Fully Managed. No DevOps Hassle.
          </h1>
          <p 
            ref={subheadlineRef}
            className={cn(
              "max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 text-balance",
              "opacity-0"
            )}
            style={{animationDelay: '300ms'}}
          >
            Get pre-integrated tools like Supabase, Checkmate, Docmost, and Stalwart—with
            monitoring, SSO, and 24/7 support.
          </p>
          <div 
            ref={ctaRef}
            className={cn("pt-4", "opacity-0")}
            style={{animationDelay: '500ms'}}
          >
            <a href="#waitlist">
              <Button 
                size="lg" 
                className={cn(
                  "group",
                  "dark:bg-white dark:text-black dark:hover:bg-white/90",
                  "bg-black text-white hover:bg-black/90"
                )}
              >
                Join Waitlist for Early Access
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
